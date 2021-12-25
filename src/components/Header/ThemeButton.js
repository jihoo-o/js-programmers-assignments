import { $ } from '../../utils/selector.js';

export default class ThemeButton {
    $target = null;
    $themeButtonWrapper = null;
    $themeButtonLabel = null;
    $themeButton = null;

    constructor({ $header: $target }) {
        this.$target = $target;

        this.$themeButtonWrapper = $('div');
        this.$themeButtonWrapper.classList.add('themeButtonWrapper');

        this.$themeButtonLabel = $('label');
        this.$themeButtonLabel.htmlFor = 'theme-button';
        this.$themeButtonLabel.innerText = '다크모드';

        this.$themeButton = $('input');
        this.$themeButton.type = 'checkbox';
        this.$themeButton.name = 'theme';
        this.$themeButton.id = 'theme-button';

        this.setOsTheme();
        this.watchOsTheme();

        this.$themeButtonWrapper.appendChild(this.$themeButtonLabel);
        this.$themeButtonWrapper.appendChild(this.$themeButton);
        this.$target.appendChild(this.$themeButtonWrapper); //
    }

    setOsTheme = () => {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            this.changeThemeDark(true);
        } else {
            this.changeThemeDark(false);
        }
    };

    watchOsTheme = () => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                this.changeThemeDark(e.matches);
            });

        this.$themeButton.addEventListener('click', () => {
            this.changeThemeDark(this.$themeButton.checked);
        });
    };

    changeThemeDark = (isDarkMode) => {
        if (isDarkMode) {
            this.$themeButton.checked = true;
            document.documentElement.setAttribute('color-theme', 'dark');
        } else {
            this.$themeButton.checked = false;
            document.documentElement.setAttribute('color-theme', 'light');
        }
    };
}
