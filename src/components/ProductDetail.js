// 주문하기로 이동
import { routeChange } from '../router.js';
import SelectedOptions from '../components/SelectedOptions.js';

export default class ProductDetail {
    constructor({ $target, initState }) {
        this.state = initState;
        this.$selectedOptions = null;
        this.selectedOptions = null;

        this.productDetail = document.createElement('div');
        this.productDetail.classList.add('ProductDetailPage');

        $target.appendChild(this.productDetail);

        this.productDetail.addEventListener('change', (e) => {
            const target = e.target.closest('.ProductDetail__select');
            if (!target || target.value === '') return;
            this.handleOptionClick(parseInt(target.value, 10));
        });

        this.render();
    }

    setState = (nextState) => {
        /**
         * {
         *  product: ,
         *  selectedOptions: [],
         *  price: ,
         * }
         */
        this.state = nextState;
        this.render();

        if (this.selectedOptions) {
            this.selectedOptions.setState({
                product: this.state.product,
                selectedOptions: this.state.selectedOptions,
                price: this.state.price,
            });
        }
    };

    handleOptionClick = (selectedOptionId) => {
        if (
            this.state.selectedOptions.find(({ id }) => id === selectedOptionId)
        ) {
            return;
        }
        const selectedOption = this.state.product.productOptions.find(
            ({ id }) => id === selectedOptionId
        );

        const updatedSelectedOptions = [
            ...this.state.selectedOptions,
            { ...selectedOption, count: 1 },
        ];

        const updatedPrice = updatedSelectedOptions.reduce(
            (total, { price, count }) => total + price * count,
            this.state.product.price
        );

        this.setState({
            ...this.state,
            selectedOptions: updatedSelectedOptions,
            price: updatedPrice,
        });
    };

    handleOrderChange = (optionId, newCount) => {
        const updatedSelectedOptions = this.state.selectedOptions.map(
            (option) => {
                if (
                    option.id !== parseInt(optionId, 10) ||
                    newCount > option.stock
                )
                    return option;
                return { ...option, count: newCount };
            }
        );

        const updatedPrice = updatedSelectedOptions.reduce(
            (total, { price, count }) => total + price * count,
            this.state.product.price
        );

        this.setState({
            ...this.state,
            selectedOptions: updatedSelectedOptions,
            price: updatedPrice,
        });
    };

    handleOrderBtnClick = () => {
        // localstorage에 저장
        // 라우터 변경 -> /cart
    };

    render = () => {
        console.log('detail');
        const { imageUrl, name, price, productOptions } = this.state.product;
        this.productDetail.innerHTML = `<h1>${name} 상품 정보</h1>
                <div class="ProductDetail">
                  <img src="${imageUrl}">
                  <div class="ProductDetail__info">
                    <h2>${name}</h2>
                    <div class="ProductDetail__price">${price.toLocaleString(
                        'ko-KR'
                    )}</div>
                    <select class="ProductDetail__select">
                    <option value=''>선택하세요.</option>
                      ${productOptions
                          .map(
                              ({ name: optionName, price, stock, id }) => `
                        <option ${stock === 0 ? 'disabled' : ''} value=${id}>
                        ${name} ${optionName} ${price > 0 ? price : ''}
                        </option>`
                          )
                          .join('')}
                    </select>
                    <div class="ProductDetail__selectedOptions">
                    </div>
                  </div>
                </div>`;

        // if (!this.selectedOptions) { --> 렌더링 안되는 이유
        this.$selectedOptions = document.querySelector(
            '.ProductDetail__selectedOptions'
        );
        this.selectedOptions = new SelectedOptions({
            $target: this.$selectedOptions,
            initState: {
                product: this.state.product,
                selectedOptions: this.state.selectedOptions,
                price: this.state.price,
            },
            onOrderChange: this.handleOrderChange,
            onOrderBtnClick: this.handleOrderBtnClick,
        });
        // }
    };
}
