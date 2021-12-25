import { $ } from '../../utils/selector.js';
import RandomButton from './RandomButton.js';
import SearchHistory from './SearchHistory.js';
import SearchInput from './SearchInput.js';
import ThemeButton from './ThemeButton.js';

export default class Header {
    $target = null;
    $header = null;
    $inputWrapper = null;
    keyword = null;

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
            onSearch: (keyword) => {
                onSearch(keyword);
                this.setState(keyword);
            },
        });

        this.randomButton = new RandomButton({
            $inputWrapper: this.$inputWrapper,
            onRandomSearch,
        });

        this.$header.appendChild(this.$inputWrapper);

        this.searchHistory = new SearchHistory({
            $header: this.$header,
        });

        this.$target.appendChild(this.$header);
    }

    // keyword 변경을 SearchInput -> SearchHistory에 알려줌
    setState(searchedKeyword) {
        this.keyword = searchedKeyword;
        this.searchHistory.add(this.keyword);
    }
}
