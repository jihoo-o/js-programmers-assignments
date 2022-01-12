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

        this.render();
    }

    setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    render = () => {
        if (this.state) {
            this.productList.innerHTML = this.state
                .map(
                    ({ id, imageUrl, name, price }) => `
        <li class="Product" data-id=${id}>
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
