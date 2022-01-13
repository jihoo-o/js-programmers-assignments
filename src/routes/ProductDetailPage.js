import ProductDetail from '../components/ProductDetail.js';
import { api } from '../service/api.js';

export default class ProductDetailPage {
    constructor({ $target, productId }) {
        this.state = {
            productId,
            product: null,
            selectedOptions: [],
            price: 0,
        };
        this.$target = $target;
        this.productDetail = null;
        this.fetchProduct();
    }

    setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    fetchProduct = async () => {
        const { productId } = this.state;
        const product = await api.requestProduct(productId);
        this.setState({
            ...this.state,
            product,
            price: product.price,
        });
    };

    render = () => {
        if (!this.productDetail) {
            this.productDetail = new ProductDetail({
                $target: this.$target,
                initState: {
                    product: this.state.product,
                    selectedOptions: this.state.selectedOptions,
                    price: this.state.price,
                },
            });
        }
    };
}
