// node types
const DIRECTORY = 'DIRECTORY';
const FILE = 'FILE';

export default class Nodes {
    constructor({ $app, initialState, getNextNode }) {
        this.state = initialState;
        this.getNextNode = getNextNode;

        this.$target = document.createElement('div');
        this.$target.classList.add('Nodes');
        $app.appendChild(this.$target);

        this.$target.addEventListener('click', this.handleNodeClick);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    handleNodeClick = (e) => {
        const node = e.target.closest('.Node');
        if (!node) return;
        const nodeId = parseInt(node.dataset.id);
        this.getNextNode(nodeId);
    };

    render() {
        // isRoot ? render previous
        this.$target.innerHTML = this.state.nodes
            .map((node) => {
                switch (node.type) {
                    case DIRECTORY:
                        return `<div class="Node" data-id=${node.id}>
                                    <img src="./assets/directory.png" />
                                    <div>${node.name}</div>
                                </div>`;
                    case FILE:
                        return `<div class="Node" data-id=${node.id}>
                                    <img src="./assets/file.png" />
                                    <div>${node.name}</div>
                                </div>`;
                }
            })
            .join('');
    }
}
