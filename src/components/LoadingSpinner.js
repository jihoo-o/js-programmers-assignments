export default class LoadingSpinner {
    $loadingSpinner = null;
    loading = false;

    constructor({ $target }) {
        this.$loadingSpinner = document.createElement('div');
        this.$loadingSpinner.className = 'LoadingSpinner';
        $target.appendChild(this.$loadingSpinner);

        this.render();
    }

    /**
     *
     * @param {boolean} nextData true/false
     */
    setState(nextData) {
        this.loading = nextData;

        this.render();
    }

    render() {
        if (this.loading) {
            this.$loadingSpinner.style.display = 'block';
        } else {
            this.$loadingSpinner.style.display = 'none';
        }
    }
}
