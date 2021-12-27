import { $ } from '../../utils/selector.js';

export default class RandomButton {
    constructor({ $inputWrapper: $target, onRandomSearch }) {
        const $randomButton = $('button');
        $randomButton.innerText = '랜덤 검색';
        $randomButton.className = 'RandomButton';
        $target.appendChild($randomButton);

        $randomButton.addEventListener('click', (e) => {
            onRandomSearch();
        });
    }
}
