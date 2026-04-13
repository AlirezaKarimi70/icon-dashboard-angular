export const SUPPORTED_VERSIONS = ['6.4.2', '5.15.4'] as const;
export type SupportedVersion = (typeof SUPPORTED_VERSIONS)[number];
export type VersionOptionId = SupportedVersion | 'all';

export interface IconTemplate {
  name: string;
  label: string;
  description: string;
  category: string;
  tags: string[];
  classesByVersion: Record<SupportedVersion, string>;
  sourceByVersion: Record<SupportedVersion, string>;
}

export interface IconVariant {
  version: SupportedVersion;
  name: string;
  label: string;
  description: string;
  category: string;
  tags: string[];
  classes: string;
  source: string;
}

export const ICON_TEMPLATES: IconTemplate[] = [
  {
    name: 'camera-retro',
    label: 'Capture',
    description: 'Use for media upload flows or camera actions.',
    category: 'Media',
    tags: ['photo', 'capture', 'media'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-camera-retro',
      '5.15.4': 'fas fa-camera-retro'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'bolt',
    label: 'Instant',
    description: 'Highlight performance, lightning tasks, or power states.',
    category: 'Status',
    tags: ['speed', 'energy', 'alert'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-bolt',
      '5.15.4': 'fas fa-bolt'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'cog',
    label: 'Settings',
    description: 'Link to preferences, controls, and configuration panels.',
    category: 'Control',
    tags: ['settings', 'gear', 'preferences'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-cog',
      '5.15.4': 'fas fa-cog'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'bell',
    label: 'Notify',
    description: 'Signal notifications, alerts, and reminders.',
    category: 'Status',
    tags: ['alert', 'notification', 'reminder'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-bell',
      '5.15.4': 'fas fa-bell'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'cloud-arrow-down',
    label: 'Download',
    description: 'Represent file downloads or cloud sync states.',
    category: 'Sync',
    tags: ['download', 'cloud', 'sync'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-cloud-arrow-down',
      '5.15.4': 'fas fa-cloud-download-alt'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'code',
    label: 'Code',
    description: 'Great for developer dashboards or API explorers.',
    category: 'Developer',
    tags: ['developer', 'snippets', 'api'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-code',
      '5.15.4': 'fas fa-code'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'users',
    label: 'Team',
    description: 'Designate people, teams, or collaboration hubs.',
    category: 'Teams',
    tags: ['collab', 'people', 'team'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-users',
      '5.15.4': 'fas fa-users'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'folder-open',
    label: 'Files',
    description: 'Map to documents, folders, or knowledge bases.',
    category: 'Content',
    tags: ['docs', 'files', 'library'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-folder-open',
      '5.15.4': 'fas fa-folder-open'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'magnifying-glass',
    label: 'Search',
    description: 'Ideal for search bars, quick find shortcuts, or insights.',
    category: 'Utility',
    tags: ['search', 'inspect', 'discover'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-magnifying-glass',
      '5.15.4': 'fas fa-search'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  },
  {
    name: 'heart',
    label: 'Favorite',
    description: 'Indicate favorites, likes, or saved signals.',
    category: 'Engagement',
    tags: ['love', 'favorite', 'engagement'],
    classesByVersion: {
      '6.4.2': 'fa-regular fa-heart',
      '5.15.4': 'far fa-heart'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Regular',
      '5.15.4': 'Font Awesome 5 Free · Regular'
    }
  },
  {
    name: 'github',
    label: 'GitHub',
    description: 'Link to repos, developer portals, or Open Source hubs.',
    category: 'Brands',
    tags: ['code', 'repo', 'opensource'],
    classesByVersion: {
      '6.4.2': 'fa-brands fa-github',
      '5.15.4': 'fab fa-github'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Brands',
      '5.15.4': 'Font Awesome 5 Free · Brands'
    }
  },
  {
    name: 'globe',
    label: 'Global',
    description: 'Represent worldwide reach, locales, or networks.',
    category: 'Network',
    tags: ['global', 'world', 'web'],
    classesByVersion: {
      '6.4.2': 'fa-solid fa-globe',
      '5.15.4': 'fas fa-globe'
    },
    sourceByVersion: {
      '6.4.2': 'Font Awesome 6 Free · Solid',
      '5.15.4': 'Font Awesome 5 Free · Solid'
    }
  }
];

export const ICON_VARIANTS: IconVariant[] = ICON_TEMPLATES.flatMap((template) => {
  const { classesByVersion, sourceByVersion, ...metadata } = template;
  return SUPPORTED_VERSIONS.map((version) => ({
    version,
    ...metadata,
    classes: classesByVersion[version],
    source: sourceByVersion[version]
  }));
});

export interface VersionOption {
  id: VersionOptionId;
  label: string;
}

export const VERSION_OPTIONS: VersionOption[] = [
  { id: 'all', label: 'All versions' },
  ...SUPPORTED_VERSIONS.map((version) => ({ id: version, label: version }))
];

export const DEFAULT_VERSION: VersionOptionId = '6.4.2';
export const DEFAULT_ICON = ICON_VARIANTS.find(v => v.version === DEFAULT_VERSION) || ICON_VARIANTS[0];
