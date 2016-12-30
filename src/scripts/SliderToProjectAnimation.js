import {TweenLite, Power2} from 'gsap'
import ScrollToPlugin from 'ScrollToPlugin'

import router from 'src/Router'

export default class SliderToProjectAnimation {

    constructor () {
        this.section = document.querySelector('.projects')
        this.links = [...document.querySelectorAll('.projects-slider__item-link')]
        this.link = {}
        this.draggingIcon = document.querySelector('.projects-slider__dragging')
        this.sliderBackground = document.querySelector('.projects-slider__background')
    }

    init () {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                this.scrollToCorrectPosition().then(() => {
                    this.link = link
                    this.launchAnimation()
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

    launchAnimation () {
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
                this.backgroundAnimation()
            }
        })
    }

    backgroundAnimation () {
        let bodyHeight = document.querySelector('body').offsetHeight
        let height = bodyHeight - (this.sliderBackground.offsetTop + window.pageYOffset)

        let imgRect = this.links[0].getBoundingClientRect()
        let textRect = document.querySelector('.projects-slider__text[data-index="0"]').getBoundingClientRect()

        window.imgRect = imgRect
        window.textRect = textRect

        TweenLite.to(this.sliderBackground, 0.6, {
            top: 131,
            height: height + 100,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.section.remove()
                console.log(document.querySelector('.hello'))
                document.querySelector('.hello').remove()

                this.section.classList.add('project-loading')
                document.getElementById('main-container').insertBefore(this.section, document.getElementById('main-container').firstChild)

                window.sessionStorage.setItem('navigateFrom', 'home')
                this.pushPath()
            }
        })
    }

    pushPath () {
        let slug = this.link.dataset.slug
        let locale = this.link.dataset.locale

        router.push({
            name: 'project',
            params: {locale: locale, project: slug}
        })
    }
}
