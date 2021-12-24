console.log('app is running!');

class App {
    $target = null;
    data = [];

    constructor($target) {
        this.$target = $target;

        this.searchInput = new SearchInput({
            $target,
            onSearch: async (keyword) => {
                this.loadingSpinner.setState(true);

                api.fetchCats(keyword).then(({ data }) => this.setState(data));
            },
            onRandomSearch: () => {
                this.loadingSpinner.setState(true);

                api.fetchRandomCats().then(({ data }) => this.setState(data));
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
