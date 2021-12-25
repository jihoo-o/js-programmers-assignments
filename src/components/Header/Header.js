import { $ } from '../../utils/selector.js';
import RandomButton from './RandomButton.js';
import SearchInput from './SearchInput.js';
import ThemeButton from './ThemeButton.js';

export default class Header {
    $target = null;
    $header = null;
    $inputWrapper = null;

    constructor({ $target, onSearch, onRandomSearch }) {
        this.$target = $target;
        this.$header = $('header');
        this.$inputWrapper = $('div');
        this.$inputWrapper.classList.add('InputWrapper');

        this.themeButton = new ThemeButton({
            $header: this.$header,
        });

        this.searchInput = new SearchInput({
            $inputWrapper: this.$inputWrapper,
            onSearch,
        });

        this.randomButton = new RandomButton({
            $inputWrapper: this.$inputWrapper,
            onRandomSearch,
        });

        this.$target.appendChild(this.$header);
        this.$header.appendChild(this.$inputWrapper);
    }
}
