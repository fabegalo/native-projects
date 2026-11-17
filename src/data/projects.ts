/**
 * Project content.
 *
 * Every statement below is taken from the projects' own README, STATUS and
 * docs on `main` (reviewed 15 Nov 2026). Do not add compatibility, gameplay,
 * FPS or platform claims that those documents do not make. Live numbers
 * (stars, releases, dates) come from the build-time GitHub snapshot instead.
 */
import media from './media.json';

export type L = { en: string; pt: string };
export type Slug = 'x360-native' | 'ps2-native' | 'xone-native' | 'ps3-native';

export type PlatformState = 'evidence' | 'package' | 'ci' | 'planned';

export interface Shot {
  id: string;
  kind: 'capture' | 'local-recreation';
  title: L;
  caption: L;
}

export interface Video {
  /** YouTube video id on the maintainer's channel. */
  id: string;
  title: L;
  caption: L;
  date: string;
  duration: string;
}

export interface Project {
  slug: Slug;
  name: string;
  console: string;
  maker: 'Microsoft' | 'Sony';
  year: number;
  silicon: string;
  /** Short code shown on the hero die (architecture family). */
  isa: string;
  accent: string;
  accentSoft: string;
  tagline: L;
  summary: L;
  tech: L;
  status: { label: L; tone: 'release' | 'research' };
  intro: L[];
  goals: L[];
  pipeline: { title: L; body: L }[];
  matrix: { area: L; done: L; next: L }[];
  highlights: { date: string; text: L }[];
  platforms: { name: string; state: PlatformState; note?: L }[];
  shots: Shot[];
  videos: Video[];
  bannerAlt: L;
  bannerIsConcept: boolean;
  docs: { label: L; path: string }[];
  contributing: string | null;
  license: L;
  credits: L;
}

const both = (en: string, pt: string): L => ({ en, pt });

export const projects: Project[] = [
  {
    slug: 'x360-native',
    name: 'x360-native',
    console: 'Xbox 360',
    maker: 'Microsoft',
    year: 2005,
    silicon: 'Xenon PowerPC · Xenos GPU',
    isa: 'PPC',
    accent: '#5bd95b',
    accentSoft: '#1f7a2a',
    tagline: both(
      'Static PowerPC recompilation, the original Dashboard 17559 and a compatibility runtime built on ReXGlue.',
      'Recompilação estática de PowerPC, a Dashboard 17559 original e um runtime de compatibilidade baseado no ReXGlue.',
    ),
    summary: both(
      'Analyzes the original PowerPC code before launch, generates C++ and compiles it into a native PC executable. A ReXGlue-based runtime recreates console services and translates Xenos graphics to the host GPU.',
      'Analisa o código PowerPC original antes da execução, gera C++ e o compila em um executável nativo para PC. Um runtime baseado no ReXGlue recria os serviços do console e traduz os gráficos Xenos para a GPU do host.',
    ),
    tech: both('PowerPC AOT → C++ · ReXGlue · Xenos → D3D12', 'AOT PowerPC → C++ · ReXGlue · Xenos → D3D12'),
    status: { label: both('Experimental · public releases', 'Experimental · releases públicas'), tone: 'release' },
    intro: [
      both(
        'x360-native is an open research platform for running Xbox 360 software through static PowerPC recompilation. No JIT or instruction interpreter runs in the main path; a compatibility runtime built on ReXGlue still recreates console services and translates Xenos graphics work to the host GPU.',
        'O x360-native é uma plataforma aberta de pesquisa para executar software de Xbox 360 por meio de recompilação estática de PowerPC. Nenhum JIT ou interpretador de instruções roda no caminho principal; um runtime de compatibilidade baseado no ReXGlue ainda recria os serviços do console e traduz o trabalho gráfico do Xenos para a GPU do host.',
      ),
      both(
        'The original Xbox 360 dashboard is a target in its own right. Boot, navigation, My Games, launching a prepared game and returning to the dashboard are tracked as compatibility flows. The desktop app imports and prepares your local content; it does not replace the dashboard.',
        'A dashboard original do Xbox 360 é um objetivo próprio. Boot, navegação, My Games, iniciar um jogo preparado e voltar à dashboard são acompanhados como fluxos de compatibilidade. O app de desktop importa e prepara o seu conteúdo local; ele não substitui a dashboard.',
      ),
    ],
    goals: [
      both('Dependable first-time installation and preparation on a clean Windows system.', 'Instalação e preparação confiáveis na primeira execução em um Windows limpo.'),
      both('More original dashboard versions, each with its own matching resources and evidence.', 'Mais versões originais da dashboard, cada uma com seus próprios recursos correspondentes e evidências.'),
      both('Better profiles, Guide, XAM services and real game save/load.', 'Perfis, Guide e serviços XAM melhores, além de save/load real nos jogos.'),
      both('More titles through generic AOT improvements, not per-game hacks.', 'Mais títulos por meio de melhorias genéricas no AOT, sem hacks por jogo.'),
      both('Linux, macOS and ARM64 as separate targets with their own end-to-end validation.', 'Linux, macOS e ARM64 como alvos separados, com validação ponta a ponta própria.'),
    ],
    pipeline: [
      {
        title: both('Bring your own files', 'Seus próprios arquivos'),
        body: both('Inputs are identified by SHA-256 and matched to a dashboard or title profile. No Xbox content ships with the project.', 'As entradas são identificadas por SHA-256 e associadas a um perfil de dashboard ou título. Nenhum conteúdo do Xbox acompanha o projeto.'),
      },
      {
        title: both('Recompile ahead of time', 'Recompilação antecipada'),
        body: both('PowerPC code becomes C++ and then a native build, compiled locally on your machine.', 'O código PowerPC vira C++ e depois um build nativo, compilado localmente na sua máquina.'),
      },
      {
        title: both('Compatibility runtime', 'Runtime de compatibilidade'),
        body: both('Kernel/XAM services, storage, input and audio are reimplemented; Xenos commands and shaders are translated to the host GPU. The original kernel and firmware are not booted.', 'Serviços de kernel/XAM, armazenamento, entrada e áudio são reimplementados; comandos e shaders do Xenos são traduzidos para a GPU do host. O kernel e o firmware originais não são inicializados.'),
      },
      {
        title: both('Validate the real flow', 'Validação do fluxo real'),
        body: both('Each dashboard version and game build is checked against the flows it actually reaches, with dated evidence.', 'Cada versão da dashboard e build de jogo é verificado nos fluxos que realmente alcança, com evidências datadas.'),
      },
    ],
    matrix: [
      {
        area: both('Dashboard 17559 (Metro)', 'Dashboard 17559 (Metro)'),
        done: both('Original intro and audio, navigation, My Games, local profiles, Guide, game launch and return', 'Intro e áudio originais, navegação, My Games, perfis locais, Guide, iniciar jogo e retornar'),
        next: both('Several system services and settings are partial; one local user in slot 0', 'Vários serviços e configurações do sistema são parciais; um usuário local no slot 0'),
      },
      {
        area: both('Castle Crashers', 'Castle Crashers'),
        done: both('Launch from 17559, menu, input, rendering, return to the dashboard', 'Inicia pela 17559, menu, entrada, renderização, retorno à dashboard'),
        next: both('Campaign, entitlement, save/load', 'Campanha, entitlement, save/load'),
      },
      {
        area: both('Forza Horizon', 'Forza Horizon'),
        done: both('Driving with input and audio, Guide/Xbox Home return to 17559', 'Direção com entrada e áudio, retorno à 17559 pelo Guide/Xbox Home'),
        next: both('Campaign, save/load', 'Campanha, save/load'),
      },
      {
        area: both('Minecraft (Generic AOT)', 'Minecraft (AOT genérico)'),
        done: both('Trial tutorial, movement and block breaking', 'Tutorial da versão trial, movimentação e quebra de blocos'),
        next: both('Save/reload, sustained play', 'Salvar/recarregar, jogo contínuo'),
      },
      {
        area: both('Forza Horizon 2 (Generic AOT)', 'Forza Horizon 2 (AOT genérico)'),
        done: both('Initial drive with HUD, minimap and input', 'Direção inicial com HUD, minimapa e entrada'),
        next: both('Campaign, save/reload, sustained play', 'Campanha, salvar/recarregar, jogo contínuo'),
      },
      {
        area: both('Motocross Madness', 'Motocross Madness'),
        done: both('Tutorial movement and objectives', 'Movimentação e objetivos do tutorial'),
        next: both('Full My Games/profile/Guide flow, races, save/load', 'Fluxo completo de My Games/perfil/Guide, corridas, save/load'),
      },
      {
        area: both('Charlie Murder', 'Charlie Murder'),
        done: both('AOT preparation and My Games routing; reached NetCF bootstrap', 'Preparação AOT e roteamento pela My Games; chegou ao bootstrap do NetCF'),
        next: both('XNA initialization, rendering, gameplay', 'Inicialização do XNA, renderização, gameplay'),
      },
      {
        area: both('Dashboard 6717 (Blades)', 'Dashboard 6717 (Blades)'),
        done: both('Builds; historical navigation', 'Compila; navegação histórica'),
        next: both('Matching font/resource missing; diagnostic only', 'Falta a fonte/recurso correspondente; apenas diagnóstico'),
      },
      {
        area: both('Native D3D12 / Vulkan', 'Native D3D12 / Vulkan'),
        done: both('Experimental execution and synthetic GPU contracts', 'Execução experimental e contratos sintéticos de GPU'),
        next: both('Gameplay performance; Xenos results do not transfer', 'Desempenho em gameplay; resultados do Xenos não se transferem'),
      },
    ],
    highlights: [
      {
        date: '2026-11-09',
        text: both('Original Avatar MiniCreator compiled AOT on Dashboard 17559: the chosen avatar and gamerpic are saved to the local profile (scripted-input session).', 'Avatar MiniCreator original compilado via AOT na Dashboard 17559: o avatar e a gamerpic escolhidos são gravados no perfil local (sessão com entrada por script).'),
      },
      {
        date: '2026-11-09',
        text: both('Turning the console off from the Guide now ends the session through the original XAM power menu.', 'Desligar o console pelo Guide agora encerra a sessão pelo menu de energia original da XAM.'),
      },
      {
        date: '2026-11-07',
        text: both('Kinect black square on the 17559 Home fixed: the sensor query now reports no device while there is no sensor backend.', 'Quadrado preto do Kinect na Home da 17559 corrigido: a consulta ao sensor agora informa ausência de dispositivo enquanto não há backend de sensor.'),
      },
      {
        date: '2026-11-02',
        text: both('Clean installation at a 337-character Unicode path imported and prepared the 17559 dashboard and Castle Crashers.', 'Instalação limpa em um caminho Unicode de 337 caracteres importou e preparou a dashboard 17559 e o Castle Crashers.'),
      },
    ],
    platforms: [
      { name: 'Windows x64', state: 'evidence', note: both('Primary configuration, Xenos D3D12 backend', 'Configuração principal, backend Xenos D3D12') },
      { name: 'Windows ARM64', state: 'package' },
      { name: 'Linux x64 / Steam Deck', state: 'package' },
      { name: 'Linux ARM64', state: 'package' },
      { name: 'macOS Apple Silicon', state: 'package' },
      { name: 'macOS Intel', state: 'package' },
    ],
    shots: [
      {
        id: 'dashboard-home',
        kind: 'capture',
        title: both('Original Dashboard 17559 · Home', 'Dashboard 17559 original · Home'),
        caption: both('Xenos D3D12 backend, local test session, October 2026.', 'Backend Xenos D3D12, sessão de teste local, outubro de 2026.'),
      },
      {
        id: 'dashboard-games',
        kind: 'capture',
        title: both('Dashboard 17559 · Games tab', 'Dashboard 17559 · aba Games'),
        caption: both('My Games tile, captured with the experimental Native D3D12 backend.', 'Bloco My Games, capturado com o backend experimental Native D3D12.'),
      },
      {
        id: 'castle-crashers-menu',
        kind: 'capture',
        title: both('Castle Crashers · main menu', 'Castle Crashers · menu principal'),
        caption: both('Launched from Dashboard 17559. A reached state, not certified gameplay.', 'Iniciado pela Dashboard 17559. Um estado alcançado, não gameplay certificado.'),
      },
      {
        id: 'forza-horizon-driving',
        kind: 'capture',
        title: both('Forza Horizon · open road with HUD', 'Forza Horizon · estrada com HUD'),
        caption: both('Driving with input and audio. Campaign and save/load are not certified.', 'Direção com entrada e áudio. Campanha e save/load não são certificados.'),
      },
      {
        id: 'forza-horizon-2-title',
        kind: 'capture',
        title: both('Forza Horizon 2 · title screen', 'Forza Horizon 2 · tela de título'),
        caption: both('Generic AOT path.', 'Caminho de AOT genérico.'),
      },
      {
        id: 'minecraft-tutorial-world',
        kind: 'capture',
        title: both('Minecraft · tutorial world', 'Minecraft · mundo tutorial'),
        caption: both('Generic AOT path, trial tutorial.', 'Caminho de AOT genérico, tutorial da versão trial.'),
      },
    ],
    videos: [
      {
        id: 'BiYYYbv1u5M',
        title: both('Forza Horizon running natively on PC · tech demo with achievements', 'Forza Horizon nativo no PC · tech demo com conquistas'),
        caption: both('Recorded local session published on the maintainer’s channel. It shows a reached state, not certified gameplay.', 'Sessão local gravada e publicada no canal do mantenedor. Mostra um estado alcançado, não gameplay certificado.'),
        date: '2026-10-21',
        duration: '7:58',
      },
      {
        id: 'r1QodQ3AYdw',
        title: both('Motocross Madness running natively on PC', 'Motocross Madness nativo no PC'),
        caption: both('Recorded local session published on the maintainer’s channel. It shows a reached state, not certified gameplay.', 'Sessão local gravada e publicada no canal do mantenedor. Mostra um estado alcançado, não gameplay certificado.'),
        date: '2026-10-21',
        duration: '3:30',
      },
    ],
    bannerAlt: both('Official x360-native banner: an abstract console dissolving into native processor circuitry.', 'Banner oficial do x360-native: um console abstrato se dissolvendo em circuitos de processador nativo.'),
    bannerIsConcept: true,
    docs: [
      { label: both('Project status', 'Status do projeto'), path: 'blob/main/STATUS.md' },
      { label: both('Compatibility matrix', 'Matriz de compatibilidade'), path: 'blob/main/docs/compatibility.md' },
      { label: both('Architecture', 'Arquitetura'), path: 'blob/main/docs/architecture.md' },
      { label: both('Dashboard', 'Dashboard'), path: 'blob/main/docs/dashboard.md' },
      { label: both('Build guide', 'Guia de build'), path: 'blob/main/docs/guides/BUILDING.md' },
      { label: both('Documentation index', 'Índice da documentação'), path: 'blob/main/docs/README.md' },
    ],
    contributing: 'blob/main/CONTRIBUTING.md',
    license: both(
      'Project code is BSD-3-Clause. Dependencies keep their own licenses (see THIRD_PARTY_NOTICES). Recompilation does not grant rights to redistribute original software or assets.',
      'O código do projeto é BSD-3-Clause. As dependências mantêm suas próprias licenças (veja THIRD_PARTY_NOTICES). A recompilação não concede direito de redistribuir software ou assets originais.',
    ),
    credits: both(
      'Built on the ReXGlue project and its contributors, and on the Xenia work on which ReXGlue’s compatibility runtime is based.',
      'Construído sobre o projeto ReXGlue e seus contribuidores, e sobre o trabalho do Xenia no qual o runtime de compatibilidade do ReXGlue se baseia.',
    ),
  },

  {
    slug: 'ps2-native',
    name: 'ps2-native',
    console: 'PlayStation 2',
    maker: 'Sony',
    year: 2000,
    silicon: 'Emotion Engine R5900 · IOP · VU0/VU1 · GS',
    isa: 'MIPS',
    accent: '#4cc9f0',
    accentSoft: '#155e75',
    tagline: both(
      'Ahead-of-time recompilation of Emotion Engine, IOP and VU code, with the original BIOS and Browser as first-class targets.',
      'Recompilação antecipada de código do Emotion Engine, do IOP e das VUs, com a BIOS e o Browser originais como alvos principais.',
    ),
    summary: both(
      'Translates EE/R5900, IOP/R3000A and VU code to native C++ ahead of time through a pinned PS2Recomp, with system services supplied by native HLE. Missing translations stop explicitly instead of falling back to an interpreter.',
      'Traduz antecipadamente código EE/R5900, IOP/R3000A e VU para C++ nativo por meio de um PS2Recomp fixado, com serviços de sistema fornecidos por HLE nativo. Traduções ausentes param explicitamente, sem recorrer a um interpretador.',
    ),
    tech: both('EE/IOP/VU AOT · PS2Recomp · native HLE', 'AOT EE/IOP/VU · PS2Recomp · HLE nativo'),
    status: { label: both('Research · no public release', 'Pesquisa · sem release pública'), tone: 'research' },
    intro: [
      both(
        'The goal is to execute the original PlayStation 2 BIOS/interface and games on modern computers. Executed EE/R5900, IOP/R3000A and VU0/VU1 instructions must be compiled for the host; GS, DMA, SPU2, controls, memory and timing remain the job of the shared runtime.',
        'O objetivo é executar a BIOS/interface original do PlayStation 2 e seus jogos em computadores modernos. As instruções executadas de EE/R5900, IOP/R3000A e VU0/VU1 precisam ser compiladas para o host; GS, DMA, SPU2, controles, memória e temporização continuam a cargo do runtime compartilhado.',
      ),
      both(
        'Today ps2-native is experimental research software, not a playable launcher. It analyzes and recompiles a verified subset of PS2 code and executes part of the original firmware; it does not complete the original Browser boot or run commercial games.',
        'Hoje o ps2-native é um software experimental de pesquisa, não um launcher jogável. Ele analisa e recompila um subconjunto verificado de código de PS2 e executa parte do firmware original; ainda não conclui o boot do Browser original nem executa jogos comerciais.',
      ),
    ],
    goals: [
      both('Generic EE/IOP/VU AOT with native HLE services, without per-game hacks or silent fallbacks.', 'AOT genérico de EE/IOP/VU com serviços HLE nativos, sem hacks por jogo ou fallbacks silenciosos.'),
      both('Boot the original BIOS and PlayStation 2 Browser — no imitation menus.', 'Inicializar a BIOS e o Browser originais do PlayStation 2 — sem menus imitados.'),
      both('Faithful GS, DMA, SPU2, controls and timing.', 'GS, DMA, SPU2, controles e temporização fiéis.'),
      both('A cross-platform launcher and measured original speed.', 'Um launcher multiplataforma e velocidade original medida.'),
      both('Performance-first, correctness-preserving: enhanced rendering must never change game logic or synchronization.', 'Desempenho em primeiro lugar, sem sacrificar a correção: renderização aprimorada nunca pode alterar a lógica ou a sincronização do jogo.'),
    ],
    pipeline: [
      {
        title: both('Validate the inputs', 'Validação das entradas'),
        body: both('User-supplied firmware or a legally obtained MIPS executable is checked; each BIOS revision, region and its resources stay isolated.', 'O firmware fornecido pelo usuário ou um executável MIPS obtido legalmente é verificado; cada revisão de BIOS, região e seus recursos ficam isolados.'),
      },
      {
        title: both('Analyze and emit C++20', 'Análise e geração de C++20'),
        body: both('Provably reachable code is analyzed and emitted as C++20 AOT blocks for instructions with supported semantics.', 'O código comprovadamente alcançável é analisado e emitido como blocos AOT em C++20 para instruções com semântica suportada.'),
      },
      {
        title: both('Execute with native HLE', 'Execução com HLE nativo'),
        body: both('Prepared artifacts run with native HLE services. Missing code requires offline preparation and a precise diagnostic; interpreter fallback is not permitted.', 'Os artefatos preparados rodam com serviços HLE nativos. Código ausente exige preparação offline e um diagnóstico preciso; fallback para interpretador não é permitido.'),
      },
      {
        title: both('Raise hardware fidelity', 'Aumento da fidelidade de hardware'),
        body: both('Hardware behavior improves through technical evidence, synthetic tests and documented firmware observations. Unsupported operations never silently succeed.', 'O comportamento do hardware evolui com evidências técnicas, testes sintéticos e observações documentadas do firmware. Operações não suportadas nunca têm sucesso silencioso.'),
      },
    ],
    matrix: [
      {
        area: both('Native AOT', 'AOT nativo'),
        done: both('Validated ELF32/MIPS analysis, conservative control-flow discovery, generated C++ and synthetic end-to-end execution', 'Análise ELF32/MIPS validada, descoberta conservadora de fluxo de controle, C++ gerado e execução sintética ponta a ponta'),
        next: both('Broad commercial-game translation and dynamic-code coverage', 'Tradução ampla de jogos comerciais e cobertura de código dinâmico'),
      },
      {
        area: both('Emotion Engine', 'Emotion Engine'),
        done: both('Partial R5900 semantics, memory/TLB, hardware boot and offline AOT/native execution', 'Semântica parcial do R5900, memória/TLB, boot de hardware e execução AOT/nativa offline'),
        next: both('Full CPU behavior, precise timing and exceptions', 'Comportamento completo da CPU, temporização precisa e exceções'),
      },
      {
        area: both('IOP and firmware', 'IOP e firmware'),
        done: both('Partial R3000A boot, hardware registers, external NVM support, SIF flags and VBLANK', 'Boot parcial do R3000A, registradores de hardware, suporte a NVM externa, flags SIF e VBLANK'),
        next: both('Complete BIOS/Browser boot, full interrupts, SIF DMA and peripheral services', 'Boot completo da BIOS/Browser, interrupções completas, SIF DMA e serviços de periféricos'),
      },
      {
        area: both('Graphics', 'Gráficos'),
        done: both('GS/GIF control registers, timing and a limited GIF PATH3 packet path', 'Registradores de controle GS/GIF, temporização e um caminho limitado de pacotes GIF PATH3'),
        next: both('Framebuffer rendering, full GS/VU/VIF and game graphics', 'Renderização de framebuffer, GS/VU/VIF completos e gráficos de jogos'),
      },
      {
        area: both('Games and user experience', 'Jogos e experiência de uso'),
        done: both('Desktop library, native-module preparation, developer tools and synthetic fixtures', 'Biblioteca de desktop, preparação de módulos nativos, ferramentas de desenvolvimento e fixtures sintéticas'),
        next: both('Playable games, installers and public releases', 'Jogos jogáveis, instaladores e releases públicas'),
      },
    ],
    highlights: [
      {
        date: '2026-11-15',
        text: both('Original BIOS session: RESET starts all 39 original modules, EESYNC publishes BOOTEND and SIF initialization advances. The next boundary is the native RPC_BIND protocol. No Browser image yet.', 'Sessão com a BIOS original: o RESET inicia os 39 módulos originais, o EESYNC publica BOOTEND e a inicialização SIF avança. A próxima fronteira é o protocolo RPC_BIND nativo. Ainda sem imagem do Browser.'),
      },
      {
        date: '2026-11-14',
        text: both('Development log: in a Windows x64 diagnostic session, God of War reached its menu (logo, “New Game”). Gameplay was not reached.', 'Registro de desenvolvimento: em uma sessão de diagnóstico no Windows x64, God of War chegou ao menu (logo, “New Game”). O gameplay não foi alcançado.'),
      },
      {
        date: '2026-11-08',
        text: both('Runtime is now AOT/native only: interpreters were removed from production, and a missing translation stops with an explicit error.', 'O runtime agora é somente AOT/nativo: os interpretadores foram removidos da produção e uma tradução ausente para com erro explícito.'),
      },
      {
        date: '2026-11-07',
        text: both('Ethernet MAC reset, descriptors, MDIO and loopback packet passed in the original firmware.', 'Reset do MAC Ethernet, descritores, MDIO e pacote em loopback passaram no firmware original.'),
      },
    ],
    platforms: [
      { name: 'Windows x64', state: 'ci', note: both('Development sessions run here; CI build and tests', 'Sessões de desenvolvimento rodam aqui; build e testes em CI') },
      { name: 'Windows ARM64', state: 'ci' },
      { name: 'Linux x64 / Steam Deck', state: 'ci' },
      { name: 'Linux ARM64', state: 'ci' },
      { name: 'macOS Apple Silicon', state: 'ci' },
      { name: 'macOS Intel', state: 'ci' },
    ],
    shots: [],
    videos: [],
    bannerAlt: both('Official ps2-native banner: concept art of MIPS code flowing through AOT recompilation into native instructions.', 'Banner oficial do ps2-native: arte conceitual de código MIPS passando pela recompilação AOT até instruções nativas.'),
    bannerIsConcept: true,
    docs: [
      { label: both('Project status', 'Status do projeto'), path: 'blob/main/STATUS.md' },
      { label: both('Architecture', 'Arquitetura'), path: 'blob/main/docs/ARCHITECTURE.md' },
      { label: both('Next engineering task', 'Próxima tarefa de engenharia'), path: 'blob/main/docs/NEXT-TASK.md' },
      { label: both('Launcher', 'Launcher'), path: 'blob/main/docs/LAUNCHER.md' },
      { label: both('Licensing decisions', 'Decisões de licenciamento'), path: 'blob/main/docs/LICENSE-DECISION.md' },
      { label: both('Documentation index', 'Índice da documentação'), path: 'blob/main/docs/README.md' },
    ],
    contributing: 'blob/main/CONTRIBUTING.md',
    license: both(
      'Original ps2-native code is BSD-3-Clause. The directly compiled PS2Recomp HLE kernel is GPL-3.0, so combined binaries must comply with GPL-3.0, including corresponding source.',
      'O código original do ps2-native é BSD-3-Clause. O kernel HLE do PS2Recomp, compilado diretamente, é GPL-3.0; por isso binários combinados precisam cumprir a GPL-3.0, incluindo o código-fonte correspondente.',
    ),
    credits: both(
      'Execution uses the pinned PS2Recomp project by ran-j. PCSX2 and PS2SDK serve as behavioral references.',
      'A execução usa o projeto PS2Recomp, de ran-j, em versão fixada. O PCSX2 e o PS2SDK servem como referências de comportamento.',
    ),
  },

  {
    slug: 'xone-native',
    name: 'xone-native',
    console: 'Xbox One',
    maker: 'Microsoft',
    year: 2013,
    silicon: 'AMD Jaguar x86-64 · HostOS / SystemOS / GameOS',
    isa: 'x86-64',
    accent: '#3ee8a3',
    accentSoft: '#0f6b4c',
    tagline: both(
      'x86-64 execution research for Xbox One: an ERA runtime for original titles, with the authentic SystemOS dashboard as the long-term goal.',
      'Pesquisa de execução x86-64 para Xbox One: um runtime ERA para títulos originais, com a dashboard autêntica do SystemOS como objetivo de longo prazo.',
    ),
    summary: both(
      'Runs original ERA titles through partial KernelX / Xbox WinRT services and D3D11.X → D3D12 translation. A locally recreated dashboard drives the same runtime while the original SystemOS remains a future goal.',
      'Executa títulos ERA originais com serviços parciais de KernelX / Xbox WinRT e tradução D3D11.X → D3D12. Uma dashboard recriada localmente aciona o mesmo runtime, enquanto o SystemOS original continua sendo um objetivo futuro.',
    ),
    tech: both('x86-64 ERA runtime · KernelX / WinRT · D3D11.X → D3D12', 'Runtime ERA x86-64 · KernelX / WinRT · D3D11.X → D3D12'),
    status: { label: both('Runtime research · no public release', 'Pesquisa de runtime · sem release pública'), tone: 'research' },
    intro: [
      both(
        'Xbox One software targets x86-64, but its original environment consists of separate HostOS, SystemOS and GameOS/ERA components, with Xbox-specific virtualization, services, devices, graphics interfaces and security. Matching the CPU architecture alone does not make its executables ordinary desktop programs.',
        'O software do Xbox One tem como alvo x86-64, mas seu ambiente original é formado por componentes separados — HostOS, SystemOS e GameOS/ERA — com virtualização, serviços, dispositivos, interfaces gráficas e segurança próprios do Xbox. Ter a mesma arquitetura de CPU não transforma seus executáveis em programas de desktop comuns.',
      ),
      both(
        'The preferred strategy is direct x86-64 execution where technically demonstrated, with a modular compatibility layer for Xbox services, and a VM-based or hybrid SystemOS path only when real dependencies require it. This is not a port of x360-native’s PowerPC AOT architecture.',
        'A estratégia preferida é a execução direta de x86-64 onde isso estiver tecnicamente demonstrado, com uma camada modular de compatibilidade para os serviços do Xbox, e um caminho de SystemOS via VM ou híbrido somente quando dependências reais exigirem. Isto não é um porte da arquitetura AOT de PowerPC do x360-native.',
      ),
    ],
    goals: [
      both('Launch the original SystemOS shell and dashboard and navigate it with a controller.', 'Inicializar o shell e a dashboard originais do SystemOS e navegá-los com um controle.'),
      both('Local profiles, Guide and library inside the original shell.', 'Perfis locais, Guide e biblioteca dentro do shell original.'),
      both('Launch a supported game from that dashboard and return to the original shell.', 'Iniciar um jogo suportado a partir dessa dashboard e retornar ao shell original.'),
      both('GameOS/ERA execution through verified KernelX, Xbox WinRT, graphics, audio and input contracts.', 'Execução GameOS/ERA por contratos verificados de KernelX, Xbox WinRT, gráficos, áudio e entrada.'),
      both('Two graphics directions: Xbox (original fidelity) and Native (measured PC enhancements).', 'Duas direções gráficas: Xbox (fidelidade original) e Native (melhorias medidas para PC).'),
    ],
    pipeline: [
      {
        title: both('Inventory and version profiles', 'Inventário e perfis de versão'),
        body: both('Original modules and assets must match their SystemOS revision, provenance and SHA-256 hashes. No cross-version fallback.', 'Módulos e assets originais precisam corresponder à revisão do SystemOS, à procedência e aos hashes SHA-256. Sem fallback entre versões.'),
      },
      {
        title: both('GameOS / ERA session', 'Sessão GameOS / ERA'),
        body: both('An ERA x86-64 loader with partial KernelX and Xbox WinRT contracts runs the original title code.', 'Um loader ERA x86-64 com contratos parciais de KernelX e Xbox WinRT executa o código original do título.'),
      },
      {
        title: both('Graphics translation', 'Tradução gráfica'),
        body: both('The Windows ERA backend translates a subset of D3D11.X to D3D12. Complete renderer coverage is unfinished.', 'O backend ERA para Windows traduz um subconjunto de D3D11.X para D3D12. A cobertura completa do renderizador ainda não está concluída.'),
      },
      {
        title: both('Session supervisor', 'Supervisor de sessão'),
        body: both('Dashboard → title → Guide → return, sharing console state, catalog and storage. The original SystemOS will plug into the same contracts.', 'Dashboard → título → Guide → retorno, compartilhando estado do console, catálogo e armazenamento. O SystemOS original vai se conectar aos mesmos contratos.'),
      },
    ],
    matrix: [
      {
        area: both('GameOS / ERA / graphics', 'GameOS / ERA / gráficos'),
        done: both('Original x86-64 title execution, partial KernelX/Xbox WinRT services and D3D11.X → D3D12 translation; Sonic Mania startup and title screen; supervised return to the local dashboard', 'Execução de títulos x86-64 originais, serviços parciais de KernelX/Xbox WinRT e tradução D3D11.X → D3D12; inicialização e tela de título do Sonic Mania; retorno supervisionado à dashboard local'),
        next: both('Certified commercial gameplay, audible original audio, complete API/graphics coverage', 'Gameplay comercial certificado, áudio original audível, cobertura completa de API/gráficos'),
      },
      {
        area: both('Local dashboard (recreation)', 'Dashboard local (recriação)'),
        done: both('Local profiles, Home, My games & apps, Guide, settings, keyboard and XInput navigation, UI sounds; folder import by manifest + SHA-256; launch and return with the real exit result', 'Perfis locais, Home, Meus jogos e apps, Guide, configurações, navegação por teclado e XInput, sons de interface; importação de pasta por manifesto + SHA-256; iniciar e retornar com o resultado real de saída'),
        next: both('Commercial gameplay through it; Linux/macOS host adapters; physical-controller validation', 'Gameplay comercial por ela; adaptadores de host para Linux/macOS; validação com controle físico'),
      },
      {
        area: both('SystemOS / original dashboard', 'SystemOS / dashboard original'),
        done: both('Architecture and obstacles documented', 'Arquitetura e obstáculos documentados'),
        next: both('Original frame, boot, navigation, Guide, profiles', 'Frame original, boot, navegação, Guide, perfis'),
      },
      {
        area: both('XVD inspection', 'Inspeção de XVD'),
        done: both('Recognizes the header at 0x200 and reports structural metadata', 'Reconhece o cabeçalho em 0x200 e informa metadados estruturais'),
        next: both('Signature verification, readable payload, decryption, SystemOS boot', 'Verificação de assinatura, payload legível, descriptografia, boot do SystemOS'),
      },
      {
        area: both('PE32+ x64 inspection', 'Inspeção de PE32+ x64'),
        done: both('Image properties, DLL imports, imported symbols and static TLS validation', 'Propriedades da imagem, imports de DLL, símbolos importados e validação de TLS estático'),
        next: both('Xbox-specific provenance, NT/WinRT activation', 'Procedência específica do Xbox, ativação NT/WinRT'),
      },
    ],
    highlights: [
      {
        date: '2026-11-15',
        text: both('Sonic Mania 1.0.4.2 reached its original title screen through the ERA runtime on Windows x64. Gameplay is not certified.', 'Sonic Mania 1.0.4.2 chegou à sua tela de título original pelo runtime ERA no Windows x64. O gameplay não é certificado.'),
      },
      {
        date: '2026-11-15',
        text: both('The local dashboard launches a title, composes its Guide over the title output and returns to Home with shared profile and storage state.', 'A dashboard local inicia um título, compõe o Guide sobre a saída do título e retorna à Home com estado compartilhado de perfil e armazenamento.'),
      },
      {
        date: '2026-11-07',
        text: both('Read-only XVD mount probe: the installed provider loaded, but real system.xvd mount attempts returned 0x80070570; the cause is still undetermined.', 'Teste de montagem somente leitura de XVD: o provedor instalado carregou, mas as tentativas reais com system.xvd retornaram 0x80070570; a causa ainda não foi determinada.'),
      },
      {
        date: '2026-11-07',
        text: both('Long-path I/O: inventory, inspection and launch work with Unicode directories above 380 characters.', 'E/S com caminhos longos: inventário, inspeção e lançamento funcionam com diretórios Unicode acima de 380 caracteres.'),
      },
    ],
    platforms: [
      { name: 'Windows x64', state: 'evidence', note: both('Local dashboard and ERA runtime, local sessions', 'Dashboard local e runtime ERA, sessões locais') },
      { name: 'Windows / Linux / macOS host builds', state: 'ci', note: both('CI builds and tests; not runtime support', 'Build e testes em CI; não é suporte de runtime') },
      { name: 'Windows ARM64', state: 'planned' },
      { name: 'Linux x64 / Steam Deck', state: 'planned' },
      { name: 'Linux ARM64', state: 'planned' },
      { name: 'macOS Intel / Apple Silicon', state: 'planned' },
    ],
    shots: [
      {
        id: 'sonic-mania-title',
        kind: 'capture',
        title: both('Sonic Mania · original title screen', 'Sonic Mania · tela de título original'),
        caption: both('Rendered by the ERA runtime, Windows x64, 15 Nov 2026. Gameplay not certified.', 'Renderizada pelo runtime ERA, Windows x64, 15/11/2026. Gameplay não certificado.'),
      },
      {
        id: 'forza-horizon-2-title',
        kind: 'capture',
        title: both('Forza Horizon 2 · original title screen', 'Forza Horizon 2 · tela de título original'),
        caption: both('Shown in the xone-era window on Windows x64, with the game set to Brazilian Portuguese. Gameplay not certified.', 'Exibida na janela do xone-era no Windows x64, com o jogo em português do Brasil. Gameplay não certificado.'),
      },
      {
        id: 'local-dashboard-home',
        kind: 'local-recreation',
        title: both('Local dashboard · Home after title return', 'Dashboard local · Home após o retorno do título'),
        caption: both('Output of the locally recreated dashboard (local_recreation), inspired by the 2015 NXOE. This is not the original SystemOS.', 'Saída da dashboard recriada localmente (local_recreation), inspirada na NXOE de 2015. Não é o SystemOS original.'),
      },
    ],
    videos: [],
    bannerAlt: both('Official xone-native banner: concept art of a console-to-PC transition through compatibility layers; not a system screenshot.', 'Banner oficial do xone-native: arte conceitual de uma transição do console para o PC por camadas de compatibilidade; não é uma captura do sistema.'),
    bannerIsConcept: true,
    docs: [
      { label: both('Project status', 'Status do projeto'), path: 'blob/main/STATUS.md' },
      { label: both('M0 technical report', 'Relatório técnico M0'), path: 'blob/main/docs/M0.md' },
      { label: both('M1 status', 'Status do M1'), path: 'blob/main/docs/M1-STATUS.md' },
      { label: both('Next task and evidence', 'Próxima tarefa e evidências'), path: 'blob/main/docs/NEXT-TASK.md' },
      { label: both('Documentation index', 'Índice da documentação'), path: 'blob/main/docs/README.md' },
      { label: both('Security policy', 'Política de segurança'), path: 'blob/main/SECURITY.md' },
    ],
    contributing: 'blob/main/CONTRIBUTING.md',
    license: both(
      'Original xone-native code is BSD-3-Clause. Third-party components keep their own terms; none are vendored at this stage.',
      'O código original do xone-native é BSD-3-Clause. Componentes de terceiros mantêm seus próprios termos; nenhum está incluído no repositório nesta fase.',
    ),
    credits: both(
      'Informed by public research from Xbox One Research, WinDurango and Azimuth documentation. Their code is not copied; reuse would require technical and license review.',
      'Embasado em pesquisa pública do Xbox One Research, do WinDurango e da documentação do Azimuth. O código deles não é copiado; qualquer reúso exigiria revisão técnica e de licença.',
    ),
  },

  {
    slug: 'ps3-native',
    name: 'ps3-native',
    console: 'PlayStation 3',
    maker: 'Sony',
    year: 2006,
    silicon: 'Cell Broadband Engine (PPU + SPUs) · RSX',
    isa: 'CELL',
    accent: '#6e8bff',
    accentSoft: '#2a3a8f',
    tagline: both(
      'PPU and SPU ahead-of-time recompilation on ps3recomp, with RSX graphics and the original VSH/XMB as the system target.',
      'Recompilação antecipada de PPU e SPU sobre o ps3recomp, com gráficos RSX e o VSH/XMB original como alvo de sistema.',
    ),
    summary: both(
      'Compiles PPU and SPU code to native code ahead of time using a pinned ps3recomp, with strict stops instead of interpreter fallbacks. Retail startup code is entered in bounded diagnostic sessions; no game frame is verified yet.',
      'Compila antecipadamente código de PPU e SPU para código nativo usando um ps3recomp fixado, com paradas estritas em vez de fallbacks para interpretador. O código de inicialização de jogos retail é executado em sessões de diagnóstico limitadas; nenhum frame de jogo foi verificado ainda.',
    ),
    tech: both('PPU/SPU AOT · ps3recomp · RSX → D3D12', 'AOT PPU/SPU · ps3recomp · RSX → D3D12'),
    status: { label: both('M0 bootstrap · no public release', 'M0 bootstrap · sem release pública'), tone: 'research' },
    intro: [
      both(
        'ps3-native is an open research project for native ahead-of-time recompilation of PlayStation 3 software, targeting original games and the authentic VSH/XMB. The goal is an authentic system → game → system lifecycle; the management launcher does not imitate the XMB.',
        'O ps3-native é um projeto aberto de pesquisa para recompilação nativa antecipada de software de PlayStation 3, com foco nos jogos originais e no VSH/XMB autêntico. O objetivo é um ciclo autêntico sistema → jogo → sistema; o launcher de gerenciamento não imita o XMB.',
      ),
      both(
        'Synthetic PPU/SPU and RSX tests pass, and the launcher can enter original retail PPU startup code in a bounded AOT diagnostic session. No game menu, gameplay or original VSH/XMB boot is verified.',
        'Os testes sintéticos de PPU/SPU e RSX passam, e o launcher consegue executar o código de inicialização PPU original de um jogo retail em uma sessão de diagnóstico AOT limitada. Nenhum menu de jogo, gameplay ou boot do VSH/XMB original foi verificado.',
      ),
    ],
    goals: [
      both('Finish original CRT/static initialization through strict stops, and audit every reached service with real regressions.', 'Concluir a inicialização CRT/estática original com paradas estritas e auditar cada serviço alcançado com regressões reais.'),
      both('Validate a real game frame before claiming menu or gameplay support.', 'Validar um frame real de jogo antes de afirmar suporte a menu ou gameplay.'),
      both('Boot the original VSH/XMB with its complete module graph, resources and LV2 services.', 'Inicializar o VSH/XMB original com seu grafo completo de módulos, recursos e serviços LV2.'),
      both('Original fidelity and Native enhancements sharing the same RSX contracts and coherent PPU/SPU/RSX state.', 'Fidelidade original e melhorias Native compartilhando os mesmos contratos de RSX e estado coerente de PPU/SPU/RSX.'),
      both('Dynamic SPU images prepared offline with content fingerprints — no JIT or interpreter fallback.', 'Imagens dinâmicas de SPU preparadas offline com fingerprints de conteúdo — sem fallback para JIT ou interpretador.'),
    ],
    pipeline: [
      {
        title: both('Inspect and import', 'Inspeção e importação'),
        body: both('Read-only inventory with SHA-256, PARAM.SFO metadata, PUP identity and ELF/SELF/PKG identification. Originals are referenced, never copied.', 'Inventário somente leitura com SHA-256, metadados do PARAM.SFO, identidade do PUP e identificação de ELF/SELF/PKG. Os originais são referenciados, nunca copiados.'),
      },
      {
        title: both('Prepare PPU and SPU code', 'Preparação de código PPU e SPU'),
        body: both('PPU ELF analysis (OPD/TOC/imports) and AOT code generation through ps3recomp; SPU programs are compiled offline and checked byte-for-byte on entry.', 'Análise do ELF PPU (OPD/TOC/imports) e geração de código AOT pelo ps3recomp; programas SPU são compilados offline e conferidos byte a byte na entrada.'),
      },
      {
        title: both('Hash-bound native run', 'Execução nativa vinculada a hashes'),
        body: both('Sessions verify original, ELF, generated code, runtime and configuration hashes. Unaudited HLE, LV2 calls or missing targets stop explicitly.', 'As sessões verificam hashes do original, do ELF, do código gerado, do runtime e da configuração. HLE não auditado, chamadas LV2 ou alvos ausentes param explicitamente.'),
      },
      {
        title: both('Original firmware modules', 'Módulos originais do firmware'),
        body: both('Authorized, already decrypted PRX libraries are compiled by AOT and own their exports, kept separate from HLE.', 'Bibliotecas PRX autorizadas e já descriptografadas são compiladas via AOT e respondem pelos próprios exports, separadas do HLE.'),
      },
    ],
    matrix: [
      {
        area: both('PPU / SPU AOT', 'AOT de PPU / SPU'),
        done: both('Project-owned synthetic programs compiled and executed; SPU DMA verified', 'Programas sintéticos do próprio projeto compilados e executados; DMA de SPU verificado'),
        next: both('Generic commercial game execution', 'Execução genérica de jogos comerciais'),
      },
      {
        area: both('RSX graphics', 'Gráficos RSX'),
        done: both('Upstream D3D12 pixel/depth regression validated on a local GPU', 'Regressão de pixel/profundidade em D3D12 do upstream validada em GPU local'),
        next: both('Playable titles or broad RSX coverage', 'Títulos jogáveis ou ampla cobertura de RSX'),
      },
      {
        area: both('Import / preparation', 'Importação / preparação'),
        done: both('Read-only inventory, PPU AOT, hash-bound diagnostic native startup', 'Inventário somente leitura, AOT de PPU, inicialização nativa de diagnóstico vinculada a hashes'),
        next: both('Complete generic module loading and playable title launch', 'Carregamento genérico completo de módulos e inicialização de títulos jogáveis'),
      },
      {
        area: both('Original firmware', 'Firmware original'),
        done: both('PUP identity inspection; original SPURS library bound by AOT in diagnostic sessions', 'Inspeção de identidade do PUP; biblioteca SPURS original vinculada via AOT em sessões de diagnóstico'),
        next: both('Original VSH/XMB boot, system navigation or game return', 'Boot do VSH/XMB original, navegação do sistema ou retorno do jogo'),
      },
    ],
    highlights: [
      {
        date: '2026-11-15',
        text: both('Diagnostic startup of a retail title reaches original CRT/static constructors, initializes GCM, opens a real D3D12 1280×720 output and executes an RSX FIFO fence and screen clear. Original game frames remain unverified.', 'A inicialização de diagnóstico de um título retail alcança os construtores CRT/estáticos originais, inicializa o GCM, abre uma saída D3D12 real de 1280×720 e executa um fence de FIFO do RSX e uma limpeza de tela. Frames originais do jogo continuam não verificados.'),
      },
      {
        date: '2026-11-15',
        text: both('The original firmware SPURS library is compiled by AOT; six native host workers enter original firmware SPU code.', 'A biblioteca SPURS original do firmware é compilada via AOT; seis workers nativos do host executam código SPU original do firmware.'),
      },
      {
        date: '2026-11-15',
        text: both('51 SPU program registrations compiled locally with input, tool and output hashes — preparation coverage, not gameplay certification.', '51 registros de programas SPU compilados localmente com hashes de entrada, ferramenta e saída — cobertura de preparação, não certificação de gameplay.'),
      },
      {
        date: '2026-11-14',
        text: both('ps3recomp pinned at de4f090 with a hash-locked generic patch that adds strict stops for missing PPU targets and unhandled LV2/SPU paths.', 'ps3recomp fixado em de4f090 com um patch genérico travado por hash que adiciona paradas estritas para alvos PPU ausentes e caminhos LV2/SPU não tratados.'),
      },
    ],
    platforms: [
      { name: 'Windows x64', state: 'evidence', note: both('Locally validated build and D3D12 GPU tests', 'Build validado localmente e testes de GPU em D3D12') },
      { name: 'Windows / Linux / macOS', state: 'ci', note: both('CI configured; GPU runtime test excluded on hosted runners', 'CI configurada; teste de runtime de GPU excluído nos runners hospedados') },
      { name: 'Linux Vulkan backend', state: 'planned', note: both('Upstream opt-in, not locally validated', 'Opcional no upstream, não validado localmente') },
      { name: 'macOS Metal backend', state: 'planned', note: both('Upstream, not locally validated', 'No upstream, não validado localmente') },
      { name: 'Windows / Linux ARM64', state: 'planned' },
    ],
    shots: [],
    videos: [],
    bannerAlt: both('Official ps3-native banner: concept art depicting CELL, SPUs, RSX and native PC execution; not a gameplay screenshot.', 'Banner oficial do ps3-native: arte conceitual com CELL, SPUs, RSX e execução nativa no PC; não é uma captura de gameplay.'),
    bannerIsConcept: true,
    docs: [
      { label: both('README and command contracts', 'README e contratos de comandos'), path: '#command-contracts' },
      { label: both('Current status', 'Status atual'), path: '#current-status' },
      { label: both('Third-party notices', 'Avisos de terceiros'), path: 'blob/main/THIRD_PARTY_NOTICES.md' },
      { label: both('Agent and architecture rules', 'Regras de agentes e arquitetura'), path: 'blob/main/AGENTS.md' },
    ],
    contributing: null,
    license: both(
      'Own code is BSD-3-Clause. ps3recomp is MIT with additional bundled licenses, including its default LGPL-2.1 ATRAC decoder.',
      'O código próprio é BSD-3-Clause. O ps3recomp é MIT, com licenças adicionais incluídas, entre elas o decodificador ATRAC padrão sob LGPL-2.1.',
    ),
    credits: both(
      'Built on ps3recomp by Ned Heller (sp00nznet). RPCS3 is a behavioral and technical reference and an offline decryption tool only — it is not the execution backend.',
      'Construído sobre o ps3recomp, de Ned Heller (sp00nznet). O RPCS3 é apenas uma referência técnica e de comportamento e uma ferramenta offline de descriptografia — não é o backend de execução.',
    ),
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

type MediaEntry = {
  banner: { width: number; height: number; source: string };
  shots: Record<string, { width: number; height: number; source: string }>;
};
export const mediaFor = (slug: Slug) => (media as Record<string, MediaEntry>)[slug];

export const repoUrl = (slug: Slug) => `https://github.com/fabegalo/${slug}`;
export const repoLink = (slug: Slug, path: string) =>
  path.startsWith('#') ? `${repoUrl(slug)}${path}` : `${repoUrl(slug)}/${path}`;
