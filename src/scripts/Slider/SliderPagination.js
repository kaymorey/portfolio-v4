import TweenLite from 'gsap'
import Emitter from '../Emitter'

export default class SliderPagination {

    constructor () {
        this.items = [...document.querySelectorAll('.pagination__item')]
        this.links = [...document.querySelectorAll('.pagination__link')]
        this.underline = document.querySelector('.projects-slider__pagination-underline')
    }

    init () {
        this.links.forEach(link => {
            link.addEventListener('mouseover', () => {
                this.onOverLink(link)
            })
            link.addEventListener('mouseleave', () => {
                this.onOutLink(link)
            })
        })

        Emitter.on('changeBreakpoint', () => {
            this.updateOnBrakpointChange()
        })

        Emitter.on('didClickOnPaginationLink', (index) => {
            this.didClickOnLink(this.links[index])
        })
    }

    didClickOnLink (link) {
        this.underline.dataset.selected = this.links.indexOf(link)
        TweenLite.to(this.underline, 0.7, {
            left: link.offsetLeft,
            width: link.offsetWidth
        })
    }

    onOverLink (link) {
        let overIndex = this.links.indexOf(link)
        let selectedIndex = this.underline.dataset.selected

        let diff = overIndex - selectedIndex

        let referenceWidth = this.links[selectedIndex].offsetWidth

        TweenLite.to(this.underline, 0.4, {
            width: referenceWidth + 15 * diff
        })
    }

    onOutLink (link) {
        let selectedIndex = this.underline.dataset.selected
        let referenceWidth = this.links[selectedIndex].offsetWidth

        TweenLite.to(this.underline, 0.6, {
            width: referenceWidth
        })
    }

    resize () {
        let link = this.links[this.underline.dataset.selected]
        this.underline.style.left = link.offsetLeft + 'px'
    }

    updateOnBrakpointChange () {
        let link = this.links[this.underline.dataset.selected]
        this.underline.style.width = link.offsetWidth + 'px'
    }
}
