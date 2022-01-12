// 주문하기로 이동
import { routeChange } from '../router.js';

export default class ProductDetail {
    constructor({ $target }) {
        this.productDetailWrapper = document.createElement('div');
        this.productDetailWrapper.classList.add('ProductDetailPage');
        this.selectedOptions = null;

        $target.appendChild(this.productDetailWrapper);

        this.render();
    }

    setState = (nextState) => {
        this.state = nextState;
        console.log(this.state);
        this.render();
    };

    render = () => {
        if (this.state) {
            const { id, imageUrl, name, price, productOptions } = this.state;
            this.productDetailWrapper.innerHTML = `<h1>${name} 상품 정보</h1>
                <div class="ProductDetail">
                  <img src="${imageUrl}">
                  <div class="ProductDetail__info">
                    <h2>${name}</h2>
                    <div class="ProductDetail__price">${price.toLocaleString(
                        'ko-KR'
                    )}</div>
                    <select>
                      ${productOptions
                          .map(
                              ({ name: optionName, price, stock }) => `
                        <option ${stock === 0 ? 'disabled' : ''}>
                        ${name} ${optionName} ${price > 0 ? price : ''}
                        </option>`
                          )
                          .join('')}
                    </select>
                    <div class="ProductDetail__selectedOptions">
                      <h3>선택된 상품</h3>
                      <ul>
                        <li>
                          커피잔 100개 번들 10,000원 <div><input type="number" value="10">개</div>
                        </li>
                        <li>
                          커피잔 1000개 번들 15,000원 <div><input type="number" value="5">개</div>
                        </li>
                      </ul>
                      <div class="ProductDetail__totalPrice">175,000원</div>
                      <button class="OrderButton">주문하기</button>
                    </div>
                  </div>
                </div>`;
        }
    };
}
