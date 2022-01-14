import Cart from '../components/Cart.js';
import { routeChange } from '../router.js';
import { api } from '../service/api.js';
import { storage } from '../storage.js';

const LOCALSTORAGE_KEY = 'products_cart';

export default class CartPage {
    constructor({ $target }) {
        this.$target = $target;
        this.fetchProducts();
        this.cartComponent = null;
    }

    setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    fetchProducts = async () => {
        const cart = storage.getItem(LOCALSTORAGE_KEY);
        let products;
        if (cart.length !== 0) {
            products = await Promise.all(
                cart.map(async (cartItem) => {
                    const product = await api.requestProduct(
                        cartItem.productId
                    );
                    const selectedOption = product.productOptions.find(
                        (option) => {
                            return option.id === cartItem.optionId;
                        }
                    );

                    return {
                        imageUrl: product.imageUrl,
                        productName: product.name,
                        optionName: selectedOption.name,
                        productPrice: product.price,
                        optionPrice: selectedOption.price,
                        quantity: cartItem.quantity,
                    };
                })
            );
        } else {
            products = cart;
        }

        this.setState(products);
    };

    render = () => {
        if (this.state.length === 0) {
            window.alert('장바구니가 비어 있습니다');
            routeChange('/');
        } else {
            this.$target.innerHTML = `
            <div class="CartPage">
            <h1>장바구니</h1>
            <div class="Cart">
            </div>
            </div>
            `;

            this.$cartPage = document.querySelector('.Cart');
            this.cartComponent = new Cart({
                $target: this.$cartPage,
                initState: { products: this.state },
            });
        }
    };
}
