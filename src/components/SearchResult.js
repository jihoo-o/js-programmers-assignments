const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export default class SearchResult {
    $searchResult = null;
    $observingItem = null;
    observer = null;
    data = null;
    init = true;
    onClick = null;
    addItems = null;
    constructor({ $target, initialData, onClick, addItems }) {
        this.$searchResult = document.createElement('section');
        this.$searchResult.classList.add('SearchResult');
        $target.appendChild(this.$searchResult);

        this.data = initialData;
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            observerOptions
        );
        this.onClick = onClick;
        this.addItems = addItems;

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.init = false;
        this.render();
    }

    handleObserver(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.addItems();
            }
        });
    }

    observe(newTarget) {
        this.$observingItem = newTarget;
        this.observer.observe(newTarget);
    }

    unobserve() {
        this.observer.unobserve(this.$observingItem);
    }

    render() {
        if (this.data && this.data.length !== 0) {
            this.data.forEach((data, index) => {
                const { url, name } = data;
                const newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `<img src=${url} alt=${name} />`;
                this.$searchResult.appendChild(newItem);
                if (index === Math.floor(this.data.length / 2)) {
                    if (this.$observingItem) {
                        this.unobserve();
                    }
                    this.observe(newItem);
                }

                newItem.addEventListener('click', () => {
                    this.onClick(this.data[index]);
                });
            });
        } else if (!this.init) {
            this.$searchResult.innerHTML = '검색된 데이터가 없습니다.';
        }
    }
}
