import ProductDetail from '../components/ProductDetail.js';
import { api } from '../service/api.js';

export default class ProductDetailPage {
    constructor({ $target, productId }) {
        this.productDetail = new ProductDetail({ $target });

        this.fetchProduct(productId);
    }

    setState = (nextState) => {
        this.state = nextState;
        this.productDetail.setState(nextState);
    };

    fetchProduct = async (productId) => {
        const product = await api.requestProduct(productId);
        this.setState(product);
    };
}
