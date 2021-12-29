const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export default class SearchResult {
    $searchResult = null;
    infiniteScrollObserver = null;
    lazyLoadObserver = null;
    data = null;
    init = true;
    onClick = null;
    addItems = null;
    constructor({ $target, initialData, onClick, addItems }) {
        this.$searchResult = document.createElement('section');
        this.$searchResult.classList.add('SearchResult');
        $target.appendChild(this.$searchResult);

        this.data = initialData;
        this.infiniteScrollObserver = new IntersectionObserver(
            this.handleInfiniteScroll.bind(this),
            observerOptions
        );
        this.lazyLoadObserver = new IntersectionObserver(
            this.handleLazyLoad.bind(this),
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

    handleInfiniteScroll(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.unobserve(this.infiniteScrollObserver, entry.target);
                this.addItems();
            }
        });
    }

    handleLazyLoad(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                this.unobserve(this.lazyLoadObserver, image);
            }
        });
    }

    observe(observer, newTarget) {
        this.$observingItem = newTarget;
        observer.observe(newTarget);
    }

    unobserve(observer, target) {
        observer.unobserve(target);
    }

    render() {
        if (this.data && this.data.length !== 0) {
            this.data.forEach((data, index) => {
                const { url, name } = data;
                const newItem = document.createElement('div');
                newItem.classList.add('item');
                const img = document.createElement('img');
                img.setAttribute('data-src', url);
                img.setAttribute('alt', name);
                newItem.appendChild(img);
                this.$searchResult.appendChild(newItem);
                if (index === Math.floor(this.data.length / 2)) {
                    this.observe(this.infiniteScrollObserver, newItem);
                }

                newItem.addEventListener('click', () => {
                    this.onClick(this.data[index]);
                });

                this.observe(this.lazyLoadObserver, img);
            });
        } else if (!this.init) {
            this.$searchResult.innerHTML = '검색된 데이터가 없습니다.';
        }
    }
}
