export default class SearchResult {
    $searchResult = null;
    data = null;
    init = true;
    onClick = null;

    constructor({ $target, initialData, onClick }) {
        this.$searchResult = document.createElement('section');
        this.$searchResult.className = 'SearchResult';
        $target.appendChild(this.$searchResult);

        this.data = initialData;
        this.onClick = onClick;

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.init = false;
        this.render();
    }

    render() {
        if (this.data && this.data.length !== 0) {
            this.$searchResult.innerHTML = this.data
                .map(
                    (cat) => `
            <div class="item">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
                )
                .join('');

            this.$searchResult
                .querySelectorAll('.item')
                .forEach(($item, index) => {
                    $item.addEventListener('click', () => {
                        this.onClick(this.data[index]);
                    });
                });
        } else if (!this.init) {
            this.$searchResult.innerHTML = '검색된 데이터가 없습니다.';
        }
    }
}
