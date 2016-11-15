import TweenLite from 'gsap'

export default function Utils () {}

Utils.fadeInPage = function () {
    let header = document.querySelector('header.header')
    let container = document.getElementById('main-container')

    TweenLite.to(header, 0.5, {
        delay: 0.2,
        alpha: 1
    })

    TweenLite.to(container, 0.5, {
        delay: 0.2,
        alpha: 1
    })
}

Utils.loadImages = function (images) {
    if (!images) {
        images = [...document.querySelectorAll('img[data-src]')]
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
