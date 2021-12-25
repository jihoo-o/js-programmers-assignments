import Header from './components/Header/Header.js';
import SearchResult from './components/SearchResult.js';
import ImageInfo from './components/ImageInfo.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import api from './service/api.js';

console.log('app is running!');

export default class App {
    $target = null;
    data = [];

    constructor($target) {
        this.$target = $target;

        this.header = new Header({
            $target,
            onSearch: (keyword) => {
                this.loadingSpinner.setState(true);

                api.fetchCats(keyword) //
                    .then(({ data }) => this.setState(data));
            },
            onRandomSearch: () => {
                this.loadingSpinner.setState(true);

                api.fetchRandomCats() //
                    .then(({ data }) => this.setState(data));
            },
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

    setState(nextData) {
        this.loadingSpinner.setState(false);
        this.data = nextData;
        this.searchResult.setState(nextData);
    }
}
