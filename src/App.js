import ProductListPage from './routes/ProductListPage.js';
import ProductDetailPage from './routes/ProductDetailPage.js';
import CartPage from './routes/CartPage.js';
import { init } from './router.js';

export default class App {
    constructor({ $target }) {
        this.$target = $target;
        init(this.route);

        this.route();
    }

    route = () => {
        this.$target.innerHTML = '';

        const { pathname } = window.location;

        if (pathname === '/') {
            new ProductListPage({ $target: this.$target });
        } else if (pathname.indexOf('/products/') === 0) {
            // /products/:productId
            const [, , productId] = pathname.split('/');
            new ProductDetailPage({ $target: this.$target, productId });
        } else if (pathname === '/cart') {
            new CartPage({ $target: this.$target });
        }
    };
}
