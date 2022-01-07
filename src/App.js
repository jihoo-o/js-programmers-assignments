import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import ImageView from './components/ImageView.js';
import Loading from './components/Loading.js';
import api from './service/api.js';

// node types
const DIRECTORY = 'DIRECTORY';
const FILE = 'FILE';

const cache = {};

export default class App {
    state = {
        isRoot: true,
        nodes: [],
        path: [],
        selectedFilePath: null,
        isLoading: false,
    };

    constructor($app) {
        this.breadcrumb = new Breadcrumb({
            $app,
            initialState: {
                path: this.state.path,
            },
            onPathClick: this.getPrevNodes,
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

        this.Loading = new Loading({
            $app,
            initialState: this.state.isLoading,
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.closeFileImage();
            }
        });

        this.init();
    }

    setState(nextState) {
        this.state = nextState;
        this.breadcrumb.setState({ path: this.state.path });
        this.nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        });
        this.ImageView.setState(this.state.selectedFilePath);
        this.Loading.setState(this.state.isLoading);
    }

    init = async () => {
        const rootNodes = await this.getNodes();
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: rootNodes,
        });
    };

    getNodes = async (nodeId) => {
        try {
            this.setState({
                ...this.state,
                isLoading: true,
            });

            if (cache[nodeId || 'root']) {
                return cache[nodeId || 'root'];
            } else {
                const nodes = await api.requestNodes(nodeId);
                cache[nodeId || 'root'] = nodes;
                return nodes;
            }
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false,
            });
        }
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
        const nextNodes = await this.getNodes(node.id);
        this.setState({
            ...this.state,
            path: [...this.state.path, node],
            isRoot: false,
            nodes: nextNodes,
        });
    };

    // go back to: this.state.path[length - 1 - n]
    // n = 0: 현위치
    // n = null: root
    getPrevNodes = async (n) => {
        n = n === null ? this.state.path.length : n;
        const nextPath = this.state.path.slice(0, this.state.path.length - n);
        const selectedNode =
            nextPath.length > 0 ? nextPath[nextPath.length - 1] : null;
        const nextNodes = await this.getNodes(
            selectedNode ? selectedNode.id : null
        );
        this.setState({
            ...this.state,
            path: nextPath,
            isRoot: nextPath.length === 0 ? true : false,
            nodes: nextNodes,
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
