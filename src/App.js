import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import ImageView from './components/ImageView.js';
import api from './service/api.js';

// node types
const DIRECTORY = 'DIRECTORY';
const FILE = 'FILE';

export default class App {
    state = {
        isRoot: false,
        nodes: [],
        path: [],
        selectedFilePath: null,
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
            onNodeClick: this.handleNodeClick,
            onPrevClick: this.getPrevNodes,
        });

        this.ImageView = new ImageView({
            $app,
            initialState: this.state.selectedFilePath,
            onModalClick: this.closeFileImage,
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.closeFileImage();
            }
        });
    }

    setState(nextState) {
        this.state = nextState;
        this.breadcrumb.setState({ path: this.state.path });
        this.nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        });
        this.ImageView.setState(this.state.selectedFilePath);
    }

    init = async () => {
        const rootNodes = await api.getNodes();
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: rootNodes,
        });
    };

    handleNodeClick = (node) => {
        switch (node.type) {
            case DIRECTORY:
                this.getNextNodes(node);
                return;
            case FILE:
                this.showFileImage(node.filePath);
                return;
        }
    };

    getNextNodes = async (node) => {
        const nextNodes = await api.getNodes(node.id);
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

    showFileImage = (selectedFilePath) => {
        this.setState({
            ...this.state,
            selectedFilePath:
                selectedFilePath[0] === '/'
                    ? selectedFilePath.slice(1)
                    : selectedFilePath,
        });
    };

    closeFileImage = () => {
        this.setState({
            ...this.state,
            selectedFilePath: null,
        });
    };
}
