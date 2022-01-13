export default class SelectedOptions {
    constructor({ $target, initState, onOrderChange, onOrderBtnClick }) {
        this.$target = $target;
        this.state = initState;
        console.log('constructor -> ');

        this.$target.addEventListener('change', (e) => {
            const target = e.target.closest('input');
            if (!target) return;
            const value = parseInt(target.value, 10);
            if (typeof value !== 'number' || value < 0) {
                target.value = 0;
                return;
            }
            const { optionid: optionId } = target.closest('li').dataset;
            onOrderChange(optionId, value);
        });

        this.$target.addEventListener('click', (e) => {
            // 선택된 옵션이 없을 경우
            const target = e.target.closest('.OrderButton');
            if (!target) return;
            onOrderBtnClick();
        });

        this.render();
    }

    setState = (nextState) => {
        /**
         * {
         * product
         * selectedOptions
         * }
         */
        this.state = nextState;
        this.render();
    };

    render = () => {
        this.$target.innerHTML = `
                      <h3>선택된 상품</h3>
                      <ul>
                        ${this.state.selectedOptions
                            .map(
                                ({ id, name, price, count }) => `
                        <li data-optionId=${id}>
                        ${this.state.product.name} ${name} ${price}원 <div><input type="number" value=${count}>개</div>
                        </li>`
                            )
                            .join('')}
                      </ul>
                      <div class="ProductDetail__totalPrice">${
                          this.state.price
                      }원</div>
                      <button class="OrderButton">주문하기</button>
                    `;
    };
}
