import { routeChange } from '../router.js';

export default class ProductList {
    constructor({ $target }) {
        const productListWrapper = document.createElement('div');
        productListWrapper.classList.add('ProductListPage');
        const title = document.createElement('h1');
        title.innerText = '상품 목록';
        this.productList = document.createElement('ul');

        $target.appendChild(productListWrapper);
        productListWrapper.appendChild(title);
        productListWrapper.appendChild(this.productList);

        this.productList.addEventListener('click', (e) => {
            const product = e.target.closest('li');
            if (!product) return;
            const { productid } = product.dataset;
            routeChange(`/products/${productid}`);
        });

        this.render();
    }

    setState = (nextState) => {
        this.state = nextState;
        console.log(this.state);
        this.render();
    };

    render = () => {
        if (this.state) {
            this.productList.innerHTML = this.state
                .map(
                    ({ id, imageUrl, name, price }) => `
        <li class="Product" data-productId=${id}>
            <img src="${imageUrl}">
            <div class="Product__info">
                <div>${name}</div>
                <div>${price.toLocaleString('ko-KR')}</div>
            </div>
        </li>
        `
                )
                .join('');
        }
    };
}
