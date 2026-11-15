// Build-time GitHub snapshot.
//
// Fetches public repository metadata and releases for the four projects and
// writes src/data/github-snapshot.json. The browser never talks to the GitHub
// API and never sees a token: GITHUB_TOKEN (optional, provided by Actions) is
// used only here, in Node, to raise the rate limit.
//
// Failure policy: a repository that cannot be fetched (network error, rate
// limit, outage) keeps its previous entry from the committed snapshot, marked
// "stale". The build never fails because GitHub is unavailable.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OWNER = 'fabegalo';
const REPOS = ['x360-native', 'ps2-native', 'xone-native', 'ps3-native'];
const file = path.resolve(import.meta.dirname, '..', 'src', 'data', 'github-snapshot.json');
const TIMEOUT_MS = 15_000;

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'native-projects-site-build',
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api(route) {
  const res = await fetch(`https://api.github.com${route}`, {
    headers,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get('x-ratelimit-reset');
    throw new Error(`rate limited (${res.status})${reset ? `, resets ${new Date(reset * 1000).toISOString()}` : ''}`);
  }
  if (!res.ok) throw new Error(`${route}: HTTP ${res.status}`);
  return res.json();
}

async function fetchRepo(name) {
  const [repo, releases, commits] = await Promise.all([
    api(`/repos/${OWNER}/${name}`),
    api(`/repos/${OWNER}/${name}/releases?per_page=10`),
    api(`/repos/${OWNER}/${name}/commits?per_page=1`),
  ]);
  const published = releases.filter((r) => !r.draft);
  return {
    name,
    url: repo.html_url,
    description: repo.description ?? '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    language: repo.language,
    license: repo.license?.spdx_id ?? null,
    topics: repo.topics ?? [],
    hasIssues: repo.has_issues,
    hasDiscussions: repo.has_discussions,
    defaultBranch: repo.default_branch,
    pushedAt: repo.pushed_at,
    lastCommitAt: commits[0]?.commit?.committer?.date ?? repo.pushed_at,
    releases: published.slice(0, 3).map((r) => ({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      url: r.html_url,
      publishedAt: r.published_at,
      prerelease: r.prerelease,
      assets: r.assets.map((a) => ({ name: a.name, size: a.size, url: a.browser_download_url })),
    })),
    stale: false,
  };
}

let previous = { repos: {} };
try {
  previous = JSON.parse(await readFile(file, 'utf8'));
} catch {
  console.warn('[github] no previous snapshot; failures will leave entries empty');
}

const repos = {};
let fresh = 0;
for (const name of REPOS) {
  try {
    repos[name] = await fetchRepo(name);
    fresh++;
    console.log(`[github] ${name}: ★${repos[name].stars}, ${repos[name].releases.length} release(s)`);
  } catch (err) {
    console.warn(`[github] ${name}: ${err.message}; keeping previous data`);
    repos[name] = previous.repos?.[name] ? { ...previous.repos[name], stale: true } : null;
  }
}

const snapshot = {
  // Only advance the timestamp when at least one repository was refreshed.
  generatedAt: fresh > 0 ? new Date().toISOString() : previous.generatedAt ?? null,
  repos,
};
await writeFile(file, JSON.stringify(snapshot, null, 2) + '\n');
console.log(`[github] snapshot written (${fresh}/${REPOS.length} fresh)`);
