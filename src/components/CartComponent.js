import { routeChange } from '../router.js';
import { storage } from '../storage.js';

const LOCALSTORAGE_KEY = 'products_cart';

export default class CartComponent {
    constructor({ $target, initState }) {
        this.state = initState;
        this.$target = $target;

        this.$target.addEventListener('click', (e) => {
            const target = e.target.closest('.OrderButton');
            if (!target) return;
            this.handleOrderClick();
        });

        this.render();
    }

    setState = (nextState) => {
        this.state = nextState;

        this.render();
    };

    getTotalPrice = () => {
        return this.state.products.reduce(
            (total, { optionPrice, quantity, productPrice }) => {
                return optionPrice * quantity + productPrice + total;
            },
            0
        );
    };

    handleOrderClick = () => {
        window.alert('주문되었습니다.');
        storage.setItem(LOCALSTORAGE_KEY, []);
        routeChange('/');
    };

    render = () => {
        this.$target.innerHTML = `
        <ul>
            ${
                this.state.products &&
                this.state.products
                    .map(
                        ({
                            imageUrl,
                            optionName,
                            optionPrice,
                            productName,
                            productPrice,
                            quantity,
                        }) => `
                <li class="Cart__item">
              <img src="${imageUrl}">
              <div class="Cart__itemDesription">
                <div>${productName} ${optionName} ${quantity}개</div>
                <div>${optionPrice * quantity + productPrice}원</div>
              </div>
            </li>`
                    )
                    .join('')
            }
        </ul>
        <div class="Cart__totalPrice">
            총 상품가격 ${this.state.products ? this.getTotalPrice() : 0}원
        </div>
        <button class="OrderButton">주문하기</button>
        `;
    };
}
