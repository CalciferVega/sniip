import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

class DarkModeStore {
    #theme = $state<Theme>('system');
    #resolvedIsDark = $state(false);

    constructor() {
        if (browser) {
            const stored = localStorage.getItem('theme') as Theme | null;
            if (stored) {
                this.#theme = stored;
            }

            // Media query for system preference
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Effect-like logic to keep resolvedIsDark and DOM in sync
            const update = () => {
                const isDark = this.#theme === 'dark' || (this.#theme === 'system' && mediaQuery.matches);
                this.#resolvedIsDark = isDark;
                
                if (isDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            };

            // Listen for system changes
            mediaQuery.addEventListener('change', update);
            
            // Initial update
            update();
            
            // Setup a proxy for the 'update' to run whenever theme changes
            // We can't use $effect in a raw TS file easily without a component context
            // so we'll just call update() manually in the setter.
            this.update = update;
        }
    }

    private update() {}

    get theme() { return this.#theme; }
    get isDark() { return this.#resolvedIsDark; }

    setTheme(newTheme: Theme) {
        this.#theme = newTheme;
        if (browser) {
            localStorage.setItem('theme', newTheme);
            this.update();
        }
    }

    toggle() {
        const next: Theme = this.#resolvedIsDark ? 'light' : 'dark';
        this.setTheme(next);
    }
}

export const darkMode = new DarkModeStore();
