import {Power3, TweenLite} from 'gsap'
import ScrollToPlugin from 'ScrollToPlugin'

import Utils from 'scripts/Utils'

const DURATION_ANIMATION = 0.8

export default class SliderFromProjectAnimation {

    constructor () {
        this.mainContainer = document.getElementById('main-container')
        this.header = document.querySelector('.header')
        this.section = document.querySelector('.projects')

        this.slider = document.querySelector('.projects-slider__list')
        this.pagination = document.querySelector('.projects-slider__pagination-container')
        this.sliderText = document.querySelector('.projects-slider__text')
        this.background = document.querySelector('.projects-slider__background')

        Utils.loadImages().then(() => {
            console.log('images loaded')
            this.init()
        })
    }

    init () {
        console.log('init')
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
            this.launchAnimation()

            window.setTimeout(() => {
                window.history.scrollRestoration = 'auto'
            }, 2000)
        } else {
            window.setTimeout(() => {
                this.launchAnimation()
            }, 100)
        }
    }

    launchAnimation () {
        this.mainContainer.classList.add('visible')
        window.scroll(0, this.section.offsetTop)

        TweenLite.to(this.header, 0.5, {
            alpha: 1
        })

        TweenLite.to(this.slider, DURATION_ANIMATION, {
            marginLeft: 0,
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
        })
        TweenLite.to(this.sliderText, DURATION_ANIMATION, {
            marginLeft: 0,
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
        })
        TweenLite.to(this.pagination, DURATION_ANIMATION, {
            top: 0,
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
        })
    }

}
