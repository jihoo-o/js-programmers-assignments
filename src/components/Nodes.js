// node types
const DIRECTORY = 'DIRECTORY';
const FILE = 'FILE';

export default class Nodes {
    constructor({ $app, initialState, onNodeClick, onPrevClick }) {
        this.state = initialState;

        this.$target = document.createElement('div');
        this.$target.classList.add('Nodes');
        $app.appendChild(this.$target);

        this.$target.addEventListener('click', (e) => {
            const $node = e.target.closest('.Node');
            if (!$node) return;
            if ($node.classList.contains('Prev')) {
                onPrevClick();
                return;
            }
            const { id } = $node.dataset;
            const selectedNode = this.state.nodes.find(
                (node) => node.id === id
            );
            onNodeClick(selectedNode);
        });

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.$target.innerHTML = `
        ${
            !this.state.isRoot
                ? `
        <div class="Node Prev">
        <img src="./assets/prev.png" />
        </div>`
                : ''
        }
        ${this.state.nodes
            .map((node) => {
                switch (node.type) {
                    case DIRECTORY:
                        return `<div class="Node" data-id="${node.id}">
                                    <img src="./assets/directory.png" />
                                    <div>${node.name}</div>
                                </div>`;
                    case FILE:
                        return `<div class="Node" data-id="${node.id}">
                                    <img src="./assets/file.png" />
                                    <div>${node.name}</div>
                                </div>`;
                }
            })
            .join('')}`;
    }
}
