const IMAGE_PATH_PREFIX =
    'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/';

export default class ImageView {
    constructor({ $app, initialState, onModalClick }) {
        this.state = initialState;
        this.$target = document.createElement('div');
        this.$target.classList.add('Modal');
        this.$target.classList.add('ImageViewr');
        this.$target.addEventListener('click', (e) => {
            if (e.target.classList.contains('Modal')) {
                onModalClick();
            }
        });

        $app.appendChild(this.$target);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.$target.innerHTML = `
            <div class="content">
                ${
                    this.state
                        ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">`
                        : ''
                }
            </div>`;
        this.$target.style.display = this.state ? 'block' : 'none';
    }
}
