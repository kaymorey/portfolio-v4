import TweenLite from 'gsap'

import router from 'src/Router'

export default class SliderToProjectAnimation {

    constructor () {
        this.links = [...document.querySelectorAll('.projects-slider__item-link')]
        this.draggingIcon = document.querySelector('.projects-slider__dragging')
        this.sliderBackground = document.querySelector('.projects-slider__background')
    }

    init () {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                this.launchAnimation(link)
            })
        })
    }

    launchAnimation (link) {
        let items = [...document.querySelectorAll('.projects-slider__item')]
        items.forEach(item => {
            if (items.indexOf(item) !== 0) {
                TweenLite.to(item, 0.5, {
                    opacity: 0,
                    onComplete: () => {
                        this.backgroundAnimation(link)
                    }
                })
            }
        })

        TweenLite.to(this.draggingIcon, 0.5, {
            opacity: 0
        })
    }

    backgroundAnimation (link) {
        let bodyHeight = document.querySelector('body').offsetHeight
        let height = bodyHeight - (this.sliderBackground.offsetTop + window.pageYOffset)
        console.log(this.sliderBackground.offsetTop + window.pageYOffset)
        console.log(height)

        TweenLite.to(this.sliderBackground, 1.0, {
            top: '118px',
            height: height,
            onComplete: () => {
                this.pushPath(link)
            }
        })
    }

    pushPath (link) {
        let slug = link.dataset.slug

        router.push({
            name: 'project',
            params: {project: slug}
        })
    }

}
