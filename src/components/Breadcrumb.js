export default class Breadcrumb {
    constructor({ $app, initialState }) {
        this.state = initialState;

        this.$target = document.createElement('nav');
        this.$target.classList.add('Breadcrumb');
        $app.appendChild(this.$target);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.$target.innerHTML = `<div>root</div>
            ${this.state.path
                .map((node) => `<div>${node.name}</div>`)
                .join('')}`;
    }
}
