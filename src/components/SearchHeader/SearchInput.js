const TEMPLATE = '<input type="text">';

export default class SearchInput {
    $target = null;
    $searchInput = null;

    constructor({ $inputWrapper: $target, initialKeyword, onSearch }) {
        this.$target = $target;
        this.$searchInput = document.createElement('input');
        this.$searchInput.autofocus = true;
        this.$searchInput.placeholder = '고양이를 검색해보세요.|';
        this.$searchInput.className = 'SearchInput';
        if (initialKeyword && initialKeyword !== '') {
            this.$searchInput.value = initialKeyword;
        }

        this.$searchInput.addEventListener('keypress', (e) => {
            if (e.code === 'Enter') {
                onSearch(e.target.value);
            }
        });

        this.$searchInput.addEventListener('click', (e) => {
            this.$searchInput.value = '';
        });

        this.$target.appendChild(this.$searchInput);
    }
}
