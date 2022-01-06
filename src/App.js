import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';

export default class App {
    state = {
        isRoot: false,
        nodes: [
            {
                id: '5',
                name: '2021/04',
                type: 'DIRECTORY',
                filePath: null,
                parent: {
                    id: '1',
                },
            },
            {
                id: '19',
                name: '물 마시는 사진',
                type: 'FILE',
                filePath: '/images/a2i.jpg',
                parent: {
                    id: '1',
                },
            },
        ],
        path: [
            {
                id: '5',
                name: '2021/04',
                type: 'DIRECTORY',
                filePath: null,
                parent: {
                    id: '1',
                },
            },
            {
                id: '19',
                name: '물 마시는 사진',
                type: 'FILE',
                filePath: '/images/a2i.jpg',
                parent: {
                    id: '1',
                },
            },
        ],
    };

    constructor($app) {
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
}
