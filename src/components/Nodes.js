// node types
const DIRECTORY = 'DIRECTORY';
const FILE = 'FILE';

export default class Nodes {
    constructor({ $app, initialState }) {
        this.state = initialState;

        this.$target = document.createElement('div');
        this.$target.classList.add('Nodes');
        $app.appendChild(this.$target);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        // isRoot ? render previous
        this.$target.innerHTML = this.state.nodes
            .map((node) => {
                switch (node.type) {
                    case DIRECTORY:
                        return `<div class="Node">
                                    <img src="./assets/directory.png" />
                                    <div>${node.name}</div>
                                </div>`;
                    case FILE:
                        return `<div class="Node">
                                    <img src="./assets/file.png" />
                                    <div>${node.name}</div>
                                </div>`;
                }
            })
            .join('');
    }
}
