import ProductList from '../components/ProductList.js';
import { api } from '../service/api.js';

export default class ProductListPage {
    constructor({ $target }) {
        this.productList = new ProductList({
            $target,
        });

        this.fetchProducts();
    }

    setState = (nextState) => {
        this.state = nextState;
        this.productList.setState(nextState);
    };

    fetchProducts = async () => {
        const products = await api.requestProducts();
        this.setState(products);
    };
}
