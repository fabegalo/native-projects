import snapshot from './github-snapshot.json';
import type { Slug } from './projects';

export interface ReleaseAsset { name: string; size: number; url: string }
export interface Release {
  tag: string;
  name: string;
  url: string;
  publishedAt: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}
export interface RepoData {
  name: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  license: string | null;
  topics: string[];
  hasIssues: boolean;
  hasDiscussions: boolean;
  defaultBranch: string;
  pushedAt: string;
  lastCommitAt: string;
  releases: Release[];
  stale: boolean;
}

const data = snapshot as { generatedAt: string | null; repos: Record<string, RepoData | null> };

export const snapshotDate = data.generatedAt;
export const repo = (slug: Slug): RepoData | null => data.repos[slug] ?? null;
/** Latest non-prerelease release, only if one really exists. */
export const latestRelease = (slug: Slug): Release | null =>
  repo(slug)?.releases.find((r) => !r.prerelease) ?? null;
export const anyStale = Object.values(data.repos).some((r) => !r || r.stale);
export const totalStars = Object.values(data.repos).reduce((n, r) => n + (r?.stars ?? 0), 0);
export const projectsWithReleases = Object.values(data.repos).filter((r) => r && r.releases.length > 0).length;

/** Friendly label for a release asset file name, e.g. "Windows · x64". */
export function assetLabel(name: string): { os: string; arch: string } | null {
  const m = name.match(/-(windows|linux|macos)-(x64|arm64)\.(zip|tar\.gz)$/i);
  if (!m) return null;
  const os = { windows: 'Windows', linux: 'Linux', macos: 'macOS' }[m[1].toLowerCase()]!;
  const arch = m[1].toLowerCase() === 'macos'
    ? (m[2] === 'arm64' ? 'Apple Silicon' : 'Intel')
    : m[2].toUpperCase().replace('X64', 'x64');
  return { os, arch };
}
