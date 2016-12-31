import {TweenLite, Power2} from 'gsap'
import ScrollToPlugin from 'ScrollToPlugin'

import router from 'src/Router'
import mediaQueryManager from './MediaQueryManager'

export default class SliderToProjectAnimation {

    constructor () {
        this.section = document.querySelector('.projects')
        this.links = [...document.querySelectorAll('.projects-slider__item-link')]
        this.link = {}
        this.draggingIcon = document.querySelector('.projects-slider__dragging')
        this.sliderBackground = document.querySelector('.projects-slider__background')

        this.sectionTopY = 0
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
                    this.sectionTopY = this.section.getBoundingClientRect().top
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

        let item = [...document.querySelectorAll('.projects-slider__item-link')][0]
        let imgRect = item.getBoundingClientRect()
        let imgWidth = item.offsetWidth
        let imgHeight = item.offsetHeight

        let textRect = document.querySelector('.projects-slider__text[data-index="0"]').getBoundingClientRect()

        window.imgRect = imgRect
        window.textRect = textRect

        if (mediaQueryManager.currentBreakpoint === 'tablet') {
            window.imgWidth = imgWidth
            window.imgHeight = imgHeight
        }

        let backgroundTop
        switch (mediaQueryManager.currentBreakpoint) {
        case 'tablet':
            backgroundTop = 185 - this.section.getBoundingClientRect().top
            break
        default:
            backgroundTop = 131
            break
        }

        TweenLite.to(this.sliderBackground, 0.6, {
            top: backgroundTop,
            height: height + 100,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.section.remove()
                document.querySelector('.hello').remove()

                this.section.classList.add('project-loading')
                this.section.style.top = this.sectionTopY + 'px'
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
