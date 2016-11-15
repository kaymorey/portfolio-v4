import {TweenLite, Power2} from 'gsap'
import ScrollToPlugin from 'ScrollToPlugin'

import router from 'src/Router'

export default class SliderToProjectAnimation {

    constructor () {
        this.mainContainer = document.getElementById('main-container')
        this.section = document.querySelector('.projects')
        this.links = [...document.querySelectorAll('.projects-slider__item-link')]
        this.draggingIcon = document.querySelector('.projects-slider__dragging')
        this.sliderBackground = document.querySelector('.projects-slider__background')
    }

    init () {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                this.scrollToCorrectPosition().then(() => {
                    this.launchAnimation(link)
                })
            })
        })
    }

    scrollToCorrectPosition () {
        return new Promise((resolve) => {
            TweenLite.to(window, 0.3, {
                scrollTo: this.section,
                onComplete: () => {
                    resolve(true)
                }
            })
        })
    }

    launchAnimation (link) {
        let items = [...document.querySelectorAll('.projects-slider__item')]
        items.forEach(item => {
            if (items.indexOf(item) !== 0) {
                TweenLite.to(item, 0.3, {
                    opacity: 0
                })
            }
        })

        TweenLite.to(this.draggingIcon, 0.3, {
            opacity: 0,
            onComplete: () => {
                this.backgroundAnimation(link)
            }
        })
    }

    backgroundAnimation (link) {
        let bodyHeight = document.querySelector('body').offsetHeight
        let height = bodyHeight - (this.sliderBackground.offsetTop + window.pageYOffset)

        let imgRect = this.links[0].getBoundingClientRect()
        let textRect = document.querySelector('.projects-slider__text[data-index="0"]').getBoundingClientRect()

        window.imgRect = imgRect
        window.textRect = textRect

        TweenLite.to(this.sliderBackground, 0.6, {
            top: '118px',
            height: height + 100,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.section.remove()
                document.querySelector('.hello').remove()

                this.section.classList.add('project-loading')
                document.getElementById('main-container').insertBefore(this.section, document.getElementById('main-container').firstChild)

                this.pushPath(link)
                window.sessionStorage.setItem('navigateFrom', 'home')
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
