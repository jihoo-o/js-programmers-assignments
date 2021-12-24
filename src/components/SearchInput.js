const TEMPLATE = '<input type="text">';

class SearchInput {
    constructor({ $target, onSearch, onRandomSearch }) {
        const $inputWrapper = document.createElement('header');
        $inputWrapper.className = 'InputWrapper';
        $target.appendChild($inputWrapper);

        const $searchInput = document.createElement('input');
        $searchInput.autofocus = true;
        $searchInput.placeholder = '고양이를 검색해보세요.|';

        $searchInput.className = 'SearchInput';
        $inputWrapper.appendChild($searchInput);

        $searchInput.addEventListener('keyup', (e) => {
            if (e.code === 'Enter') {
                onSearch(e.target.value);
            }
        });

        $searchInput.addEventListener('click', (e) => {
            $searchInput.value = '';
        });

        /**
         * randomButton
         */
        const $randomButton = document.createElement('button');
        $randomButton.innerText = '랜덤 검색';
        $randomButton.className = 'RandomButton';
        $inputWrapper.appendChild($randomButton);

        $randomButton.addEventListener('click', (e) => {
            onRandomSearch();
        });
    }
    render() {}
}
