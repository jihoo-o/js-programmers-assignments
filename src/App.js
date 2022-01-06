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

    async init() {
        const rootNodes = await api.getNodes();
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: rootNodes,
        });
    }
}
