import { $ } from '../../utils/selector.js';

const SEARCH_HISTORY_KEY = 'SEARCH_HISTORY';

export default class SearchHistory {
    $target = null;
    $searchHistory = null;
    searchHistory = {};

    constructor({ $header: $target }) {
        this.$target = $target;
        this.$searchHistory = $('ul');
        this.$searchHistory.classList.add('SearchHistory');
        this.$target.appendChild(this.$searchHistory);

        this.setState(this.loadLocalstorage());
    }

    setState(updatedSearchHistory) {
        this.searchHistory = updatedSearchHistory;
        this.saveToLocalstorage();
        this.render();
    }

    addKeyword(searchedKeyword) {
        const key = Date.now();
        const keys = Object.keys(this.searchHistory);
        if (keys.length >= 5) {
            this.deleteKeyword(keys.pop());
        }
        const updatedSearchHistory = {
            [key]: searchedKeyword,
            ...this.searchHistory,
        };
        this.setState(updatedSearchHistory);
    }

    deleteKeyword(deleteId) {
        const updatedSearchHistory = { ...this.searchHistory };
        delete updatedSearchHistory[deleteId];
        this.setState(updatedSearchHistory);
    }

    saveToLocalstorage() {
        localStorage.setItem(
            SEARCH_HISTORY_KEY,
            JSON.stringify(this.searchHistory)
        );
    }

    loadLocalstorage() {
        return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || {};
    }

    render() {
        this.$searchHistory.innerHTML = Object.keys(this.searchHistory)
            .map(
                (key) =>
                    `<li class='searchKeyword'>${this.searchHistory[key]}</li>`
            )
            .join('');
    }
}
