import CartComponent from '../components/CartComponent.js';
import { api } from '../service/api.js';

const LOCALSTORAGE_KEY = 'products_cart';

export default class CartPage {
    constructor({ $target }) {
        this.$target = $target;
        this.fetchProducts();
        this.cartComponent = null;

        this.render();
    }

    setState = (nextState) => {
        this.state = nextState;
        console.log(this.state);
        this.render();
    };

    fetchProducts = async () => {
        const cart = localStorage.getItem(LOCALSTORAGE_KEY);
        if (!cart) return;
        const parsedCart = JSON.parse(cart);
        const products = await Promise.all(
            parsedCart.map(async (cartItem) => {
                const product = await api.requestProduct(cartItem.productId);
                const selectedOption = product.productOptions.find((option) => {
                    return option.id === cartItem.optionId;
                });

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
        this.setState(products);
    };

    render = () => {
        this.$target.innerHTML = `
        <div class="CartPage">
        <h1>장바구니</h1>
        <div class="Cart">
        </div>
        </div>
        `;

        this.$cartPage = document.querySelector('.Cart');
        this.cartComponent = new CartComponent({
            $target: this.$cartPage,
            initState: { products: this.state },
        });
    };
}
