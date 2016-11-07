export default class ProjectFromHomeAnimation {

    constructor () {
        this.container = document.querySelector('.project__container')
        this.img = document.querySelector('.project__img-center--top')
        this.header = document.querySelector('.project__header')
    }

    init () {
        // 134
        // 508.390625
        // this.img.style.top = window.imgRect.top + 'px'
        // this.img.style.left = window.imgRect.left + 'px'

        // this.header.style.top = window.textRect.top + 'px'
        // this.header.style.left = window.textRect.left + 'px'

        this.img.style.top = 134 - 85 + 'px'
        this.img.style.left = 508.390625 - this.container.getBoundingClientRect().left + 'px'

        this.header.style.top = 209 - 85 + 'px'
        this.header.style.left = 208.390625 - this.container.getBoundingClientRect().left + 'px'
    }
}
