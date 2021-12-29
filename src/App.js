import SearchHeader from './components/SearchHeader/SearchHeader.js';
import SearchResult from './components/SearchResult.js';
import ImageInfo from './components/ImageInfo.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import api from './service/api.js';

console.log('app is running!');

const PREVIOUS_RESULT_KEY = 'PREVIOUS_RESULT';

export default class App {
    $target = null;
    data = [];
    keyword = '';

    constructor($target) {
        this.init();
        this.$target = $target;

        this.searchHeader = new SearchHeader({
            $target,
            initialKeyword: this.keyword,
            onSearch: this.handleSearch.bind(this),
            onRandomSearch: this.handleRandomSearch.bind(this),
        });

        this.searchResult = new SearchResult({
            $target,
            initialData: this.data,
            onClick: (image) => {
                this.imageInfo.setState({
                    visible: true,
                    image,
                });
            },
            addItems: this.handleSearch.bind(this),
        });

        this.imageInfo = new ImageInfo({
            $target,
            data: {
                visible: false,
                image: null,
            },
        });

        this.loadingSpinner = new LoadingSpinner({ $target });
    }

    init() {
        const { keyword, data } = this.loadSessionstorage();
        this.keyword = keyword;
        this.data = data;
    }

    async handleSearch(keyword) {
        this.loadingSpinner.setState(true);
        try {
            const { data } = keyword
                ? await api.fetchCats(keyword)
                : await api.fetchCats(this.keyword);
            this.setState({
                data,
                keyword: keyword || this.keyword,
            });
        } catch (e) {
            if (e.message === '400') {
                window.alert('키워드를 입력해 주세요.');
                this.loadingSpinner.setState(false);
                return;
            } else if (e.message === '500') {
                this.handleSearch();
            }
        }
    }

    async handleRandomSearch() {
        this.loadingSpinner.setState(true);
        try {
            const { data } = await api.fetchRandomCats();
            this.setState({
                data,
                keyword: '랜덤 검색',
            });
        } catch (e) {
            if (e.message === '500') {
                this.handleRandomSearch();
            }
        }
    }

    saveToSessionstorage(keyword, data) {
        sessionStorage.setItem(
            PREVIOUS_RESULT_KEY,
            JSON.stringify({
                keyword,
                data,
            })
        );
    }

    loadSessionstorage() {
        return (
            JSON.parse(sessionStorage.getItem(PREVIOUS_RESULT_KEY)) || {
                keyword: '',
                data: [],
            }
        );
    }

    setState(nextState) {
        this.loadingSpinner.setState(false);
        if (nextState.keyword === this.keyword) {
            this.data = [...this.data, ...nextState.data];
        } else {
            this.searchResult.removeAll();
            this.data = [...nextState.data];
        }
        this.keyword = nextState.keyword;
        this.searchResult.setState(this.data);
        this.saveToSessionstorage(this.keyword, this.data);
    }
}
