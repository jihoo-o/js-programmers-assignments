export default class Breadcrumb {
    constructor({ $app, initialState, onPathClick }) {
        this.state = initialState;

        this.$target = document.createElement('nav');
        this.$target.classList.add('Breadcrumb');
        $app.appendChild(this.$target);

        this.$target.addEventListener('click', (e) => {
            const clickedPath = e.target.closest('.nav-item');
            if (!clickedPath) return;
            const { idx } = clickedPath.dataset;
            onPathClick(
                idx ? this.state.path.length - parseInt(idx) + 1 : null
            );
        });

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.$target.innerHTML = `<div class="nav-item">root</div>
            ${this.state.path
                .map(
                    (node, idx) =>
                        `<div class="nav-item" data-idx="${idx}">${node.name}</div>`
                )
                .join('')}`;
    }
}
