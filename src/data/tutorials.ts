/**
 * Getting-started tutorials. Every step and command comes from the project's
 * own README on `main` (reviewed 16 Nov 2026). Do not add steps, platforms or
 * expectations the repositories do not document.
 */
import type { L, Slug } from './projects';

export interface Code {
  /** Short label shown above the block (shell / platform). */
  label: string;
  text: string;
}
export interface Step {
  title: L;
  body: L;
  code?: Code[];
}
export interface Tutorial {
  slug: Slug;
  audience: 'users' | 'developers';
  platform: L;
  requirements: L[];
  steps: Step[];
  /** What a successful run means and what it does not. */
  expect: L[];
  extra?: { title: L; rows: { key: string; value: L }[] };
  docs: { label: L; path: string }[];
}

const both = (en: string, pt: string): L => ({ en, pt });

export const tutorials: Tutorial[] = [
  {
    slug: 'x360-native',
    audience: 'users',
    platform: both('Windows x64 (packages also exist for Windows ARM64, Linux and macOS)', 'Windows x64 (também há pacotes para Windows ARM64, Linux e macOS)'),
    requirements: [
      both('A Windows x64 PC — the only platform with end-to-end evidence today. Other packages build and pass checks, but no dashboard or game flow has been demonstrated on them.', 'Um PC com Windows x64 — a única plataforma com evidência ponta a ponta hoje. Os outros pacotes compilam e passam nas verificações, mas nenhum fluxo de dashboard ou jogo foi demonstrado neles.'),
      both('Dashboard 17559 files and games that you legally own and are authorized to use. The package contains no Xbox content.', 'Arquivos da Dashboard 17559 e jogos que você possui legalmente e tem autorização para usar. O pacote não contém nenhum conteúdo do Xbox.'),
      both('An internet connection for the first preparation: pinned build tools are downloaded with your consent and the code is compiled on your machine.', 'Conexão com a internet na primeira preparação: as ferramentas de build fixadas são baixadas com o seu consentimento e o código é compilado na sua máquina.'),
      both('Some Microsoft C++ build components may need their official installer, which the app offers when they are missing.', 'Alguns componentes de build C++ da Microsoft podem exigir o instalador oficial, que o app oferece quando estão ausentes.'),
    ],
    steps: [
      {
        title: both('Download the release for your system', 'Baixe a release do seu sistema'),
        body: both('Open the latest release and download the archive for your system together with its .sha256 file. Use the release assets, not GitHub’s “Source code” archive.', 'Abra a release mais recente e baixe o arquivo do seu sistema junto com o respectivo .sha256. Use os assets da release, não o arquivo “Source code” do GitHub.'),
      },
      {
        title: both('Check the download (recommended)', 'Confira o download (recomendado)'),
        body: both('Compare the SHA-256 of the archive with the value in its .sha256 file.', 'Compare o SHA-256 do arquivo com o valor do respectivo arquivo .sha256.'),
        code: [
          { label: 'Windows · PowerShell', text: 'Get-FileHash .\\x360-native-<version>-windows-x64.zip -Algorithm SHA256' },
          { label: 'Linux / macOS', text: 'shasum -a 256 x360-native-<version>-<platform>.<ext>' },
        ],
      },
      {
        title: both('Extract and start the launcher', 'Extraia e abra o launcher'),
        body: both('Extract the whole archive into an empty folder and start the launcher. Keep the data/ folder next to it: it holds your library, preparations and settings. On macOS start it from Terminal; the package is not notarized.', 'Extraia o arquivo inteiro em uma pasta vazia e abra o launcher. Mantenha a pasta data/ ao lado dele: ela guarda sua biblioteca, preparações e configurações. No macOS, abra pelo Terminal; o pacote não é notarizado.'),
        code: [
          { label: 'Windows', text: 'x360-native.exe' },
          { label: 'Linux (X11 / Wayland) · macOS', text: './x360-native' },
        ],
      },
      {
        title: both('Import your dashboard and games', 'Importe sua dashboard e seus jogos'),
        body: both('Add the dashboard files and the games you are authorized to use — a file or an extracted folder. The app identifies each item by its hash and reports what is missing or unsupported.', 'Adicione os arquivos da dashboard e os jogos que você tem autorização para usar — um arquivo ou uma pasta extraída. O app identifica cada item pelo hash e informa o que está faltando ou não é suportado.'),
      },
      {
        title: both('Prepare', 'Prepare'),
        body: both('Prepare the dashboard and the games you want to try. This recompiles their code locally and can take several minutes per item the first time; later preparations reuse the downloaded tools.', 'Prepare a dashboard e os jogos que você quer testar. Isso recompila o código localmente e pode levar vários minutos por item na primeira vez; as preparações seguintes reaproveitam as ferramentas baixadas.'),
      },
      {
        title: both('Start the original dashboard', 'Inicie a dashboard original'),
        body: both('Start the Xbox 360 dashboard from the launcher, open My Games and launch a prepared game. Games are launched from the original dashboard — the launcher does not replace it.', 'Inicie a dashboard do Xbox 360 pelo launcher, abra My Games e inicie um jogo preparado. Os jogos são iniciados pela dashboard original — o launcher não a substitui.'),
      },
    ],
    expect: [
      both('Imported or prepared does not mean a game will run. Check the exact title and version in the compatibility matrix; no game is certified as playable yet.', 'Importado ou preparado não significa que um jogo vai rodar. Confira o título e a versão exatos na matriz de compatibilidade; nenhum jogo é certificado como jogável ainda.'),
      both('Updates: the launcher checks the public GitHub releases and offers newer stable versions, keeping profiles, saves and imported content. To update by hand, back up data/ and extract into a new folder. Prepared titles may need to be prepared again after an SDK or runtime change.', 'Atualizações: o launcher consulta as releases públicas do GitHub e oferece versões estáveis mais novas, mantendo perfis, saves e conteúdo importado. Para atualizar manualmente, faça backup de data/ e extraia em uma pasta nova. Títulos preparados podem precisar ser preparados de novo após mudanças no SDK ou no runtime.'),
      both('Deep folders with Unicode names work on Windows. A network share, or a file system without junctions, can import but not prepare titles.', 'Pastas profundas com nomes Unicode funcionam no Windows. Um compartilhamento de rede, ou um sistema de arquivos sem junctions, consegue importar, mas não preparar títulos.'),
    ],
    docs: [
      { label: both('Download section of the README', 'Seção de download do README'), path: '#download' },
      { label: both('Compatibility matrix', 'Matriz de compatibilidade'), path: 'blob/main/docs/compatibility.md' },
      { label: both('Content layout', 'Organização do conteúdo'), path: 'blob/main/docs/guides/content-layout.md' },
      { label: both('Build guide (developers)', 'Guia de build (desenvolvedores)'), path: 'blob/main/docs/guides/BUILDING.md' },
    ],
  },

  {
    slug: 'ps2-native',
    audience: 'developers',
    platform: both('Build from source · Windows, Linux, macOS', 'Compilação a partir do código · Windows, Linux, macOS'),
    requirements: [
      both('CMake 3.21+, a C++20 compiler and Ninja (or another supported native build generator).', 'CMake 3.21+, um compilador C++20 e Ninja (ou outro gerador de build nativo suportado).'),
      both('PowerShell (pwsh) to apply the versioned PS2Recomp patches.', 'PowerShell (pwsh) para aplicar os patches versionados do PS2Recomp.'),
      both('Your own firmware (ROM0, NVM) and legally obtained discs. Nothing proprietary is provided — keep it local and never commit it.', 'Seu próprio firmware (ROM0, NVM) e discos obtidos legalmente. Nada proprietário é fornecido — mantenha tudo local e nunca faça commit.'),
    ],
    steps: [
      {
        title: both('Clone and prepare PS2Recomp', 'Clone e prepare o PS2Recomp'),
        body: both('Fetch the pinned PS2Recomp submodule and apply the authenticated patches (idempotent; -Check verifies, -Revert restores the pin).', 'Baixe o submódulo PS2Recomp fixado e aplique os patches autenticados (idempotente; -Check verifica, -Revert restaura o pin).'),
        code: [
          {
            label: 'shell',
            text: 'git clone https://github.com/fabegalo/ps2-native.git\ncd ps2-native\ngit submodule update --init external/ps2recomp\npwsh scripts/apply-sdk-patches.ps1',
          },
        ],
      },
      {
        title: both('Build and test', 'Compile e teste'),
        body: both('Release without LTCG avoids very long MSVC links for large games. With the Visual Studio generator, pass --config Release when building and testing.', 'Release sem LTCG evita links muito longos do MSVC em jogos grandes. Com o gerador do Visual Studio, passe --config Release ao compilar e testar.'),
        code: [
          {
            label: 'shell',
            text: 'cmake -S . -B out/build -G Ninja -DCMAKE_BUILD_TYPE=Release -DPS2X_RELEASE_LTCG=OFF\ncmake --build out/build --parallel\nctest --test-dir out/build --output-on-failure',
          },
        ],
      },
      {
        title: both('Select your console firmware', 'Selecione o firmware do console'),
        body: both('Point the tools at your ROM0, the matching console profile and its NVM. A BIOS/NVM match is verified, never inferred from file names.', 'Aponte as ferramentas para o seu ROM0, o perfil de console correspondente e a NVM. A correspondência BIOS/NVM é verificada, nunca deduzida pelo nome do arquivo.'),
        code: [{ label: 'shell', text: './out/build/ps2n use-bios <ROM0> <console-profile> <NVM>' }],
      },
      {
        title: both('Experimental firmware path', 'Caminho experimental do firmware'),
        body: both('prepare-bios prepares the original OSDSYS with revision, profile and NVM checks; bios also starts it. It enters the original main program but does not complete the Browser boot.', 'prepare-bios prepara o OSDSYS original com verificações de revisão, perfil e NVM; bios também o inicia. Ele entra no programa principal original, mas não conclui o boot do Browser.'),
        code: [{ label: 'shell', text: './out/build/ps2n prepare-bios <ROM0> <console-profile> <NVM>\n./out/build/ps2n bios <ROM0> <console-profile> <NVM>' }],
      },
      {
        title: both('Try a disc', 'Teste um disco'),
        body: both('play extracts a legally obtained disc, recompiles it with PS2Recomp, builds and runs it. The first preparation takes several minutes; compatibility depends on PS2Recomp and on the game.', 'play extrai um disco obtido legalmente, recompila com o PS2Recomp, compila e executa. A primeira preparação leva vários minutos; a compatibilidade depende do PS2Recomp e do jogo.'),
        code: [{ label: 'shell', text: './out/build/ps2n play your-disc.cue' }],
      },
    ],
    expect: [
      both('This is research software, not a playable PS2 launcher: commercial games are not expected to run, and the original Browser does not finish booting.', 'Este é um software de pesquisa, não um launcher jogável de PS2: não se espera que jogos comerciais rodem, e o Browser original não conclui o boot.'),
      both('Missing translations stop with an explicit diagnostic — there is no interpreter fallback. Passing CI does not prove gameplay on any platform.', 'Traduções ausentes param com um diagnóstico explícito — não há fallback para interpretador. Passar na CI não prova gameplay em nenhuma plataforma.'),
      both('Memory cards live in console/mc0 and console/mc1 under PS2N_DATA_DIR (override with PS2N_CONSOLE_STATE_ROOT).', 'Os memory cards ficam em console/mc0 e console/mc1 dentro de PS2N_DATA_DIR (altere com PS2N_CONSOLE_STATE_ROOT).'),
    ],
    docs: [
      { label: both('Build and test (README)', 'Build e testes (README)'), path: '#build-and-test' },
      { label: both('Launcher', 'Launcher'), path: 'blob/main/docs/LAUNCHER.md' },
      { label: both('Project status', 'Status do projeto'), path: 'blob/main/STATUS.md' },
      { label: both('Contributing', 'Como contribuir'), path: 'blob/main/CONTRIBUTING.md' },
    ],
  },

  {
    slug: 'xone-native',
    audience: 'developers',
    platform: both('Build from source · local dashboard on Windows x64', 'Compilação a partir do código · dashboard local no Windows x64'),
    requirements: [
      both('CMake and a C++20 compiler. The local dashboard and the xone-era runtime need Windows x64 with MSVC.', 'CMake e um compilador C++20. A dashboard local e o runtime xone-era exigem Windows x64 com MSVC.'),
      both('Extracted title packages (each with its AppxManifest.xml) and files that you lawfully possess and are authorized to analyze.', 'Pacotes de títulos extraídos (cada um com seu AppxManifest.xml) e arquivos que você possui legalmente e tem autorização para analisar.'),
    ],
    steps: [
      {
        title: both('Build and test', 'Compile e teste'),
        body: both('From the repository root. With a Windows multi-config generator the executable is usually build\\Release\\xone-native.exe. xone-era must be built next to xone-native (MSVC x64).', 'Na raiz do repositório. Com um gerador multi-config do Windows, o executável normalmente fica em build\\Release\\xone-native.exe. O xone-era precisa ser compilado ao lado do xone-native (MSVC x64).'),
        code: [
          {
            label: 'shell',
            text: 'git clone https://github.com/fabegalo/xone-native.git\ncd xone-native\ncmake -S . -B build -DCMAKE_BUILD_TYPE=Release\ncmake --build build --config Release\nctest --test-dir build -C Release --output-on-failure',
          },
        ],
      },
      {
        title: both('Open the local dashboard', 'Abra a dashboard local'),
        body: both('Run xone-native with no arguments (or xone-native dashboard) and create a local profile. This is the project’s locally recreated dashboard, not the original SystemOS.', 'Execute o xone-native sem argumentos (ou xone-native dashboard) e crie um perfil local. Esta é a dashboard recriada localmente pelo projeto, não o SystemOS original.'),
        code: [{ label: 'Windows', text: 'build\\Release\\xone-native.exe' }],
      },
      {
        title: both('Import a title folder', 'Importe uma pasta de títulos'),
        body: both('Go to My games & apps → Import folder and pick a folder with extracted title packages. Titles are identified by manifest and SHA-256 and start through xone-era; a title that cannot start shows the runtime’s real error.', 'Vá em Meus jogos e apps → Importar pasta e escolha uma pasta com pacotes de títulos extraídos. Os títulos são identificados por manifesto e SHA-256 e iniciam pelo xone-era; um título que não consegue iniciar mostra o erro real do runtime.'),
      },
      {
        title: both('Inspect files (optional)', 'Inspecione arquivos (opcional)'),
        body: both('The read-only inspector reports XVD and PE32+ metadata. It never copies, unpacks, decrypts, modifies or executes the input.', 'O inspetor somente leitura informa metadados de XVD e PE32+. Ele nunca copia, descompacta, descriptografa, modifica ou executa a entrada.'),
        code: [{ label: 'shell', text: './build/xone-native inspect /path/to/system.xvd --json\n./build/xone-native inspect /path/to/component.exe' }],
      },
    ],
    extra: {
      title: both('Keyboard controls', 'Controles no teclado'),
      rows: [
        { key: '← ↑ → ↓', value: both('Navigate', 'Navegar') },
        { key: 'Enter', value: both('A', 'A') },
        { key: 'Esc', value: both('B', 'B') },
        { key: 'Del', value: both('X', 'X') },
        { key: 'F2', value: both('Menu', 'Menu') },
        { key: 'Home', value: both('Guide (Ctrl+Home while a title has focus)', 'Guide (Ctrl+Home com um título em foco)') },
        { key: 'PageUp / PageDown', value: both('Bumpers', 'Bumpers') },
      ],
    },
    expect: [
      both('There are no downloadable releases; do not present the source archive as a playable application.', 'Não há releases para download; não apresente o arquivo de código-fonte como um aplicativo jogável.'),
      both('Commercial gameplay is not certified, and the original SystemOS dashboard has not been executed.', 'O gameplay comercial não é certificado, e a dashboard original do SystemOS não foi executada.'),
      both('Profiles, settings, the library and title saves live in %LOCALAPPDATA%\\xone-native (override with XONE_NATIVE_HOME).', 'Perfis, configurações, biblioteca e saves dos títulos ficam em %LOCALAPPDATA%\\xone-native (altere com XONE_NATIVE_HOME).'),
    ],
    docs: [
      { label: both('Try it (README)', 'Experimente (README)'), path: '#try-the-current-m0-inspector' },
      { label: both('Next task and evidence', 'Próxima tarefa e evidências'), path: 'blob/main/docs/NEXT-TASK.md' },
      { label: both('Project status', 'Status do projeto'), path: 'blob/main/STATUS.md' },
      { label: both('Contributing', 'Como contribuir'), path: 'blob/main/CONTRIBUTING.md' },
    ],
  },

  {
    slug: 'ps3-native',
    audience: 'developers',
    platform: both('Build from source · Windows, Linux, macOS', 'Compilação a partir do código · Windows, Linux, macOS'),
    requirements: [
      both('Git, CMake 3.25+, Ninja, Python 3.11+ and Clang with a C/C++20 toolchain.', 'Git, CMake 3.25+, Ninja, Python 3.11+ e Clang com toolchain C/C++20.'),
      both('Windows: clang-cl with MSVC headers/libraries and the Windows SDK (cl.exe alone cannot compile the upstream builtins). Linux/macOS: SDL2 development files.', 'Windows: clang-cl com headers/bibliotecas do MSVC e o Windows SDK (o cl.exe sozinho não compila os builtins do upstream). Linux/macOS: arquivos de desenvolvimento do SDL2.'),
    ],
    steps: [
      {
        title: both('Clone with submodules', 'Clone com os submódulos'),
        body: both('ps3recomp is pinned as a submodule. In an existing checkout run git submodule update --init.', 'O ps3recomp é fixado como submódulo. Em um checkout existente, execute git submodule update --init.'),
        code: [{ label: 'shell', text: 'git clone --recurse-submodules https://github.com/fabegalo/ps3-native.git\ncd ps3-native' }],
      },
      {
        title: both('Build and test', 'Compile e teste'),
        body: both('On Windows use an x64 developer prompt with clang-cl, CMake and Ninja on PATH; scripts/devshell.cmd can initialize an existing Visual Studio environment.', 'No Windows, use um prompt de desenvolvedor x64 com clang-cl, CMake e Ninja no PATH; scripts/devshell.cmd pode inicializar um ambiente existente do Visual Studio.'),
        code: [
          {
            label: 'Linux / macOS',
            text: 'cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release \\\n  -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++\ncmake --build build --parallel 3\nctest --test-dir build --output-on-failure',
          },
          {
            label: 'Windows · PowerShell',
            text: 'cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=clang-cl -DCMAKE_CXX_COMPILER=clang-cl\ncmake --build build --parallel 3\nctest --test-dir build --output-on-failure\n.\\build\\ps3-native.exe --help',
          },
        ],
      },
      {
        title: both('Run the synthetic fixtures', 'Execute as fixtures sintéticas'),
        body: both('Compile and run the project’s own PPU and SPU test programs through the real upstream runtime.', 'Compile e execute os programas de teste PPU e SPU do próprio projeto pelo runtime real do upstream.'),
        code: [
          {
            label: 'shell',
            text: 'python src/ps3native/cli.py prepare --fixture ppu\npython src/ps3native/cli.py run --fixture ppu\npython src/ps3native/cli.py prepare --fixture spu\npython src/ps3native/cli.py run --fixture spu',
          },
        ],
      },
      {
        title: both('Inspect your own content', 'Inspecione seu próprio conteúdo'),
        body: both('Read-only inventory with SHA-256, PARAM.SFO and PUP metadata. import saves a manifest outside the originals and never copies game trees.', 'Inventário somente leitura com SHA-256 e metadados de PARAM.SFO e PUP. O import salva um manifesto fora dos originais e nunca copia as árvores dos jogos.'),
        code: [
          {
            label: 'shell',
            text: 'python src/ps3native/cli.py inspect "/path/to/game/PS3_GAME"\npython src/ps3native/cli.py --catalog .local/catalog import "/path/to/PS3UPDAT.PUP"',
          },
        ],
      },
    ],
    expect: [
      both('This is an M0 research build, not a playable launcher. Retail startup runs only in bounded diagnostic sessions; no game frame, menu or VSH/XMB boot is verified.', 'Este é um build de pesquisa M0, não um launcher jogável. A inicialização de jogos retail roda apenas em sessões de diagnóstico limitadas; nenhum frame de jogo, menu ou boot do VSH/XMB foi verificado.'),
      both('Exit codes: 0 completed, 2 invalid input or tool failure, 3 stage not available yet; unsupported runtime paths stop with 86.', 'Códigos de saída: 0 concluído, 2 entrada inválida ou falha de ferramenta, 3 etapa ainda indisponível; caminhos de runtime não suportados param com 86.'),
      both('Never put ELFs, keys or generated code in Git. No ZIP or release is produced at this stage.', 'Nunca coloque ELFs, chaves ou código gerado no Git. Nenhum ZIP ou release é produzido nesta fase.'),
    ],
    docs: [
      { label: both('Build and check (README)', 'Build e verificação (README)'), path: '#build-and-check' },
      { label: both('Command contracts', 'Contratos de comandos'), path: '#command-contracts' },
      { label: both('Third-party notices', 'Avisos de terceiros'), path: 'blob/main/THIRD_PARTY_NOTICES.md' },
    ],
  },
];
