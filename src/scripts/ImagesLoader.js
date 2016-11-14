export default class ImagesLoader {

    constructor () {
        this.images = [...document.querySelectorAll('img[data-src]')]
    }

    init () {

    }

    loadImages (images) {
        if (!images) {
            images = this.images
        }

        if (images.length > 0) {
            let img = images[0]

            let imgObj = new window.Image()
            imgObj.src = img.dataset.src
            imgObj.onload = () => {
                images.shift()
                this.loadImages(images)
            }
        }

        return new Promise((resolve) => {
            resolve(true)
        })
    }
}
