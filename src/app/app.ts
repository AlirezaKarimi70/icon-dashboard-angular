import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DEFAULT_ICON,
  DEFAULT_VERSION,
  ICON_VARIANTS,
  IconVariant,
  VERSION_OPTIONS,
  VersionOptionId
} from './icon-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section class="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6">
        <header class="space-y-3 text-center md:text-left">
                  <p class="text-lg font-semibold uppercase tracking-[0.35em] text-slate-500">Kia<span class="text-red-950">System</span></p>
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Font Awesome Studio</p>
    
          <h1 class="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Pick a version, search icons, and copy ready-to-use markup
          </h1>
          <p class="text-base text-slate-300 md:text-lg">
            Tailwind-driven dashboard for selecting Font Awesome versions, previewing icon metadata, and copying both
            markup and backend snippets into your client responses.
          </p>
        </header>

        <section
          class="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap gap-2">
              <button
                *ngFor="let version of versionOptions"
                type="button"
                (click)="selectVersion(version.id)"
                class="rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                [ngClass]="{
                  'border-emerald-400 bg-emerald-500/10 text-emerald-200 shadow-[0_0_0_2px_rgba(16,185,129,0.35)]':
                    currentVersion() === version.id,
                  'border-white/20 text-slate-200 hover:border-white/50': currentVersion() !== version.id
                }"
              >
                {{ version.label }}
              </button>
            </div>

            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.5em] text-slate-400">
              <span>Local Assets</span>
              <strong class="text-white">{{ activeVersionLabel() }}</strong>
            </div>
          </div>

          <div class="mt-5">
            <label class="sr-only" for="icon-search">Search icons</label>
            <input
              id="icon-search"
              type="search"
              placeholder="Search by name, tag, or keyword"
              class="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              [(ngModel)]="searchTerm"
            />
          </div>
        </section>

        <div class="grid gap-6 lg:grid-cols-[1.4fr,0.8fr]">
          <section class="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Icon library</p>
                <h2 class="text-2xl font-semibold text-white">{{ filteredIcons().length }} icons</h2>
              </div>
              <span
                *ngIf="copyFeedback()"
                class="rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-semibold text-emerald-300"
              >
                {{ copyFeedback() }}
              </span>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                *ngFor="let icon of filteredIcons()"
                type="button"
                (click)="selectIcon(icon)"
                class="flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition"
                [ngClass]="{
                  'border-emerald-400/70 bg-emerald-500/5 shadow-[0_0_0_2px_rgba(16,185,129,0.4)]': isSelected(icon),
                  'border-white/5 hover:border-white/30 bg-slate-950/40': !isSelected(icon)
                }"
              >
                <i [class]="icon.classes + ' text-4xl text-emerald-200'" aria-hidden="true"></i>
                <p class="text-sm font-semibold text-slate-100">{{ icon.label }}</p>
                <p class="text-xs text-slate-400">{{ icon.description }}</p>
                <div class="mt-3 flex flex-wrap items-center justify-center gap-2 text-[0.65rem] text-slate-400">
                  <span class="rounded-full border border-white/10 px-2 py-0.5 uppercase tracking-[0.3em]">
                    {{ icon.category }}
                  </span>
                  <span class="rounded-full border border-white/10 px-2 py-0.5 uppercase tracking-[0.3em]">
                    v{{ icon.version }}
                  </span>
                  <button
                    type="button"
                    class="text-xs font-semibold text-emerald-300"
                    (click)="copyMarkup(icon); $event.stopPropagation()"
                  >
                    Copy markup
                  </button>
                  <button
                    type="button"
                    class="text-xs font-semibold text-emerald-300"
                    (click)="copyClassName(icon); $event.stopPropagation()"
                  >
                    Copy class
                  </button>
                </div>

                <p class="mt-2 text-[0.55rem] text-slate-500">{{ icon.source }}</p>
                <div class="mt-3 flex flex-wrap justify-center gap-1 text-[0.6rem] text-slate-400">
                  <span
                    *ngFor="let tag of icon.tags"
                    class="rounded-md border border-white/10 px-2 py-0.5 uppercase tracking-[0.25em]"
                  >
                    {{ tag }}
                  </span>
                </div>
              </button>
            </div>

            <p *ngIf="filteredIcons().length === 0" class="mt-6 text-sm text-slate-500">
              No icons found for this search query.
            </p>
          </section>

          <section
            class="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/70 p-6 shadow-2xl shadow-slate-950/40 space-y-5"
          >
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Selected</p>
                <h2 class="text-2xl font-semibold text-white">{{ selectedIcon().label }}</h2>
              </div>
              <i [class]="selectedIcon().classes + ' text-5xl text-emerald-300'" aria-hidden="true"></i>
            </div>
            <p class="text-sm text-slate-300">{{ selectedIcon().description }}</p>
            <div class="flex flex-wrap gap-3 text-[0.65rem] text-slate-400">
              <span class="rounded-full border border-white/20 px-3 py-1 uppercase tracking-[0.3em]">
                Source: {{ selectedIcon().source }}
              </span>
              <span class="rounded-full border border-white/20 px-3 py-1 uppercase tracking-[0.3em]">
                Category: {{ selectedIcon().category }}
              </span>
              <span class="rounded-full border border-white/20 px-3 py-1 uppercase tracking-[0.3em]">
                Version: v{{ selectedIcon().version }}
              </span>
            </div>
            <div class="flex flex-wrap gap-2 text-[0.6rem] text-slate-400">
              <span
                *ngFor="let tag of selectedIcon().tags"
                class="rounded-md border border-white/10 px-2 py-0.5 uppercase tracking-[0.25em]"
              >
                {{ tag }}
              </span>
            </div>
          </div>

            <div class="rounded-2xl border border-white/5 bg-slate-900/60 p-4 text-sm font-semibold text-slate-100">
              <p class="text-[0.65rem] font-normal text-slate-500">Markup for responses</p>
              <div class="mt-1 flex items-center justify-between">
                <code class="truncate text-xs text-slate-100">{{ markupPreview() }}</code>
                <div class="flex gap-2">
                  <button type="button" class="text-xs font-semibold text-emerald-300" (click)="copySelectedMarkup()">
                    Copy markup
                  </button>
                  <button type="button" class="text-xs font-semibold text-emerald-300" (click)="copySelectedClassName()">
                    Copy class
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">Backend payload</p>
              <pre class="max-h-56 overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-[0.7rem] text-slate-200"><code>{{ backendSnippet() }}</code></pre>
              <button
                type="button"
                class="w-full rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/35"
                (click)="copyBackendSnippet()"
              >
                Copy snippet
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  `
})
export class App {
  private document = inject(DOCUMENT);

  readonly iconVariants = ICON_VARIANTS;
  readonly versionOptions = VERSION_OPTIONS;

  readonly searchTerm = signal('');
  readonly currentVersion = signal<VersionOptionId>(DEFAULT_VERSION);
  readonly selectedIcon = signal(DEFAULT_ICON);
  readonly copyFeedback = signal('');

  private feedbackTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const version = this.currentVersion();
      const head = this.document.getElementsByTagName('head')[0];
      const linkId = 'fa-v5-legacy';
      let link = this.document.getElementById(linkId) as HTMLLinkElement;

      if (version === 'all' || version === '5.15.4') {
        if (!link) {
          link = this.document.createElement('link');
          link.id = linkId;
          link.rel = 'stylesheet';
          link.href = 'assets/fontawesome/v5.15.4/css/all.min.css';
          head.appendChild(link);
        }
      } else {
        if (link) {
          head.removeChild(link);
        }
      }
    });
  }

  readonly activeVersionLabel = computed(() =>
    this.versionOptions.find((option) => option.id === this.currentVersion())?.label ?? this.currentVersion()
  );

  readonly filteredIcons = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();

    const bucket =
      this.currentVersion() === 'all'
        ? this.iconVariants
        : this.iconVariants.filter((variant) => variant.version === this.currentVersion());

    if (!query) {
      return bucket;
    }

    return bucket.filter((variant) => {
      const lowerLabel = variant.label.toLowerCase();
      return (
        lowerLabel.includes(query) ||
        variant.name.toLowerCase().includes(query) ||
        variant.tags.some((tag) => tag.includes(query))
      );
    });
  });

  readonly markupPreview = computed(() => `<i class="${this.selectedIcon().classes}"></i>`);

  readonly backendSnippet = computed(() =>
    JSON.stringify(
      {
        version: this.selectedIcon().version,
        icon: this.selectedIcon().classes,
        label: this.selectedIcon().label,
        usage: `<i class="${this.selectedIcon().classes}"></i>`
      },
      null,
      2
    )
  );

  selectIcon(icon: IconVariant) {
    this.selectedIcon.set(icon);
  }

  selectVersion(version: VersionOptionId) {
    this.currentVersion.set(version);
    const matches = this.filteredIcons();
    if (matches.length) {
      this.selectedIcon.set(matches[0]);
    }
  }

  async copyMarkup(icon: IconVariant) {
    await this.copyToClipboard(this.markupFor(icon), `Copied ${icon.label} markup`);
  }

  async copyClassName(icon: IconVariant) {
    await this.copyToClipboard(icon.classes, `Copied ${icon.label} class`);
  }

  async copySelectedMarkup() {
    await this.copyToClipboard(this.markupPreview(), `Copied ${this.selectedIcon().label} markup`);
  }

  async copySelectedClassName() {
    await this.copyToClipboard(this.selectedIcon().classes, `Copied ${this.selectedIcon().label} class`);
  }

  async copyBackendSnippet() {
    await this.copyToClipboard(this.backendSnippet(), 'Copied backend response');
  }

  isSelected(icon: IconVariant) {
    return this.selectedIcon() === icon;
  }

  private markupFor(icon: IconVariant) {
    return `<i class="${icon.classes}"></i>`;
  }

  private async copyToClipboard(value: string, message: string) {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      this.copyFeedback.set('Clipboard not available; copy manually.');
      this.scheduleFeedbackClear();
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      this.copyFeedback.set(message);
    } catch {
      this.copyFeedback.set('Copy blocked; paste manually.');
    }

    this.scheduleFeedbackClear();
  }

  private scheduleFeedbackClear() {
    if (this.feedbackTimer) {
      clearTimeout(this.feedbackTimer);
    }
    this.feedbackTimer = setTimeout(() => this.copyFeedback.set(''), 2300);
  }
}
