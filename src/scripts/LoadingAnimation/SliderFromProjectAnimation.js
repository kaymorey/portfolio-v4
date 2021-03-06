import {Power3, TweenLite} from 'gsap'
import ScrollToPlugin from 'ScrollToPlugin'

import store from 'src/store'
import * as types from 'src/store/mutation-types'
import Utils from 'scripts/Utils'
import mediaQueryManager from 'scripts/MediaQueryManager'

const DURATION_ANIMATION = 0.8

export default class SliderFromProjectAnimation {

    constructor () {
        this.mainContainer = document.getElementById('main-container')
        this.header = document.querySelector('.header')
        this.hello = document.querySelector('.hello')
        this.section = document.querySelector('.projects')

        this.slider = document.querySelector('.projects-slider__list')
        this.pagination = document.querySelector('.projects-slider__pagination-container')
        this.sliderText = document.querySelector('.projects-slider__text')
        this.dragging = document.querySelector('.projects-slider__dragging')
        this.background = document.querySelector('.projects-slider__background')

        this.projectBackground = document.querySelector('.project__background')

        Utils.loadImages().then(() => {
            this.init()
        })
    }

    init () {
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
        window.scroll(0, this.section.offsetTop - this.header.offsetHeight)

        if (mediaQueryManager.currentBreakpoint === 'mobile') {
            this.mobileAnimation()
        } else {
            this.defaultAnimation()
        }
    }

    defaultAnimation () {
        if (this.projectBackground) {
            this.background.style.opacity = 1
            this.projectBackground.remove()
            this.projectBackground.classList.remove('home-loading')
        } else {
            TweenLite.to(this.background, 0.4, {
                alpha: 1
            })
        }

        TweenLite.to(this.section, DURATION_ANIMATION, {
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
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
        TweenLite.to(this.dragging, DURATION_ANIMATION, {
            alpha: 1,
            delay: 0.5
        })
        TweenLite.to(this.hello, DURATION_ANIMATION, {
            opacity: 1,
            delay: 0.5,
            onComplete: () => {
                this.afterAnimation()
            }
        })
    }

    mobileAnimation () {
        TweenLite.to(this.section, DURATION_ANIMATION, {
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
        })
        TweenLite.to(this.background, DURATION_ANIMATION, {
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
        })
        TweenLite.to(this.slider, DURATION_ANIMATION, {
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
            bottom: -90,
            alpha: 1,
            ease: Power3.easeOut,
            delay: 0.5
        })
        TweenLite.to(this.hello, DURATION_ANIMATION, {
            opacity: 1,
            delay: 0.5,
            onComplete: () => {
                this.afterAnimation()
            }
        })
    }

    afterAnimation () {
        this.hello.classList.remove('loading-from-project')
        this.section.classList.remove('loading-from-project')
        this.pagination.style.top = ''
        this.pagination.style.bottom = ''
        store.commit(types.REMOVE_IS_TRANSITIONING)
    }
}
