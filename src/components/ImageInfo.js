export default class ImageInfo {
    $imageInfo = null;
    data = null;

    constructor({ $target, data }) {
        const $imageInfo = document.createElement('div');
        $imageInfo.className = 'ImageInfo';
        this.$imageInfo = $imageInfo;
        $target.appendChild($imageInfo);

        this.data = data;

        $imageInfo.addEventListener('click', (e) => {
            if (
                e.target.classList.contains('ImageInfo') ||
                e.target.classList.contains('close')
            ) {
                this.setState({ ...this.data, visible: false });
            }
        });

        window.addEventListener('keyup', (e) => {
            if ($imageInfo && e.code === 'Escape') {
                this.setState({ ...this.data, visible: false });
            }
        });

        this.render();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        if (this.data.visible) {
            const { name, url, temperament, origin } = this.data.image;

            this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
            this.$imageInfo.style.display = 'block';
        } else {
            this.$imageInfo.style.display = 'none';
        }
    }
}
