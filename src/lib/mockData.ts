import { Series, Review, UserProfile } from './types';

export const INITIAL_SERIES: Series[] = [
  {
    id: 'severance-s1',
    title: 'Severance',
    slug: 'severance',
    synopsis: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.',
    posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2022,
    status: 'returning',
    ageRating: 'TV-MA',
    network: 'Apple TV+',
    streamingPlatforms: ['Apple TV+'],
    genres: ['Sci-Fi', 'Mystery', 'Psychological Thriller'],
    zScore: 9.7,
    imdbScore: 8.7,
    totalSeasons: 2,
    totalEpisodes: 19,
    featured: true,
    trailerYoutubeId: 'xEQP4VVuyrY',
    creator: 'Dan Erickson',
    cast: [
      { id: 'c1', name: 'Adam Scott', role: 'Actor', character: 'Mark Scout', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'c2', name: 'Patricia Arquette', role: 'Actor', character: 'Harmony Cobel', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { id: 'c3', name: 'John Turturro', role: 'Actor', character: 'Irving Bailiff', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'c4', name: 'Christopher Walken', role: 'Actor', character: 'Burt Goodman', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'sev-s1',
        seriesId: 'severance-s1',
        seasonNumber: 1,
        title: 'Season 1: Macrodata Refinement',
        synopsis: 'The innies of Lumon Industries begin to question the perimeter of their claustrophobic existence.',
        episodeCount: 9,
        releaseYear: 2022,
        posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        episodes: [
          {
            id: 'sev-s1-e1',
            seasonId: 'sev-s1',
            seriesId: 'severance-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Good News About Hell',
            overview: 'Mark Scout leads a team at Lumon Industries, whose employees have undergone a severance procedure that surgically divides their memories.',
            durationMinutes: 57,
            stillUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            airDate: '2022-02-18',
            youtubeTrailerId: 'xEQP4VVuyrY'
          },
          {
            id: 'sev-s1-e2',
            seasonId: 'sev-s1',
            seriesId: 'severance-s1',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Half Loop',
            overview: 'The Macrodata Refinement team trains Helly on macrodata refinement numbers. Mark meets with an unexpected contact outside work.',
            durationMinutes: 53,
            stillUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80',
            airDate: '2022-02-18'
          },
          {
            id: 'sev-s1-e3',
            seasonId: 'sev-s1',
            seriesId: 'severance-s1',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'In Perpetuity',
            overview: 'Mark takes the team on a field trip to the Perpetuity Wing, but Helly continues to rebel against Lumon rules.',
            durationMinutes: 54,
            stillUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            airDate: '2022-02-25'
          },
          {
            id: 'sev-s1-e4',
            seasonId: 'sev-s1',
            seriesId: 'severance-s1',
            episodeNumber: 4,
            seasonNumber: 1,
            title: 'The You You Are',
            overview: 'Helly completes her ninety-day orientation. Mark discovers an illicit contraband book left behind in the office corridor.',
            durationMinutes: 51,
            stillUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            airDate: '2022-03-04'
          },
          {
            id: 'sev-s1-e9',
            seasonId: 'sev-s1',
            seriesId: 'severance-s1',
            episodeNumber: 9,
            seasonNumber: 1,
            title: 'The We We Are',
            overview: 'The team executes the Overtime Contingency protocol. The innies wake up in their outies bodies to witness their actual lives.',
            durationMinutes: 40,
            stillUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            airDate: '2022-04-08'
          }
        ]
      },
      {
        id: 'sev-s2',
        seriesId: 'severance-s1',
        seasonNumber: 2,
        title: 'Season 2: The Reckoning',
        synopsis: 'Mark and his colleagues learn the dire consequences of tampering with the severance barrier, leading them further down a labyrinth of deception.',
        episodeCount: 10,
        releaseYear: 2025,
        posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        episodes: [
          {
            id: 'sev-s2-e1',
            seasonId: 'sev-s2',
            seriesId: 'severance-s1',
            episodeNumber: 1,
            seasonNumber: 2,
            title: 'Hello, Ms. Cobel',
            overview: 'In the wake of the gala revelation, Lumon initiates emergency security containment protocols.',
            durationMinutes: 58,
            stillUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
            airDate: '2025-01-17'
          }
        ]
      }
    ]
  },
  {
    id: 'arcane-s1',
    title: 'Arcane',
    slug: 'arcane',
    synopsis: 'Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2021,
    endYear: 2024,
    status: 'completed',
    ageRating: 'TV-14',
    network: 'Netflix',
    streamingPlatforms: ['Netflix'],
    genres: ['Animation', 'Sci-Fi', 'Action', 'Steampunk', 'Cyberpunk'],
    zScore: 9.9,
    imdbScore: 9.0,
    totalSeasons: 2,
    totalEpisodes: 18,
    featured: true,
    trailerYoutubeId: 'fXmAurh012s',
    creator: 'Christian Linke & Alex Yee',
    cast: [
      { id: 'ac1', name: 'Hailee Steinfeld', role: 'Voice', character: 'Vi', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 'ac2', name: 'Ella Purnell', role: 'Voice', character: 'Jinx', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
      { id: 'ac3', name: 'Kevin Alejandro', role: 'Voice', character: 'Jayce Talis', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'arc-s1',
        seriesId: 'arcane-s1',
        seasonNumber: 1,
        title: 'Act I & II',
        synopsis: 'Orphan sisters Vi and Powder navigate Zauns criminal underworld while hextech magic erupts in Piltover.',
        episodeCount: 9,
        releaseYear: 2021,
        episodes: [
          {
            id: 'arc-s1-e1',
            seasonId: 'arc-s1',
            seriesId: 'arcane-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Welcome to the Playground',
            overview: 'Orphan sisters Vi and Powder rob a high-end workshop in Piltover, unknowingly stealing volatile arcane crystals.',
            durationMinutes: 43,
            stillUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            airDate: '2021-11-06'
          },
          {
            id: 'arc-s1-e3',
            seasonId: 'arc-s1',
            seriesId: 'arcane-s1',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'The Base Violence Necessary for Change',
            overview: 'Vander faces Silco in an explosive confrontation that forever alters the bond between sisters.',
            durationMinutes: 44,
            stillUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
            airDate: '2021-11-06'
          }
        ]
      }
    ]
  },
  {
    id: 'tlou-s1',
    title: 'The Last of Us',
    slug: 'the-last-of-us',
    synopsis: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity’s last hope.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2023,
    status: 'returning',
    ageRating: 'TV-MA',
    network: 'HBO Max',
    streamingPlatforms: ['Max', 'HBO'],
    genres: ['Post-Apocalyptic', 'Drama', 'Survival', 'Horror'],
    zScore: 9.6,
    imdbScore: 8.8,
    totalSeasons: 2,
    totalEpisodes: 16,
    featured: true,
    trailerYoutubeId: 'uLtkt8BonwM',
    creator: 'Craig Mazin & Neil Druckmann',
    cast: [
      { id: 'tl1', name: 'Pedro Pascal', role: 'Actor', character: 'Joel Miller', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'tl2', name: 'Bella Ramsey', role: 'Actor', character: 'Ellie Williams', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'tlou-s1-seas',
        seriesId: 'tlou-s1',
        seasonNumber: 1,
        title: 'Season 1',
        synopsis: 'Joel and Ellie traverse across what remains of the infected United States.',
        episodeCount: 9,
        releaseYear: 2023,
        episodes: [
          {
            id: 'tl-e1',
            seasonId: 'tlou-s1-seas',
            seriesId: 'tlou-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'When You\'re Lost in the Darkness',
            overview: 'Twenty years after a fungal outbreak ravages the planet, survivors Joel and Tess are tasked with a mission that could change everything.',
            durationMinutes: 81,
            stillUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
            airDate: '2023-01-15'
          },
          {
            id: 'tl-e3',
            seasonId: 'tlou-s1-seas',
            seriesId: 'tlou-s1',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'Long, Long Time',
            overview: 'When a stranger approaches his compound, survivalist Bill forges an unlikely and deeply moving connection.',
            durationMinutes: 75,
            stillUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
            airDate: '2023-01-29'
          }
        ]
      }
    ]
  },
  {
    id: 'cyberpunk-edgerunners',
    title: 'Cyberpunk: Edgerunners',
    slug: 'cyberpunk-edgerunners',
    synopsis: 'In a dystopian city riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become an edgerunner: a mercenary outlaw.',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2022,
    status: 'completed',
    ageRating: 'TV-MA',
    network: 'Netflix',
    streamingPlatforms: ['Netflix'],
    genres: ['Cyberpunk', 'Anime', 'Sci-Fi', 'Action'],
    zScore: 9.8,
    imdbScore: 8.3,
    totalSeasons: 1,
    totalEpisodes: 10,
    featured: false,
    trailerYoutubeId: 'JtqIas3bYhg',
    creator: 'Rafal Jaki & Studio Trigger',
    cast: [
      { id: 'cb1', name: 'KENN', role: 'Voice', character: 'David Martinez', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
      { id: 'cb2', name: 'Aoi Yuki', role: 'Voice', character: 'Lucy', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'cb-s1',
        seriesId: 'cyberpunk-edgerunners',
        seasonNumber: 1,
        title: 'Complete Series',
        synopsis: 'David undergoes high-grade cyberware upgrades to survive in Night City.',
        episodeCount: 10,
        releaseYear: 2022,
        episodes: [
          {
            id: 'cb-e1',
            seasonId: 'cb-s1',
            seriesId: 'cyberpunk-edgerunners',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Let You Down',
            overview: 'David Martinez endures the harsh hierarchy of Arasaka Academy before an unexpected tragedy changes his path.',
            durationMinutes: 24,
            stillUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            airDate: '2022-09-13'
          }
        ]
      }
    ]
  },
  {
    id: 'shogun-s1',
    title: 'Shōgun',
    slug: 'shogun',
    synopsis: 'When a mysterious European ship is found marooned in a nearby fishing village, Lord Yoshii Toranaga discovers secrets that could tip the scales of power and devastate his formidable enemies in feudal Japan.',
    posterUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2024,
    status: 'returning',
    ageRating: 'TV-MA',
    network: 'FX',
    streamingPlatforms: ['Hulu', 'Disney+'],
    genres: ['Historical Drama', 'War', 'Action', 'Political'],
    zScore: 9.7,
    imdbScore: 8.7,
    totalSeasons: 1,
    totalEpisodes: 10,
    featured: false,
    trailerYoutubeId: 'yAN5uspNet8',
    creator: 'Rachel Kondo & Justin Marks',
    cast: [
      { id: 'sh1', name: 'Hiroyuki Sanada', role: 'Actor', character: 'Lord Yoshii Toranaga', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 'sh2', name: 'Cosmo Jarvis', role: 'Actor', character: 'John Blackthorne', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 'sh3', name: 'Anna Sawai', role: 'Actor', character: 'Toda Mariko', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'sh-s1',
        seriesId: 'shogun-s1',
        seasonNumber: 1,
        title: 'Season 1',
        synopsis: 'Toranaga maneuvers through intricate samurai politics and shifting loyalties.',
        episodeCount: 10,
        releaseYear: 2024,
        episodes: [
          {
            id: 'sh-e1',
            seasonId: 'sh-s1',
            seriesId: 'shogun-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Anjin',
            overview: 'English navigator John Blackthorne is shipwrecked off the coast of Japan, thrusting him into an alien culture on the verge of civil war.',
            durationMinutes: 70,
            stillUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
            airDate: '2024-02-27'
          }
        ]
      }
    ]
  },
  {
    id: 'succession-s1',
    title: 'Succession',
    slug: 'succession',
    synopsis: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world will change when their aging father steps down from the company.',
    posterUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2018,
    endYear: 2023,
    status: 'completed',
    ageRating: 'TV-MA',
    network: 'HBO Max',
    streamingPlatforms: ['Max', 'HBO'],
    genres: ['Drama', 'Satire', 'Corporate Thriller'],
    zScore: 9.8,
    imdbScore: 8.9,
    totalSeasons: 4,
    totalEpisodes: 39,
    featured: false,
    trailerYoutubeId: 'OzYxJV_rmE8',
    creator: 'Jesse Armstrong',
    cast: [
      { id: 'sc1', name: 'Brian Cox', role: 'Actor', character: 'Logan Roy', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
      { id: 'sc2', name: 'Jeremy Strong', role: 'Actor', character: 'Kendall Roy', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'suc-s1',
        seriesId: 'succession-s1',
        seasonNumber: 1,
        title: 'Season 1',
        synopsis: 'The battle for the helm of Waystar RoyCo ignites.',
        episodeCount: 10,
        releaseYear: 2018,
        episodes: [
          {
            id: 'suc-e1',
            seasonId: 'suc-s1',
            seriesId: 'succession-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Celebration',
            overview: 'On his 80th birthday, media titan Logan Roy stuns his family by reneging on plans to announce his retirement.',
            durationMinutes: 65,
            stillUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            airDate: '2018-06-03'
          }
        ]
      }
    ]
  },
  {
    id: 'dark-s1',
    title: 'Dark',
    slug: 'dark',
    synopsis: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the double lives and fractured relationships among four families.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2017,
    endYear: 2020,
    status: 'completed',
    ageRating: 'TV-MA',
    network: 'Netflix',
    streamingPlatforms: ['Netflix'],
    genres: ['Sci-Fi', 'Mystery', 'Time Travel', 'Thriller'],
    zScore: 9.6,
    imdbScore: 8.7,
    totalSeasons: 3,
    totalEpisodes: 26,
    featured: false,
    trailerYoutubeId: 'rrwycJ08PSA',
    creator: 'Baran bo Odar & Jantje Friese',
    cast: [
      { id: 'dk1', name: 'Louis Hofmann', role: 'Actor', character: 'Jonas Kahnwald', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'dk-s1',
        seriesId: 'dark-s1',
        seasonNumber: 1,
        title: 'Cycle 1: Secrets',
        synopsis: 'Winden, 2019. A child disappears in the cave beneath the nuclear plant.',
        episodeCount: 10,
        releaseYear: 2017,
        episodes: [
          {
            id: 'dk-e1',
            seasonId: 'dk-s1',
            seriesId: 'dark-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Secrets',
            overview: 'In 2019, a local boy\'s disappearance stokes fear in the residents of Winden, a small German town with a tragic history.',
            durationMinutes: 52,
            stillUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
            airDate: '2017-12-01'
          }
        ]
      }
    ]
  },
  {
    id: 'fallout-s1',
    title: 'Fallout',
    slug: 'fallout',
    synopsis: 'In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation, mutants, and bandits.',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2024,
    status: 'returning',
    ageRating: 'TV-MA',
    network: 'Prime Video',
    streamingPlatforms: ['Amazon Prime Video'],
    genres: ['Sci-Fi', 'Post-Apocalyptic', 'Dark Comedy', 'Action'],
    zScore: 9.5,
    imdbScore: 8.4,
    totalSeasons: 1,
    totalEpisodes: 8,
    featured: false,
    trailerYoutubeId: 'V-mugKDQDlg',
    creator: 'Jonathan Nolan & Lisa Joy',
    cast: [
      { id: 'fo1', name: 'Ella Purnell', role: 'Actor', character: 'Lucy MacLean', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
      { id: 'fo2', name: 'Walton Goggins', role: 'Actor', character: 'The Ghoul', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' }
    ],
    seasons: [
      {
        id: 'fo-s1',
        seriesId: 'fallout-s1',
        seasonNumber: 1,
        title: 'Season 1',
        synopsis: 'Lucy leaves Vault 33 behind to explore the brutal wastes of the Surface.',
        episodeCount: 8,
        releaseYear: 2024,
        episodes: [
          {
            id: 'fo-e1',
            seasonId: 'fo-s1',
            seriesId: 'fallout-s1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'The End',
            overview: 'A devastating event shatters the tranquil life in Vault 33, forcing Lucy to venture into the untamed wasteland.',
            durationMinutes: 74,
            stillUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
            airDate: '2024-04-10'
          }
        ]
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    seriesId: 'severance-s1',
    userId: 'u1',
    userName: 'Kaelen Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    userRole: 'Lead Critic',
    rating: 10.0,
    headline: 'The greatest season finale in modern television history.',
    content: 'Season 1 of Severance is a masterclass in tension, pacing, and visual minimalism. The claustrophobic brilliance of the Lumon white corridors contrasted with the cold winter outside creates an atmosphere that haunts you for days.',
    hasSpoilers: false,
    likesCount: 142,
    createdAt: '2024-09-14'
  },
  {
    id: 'rev-2',
    seriesId: 'arcane-s1',
    userId: 'u2',
    userName: 'Mira Solis',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    userRole: 'VIP Member',
    rating: 9.9,
    headline: 'Unparalleled artistic achievement in visual storytelling.',
    content: 'Fortiche studio delivered visuals that redefined what western animation can achieve. Every frame looks like a bespoke oil painting. Sound design, tragic character arcs, and raw visceral emotional beats are unmatched.',
    hasSpoilers: false,
    likesCount: 89,
    createdAt: '2024-10-02'
  },
  {
    id: 'rev-3',
    seriesId: 'the-last-of-us',
    userId: 'u3',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    userRole: 'Verified Fan',
    rating: 9.5,
    headline: 'Episode 3 alone will stand the test of time.',
    content: 'Pedro Pascal and Bella Ramsey embody Joel and Ellie with terrifying vulnerability. A video game adaptation that transcends its medium and stands toe-to-toe with prestige TV giants.',
    hasSpoilers: false,
    likesCount: 67,
    createdAt: '2024-08-20'
  }
];

export const DEMO_USER: UserProfile = {
  id: 'usr-demo-001',
  username: 'zzaa_fan',
  fullName: 'Alex Z-Series',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  bio: 'Cinema buff, sci-fi explorer, binge tracking everything since 2018.',
  role: 'critic'
};
