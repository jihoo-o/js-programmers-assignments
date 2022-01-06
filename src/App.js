import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import api from './service/api.js';

export default class App {
    state = {
        isRoot: false,
        nodes: [],
        path: [],
    };

    constructor($app) {
        this.init();

        this.breadcrumb = new Breadcrumb({
            $app,
            initialState: {
                path: this.state.path,
            },
        });

        this.nodes = new Nodes({
            $app,
            initialState: {
                isRoot: this.state.isRoot,
                nodes: this.state.nodes,
            },
            onNodeClick: this.getNextNodes,
            onPrevClick: this.getPrevNodes,
        });
    }

    setState(nextState) {
        this.state = nextState;
        this.breadcrumb.setState({ path: this.state.path });
        this.nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        });
    }

    init = async () => {
        const rootNodes = await api.getNodes();
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: rootNodes,
        });
    };

    getNextNodes = async (nodeId) => {
        const nextNodes = await api.getNodes(nodeId);
        const node = this.state.nodes.find(
            (node) => parseInt(node.id) === nodeId
        );
        this.setState({
            ...this.state,
            path: [...this.state.path, node],
            isRoot: false,
            nodes: nextNodes,
        });
    };

    getPrevNodes = async () => {
        const nodeId = this.state.path[this.state.path.length - 2];
        const prevNodes = await api.getNodes(nodeId);
        this.setState({
            ...this.state,
            path: this.state.path.filter(
                (node, idx) => idx !== this.state.path.length - 1
            ),
            isRoot: this.state.path.length === 1 ? true : false,
            nodes: prevNodes,
        });
    };
}
