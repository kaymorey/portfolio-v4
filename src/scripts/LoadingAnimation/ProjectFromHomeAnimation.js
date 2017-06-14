import {TweenLite, TweenMax, Power2} from 'gsap'
import ColorPropsPlugin from 'ColorPropsPlugin'
import css from 'css-styler'

import store from 'src/store'
import * as types from 'src/store/mutation-types'
import Utils from 'scripts/Utils'
import mediaQueryManager from 'scripts/MediaQueryManager'

const COLORS_DURATION_ANIMATION = 0.5
const POSITIONS_DURATION_ANIMATION = 0.5

export default class ProjectFromHomeAnimation {

    constructor () {
        this.section = document.querySelector('.project')
        this.sectionHeight = 0
        this.container = document.querySelector('.project__container')
        this.background = document.querySelector('.project__background')
        this.content = document.querySelector('.project__content')

        this.imgContainer = document.querySelector('.project__img-center--top')
        this.img = document.querySelector('.project__main-img')
        this.imgWidth = this.img.naturalWidth
        this.imgHeight = this.img.naturalHeight

        this.header = document.querySelector('.project__header')
        this.headerAside = document.querySelector('.project-header__aside')
        this.headerLink = null

        this.slider = document.querySelector('.projects')

        this.finalWidthImgContainer = 0
        this.finalHeightImgContainer = 0
        this.paddingBottomImg = 59

        window.scroll(0, 0)

        Utils.loadImages().then(() => {
            this.init()
        })
    }

    init () {
        this.headerLink = document.querySelector('.project-header__link')
        this.setInitialStyles()
        this.container.style.opacity = 1
        this.slider.remove()
        this.slider.classList.remove('project-loading')
        this.slider.style.top = ''

        if (this.imgWidth < this.container.offsetWidth) {
            this.finalWidthImgContainer = this.imgWidth
        } else {
            this.finalWidthImgContainer = this.container.offsetWidth
        }

        this.finalHeightImgContainer = this.imgHeight * this.finalWidthImgContainer / this.imgWidth

        if (mediaQueryManager.currentBreakpoint !== 'mobile') {
            this.colorsAnimation()
        } else {
            this.paddingBottomImg = 32
        }

        store.commit(types.REMOVE_IS_TRANSITIONING)
    }

    setInitialStyles () {
        this.imgContainer.style.top = window.imgRect.top - this.container.getBoundingClientRect().top + 'px'
        this.imgContainer.style.left = window.imgRect.left - this.container.getBoundingClientRect().left + 'px'

        this.header.style.top = window.textRect.top - this.container.getBoundingClientRect().top + 'px'
        this.header.style.left = window.textRect.left - this.container.getBoundingClientRect().left + 'px'

        this.background.style.height = window.innerHeight - this.background.getBoundingClientRect().top

        if (mediaQueryManager.currentBreakpoint === 'mobile' || mediaQueryManager.currentBreakpoint === 'tablet') {
            this.imgContainer.style.width = window.imgWidth + 'px'
            this.imgContainer.style.height = window.imgHeight + 'px'
            this.img.style.height = 'auto'

            if (mediaQueryManager.currentBreakpoint === 'mobile') {
                this.background.style.left = '13vw'
                this.background.style.width = '87vw'

                this.shrinkBackgroundWidth()
            }
        }
    }

    /*
     * shrinkBackgroundWidth shrinks background on mobile only
     */
    shrinkBackgroundWidth () {
        TweenLite.to(this.background, 0.5, {
            left: '23vw',
            width: '77vw',
            delay: 0.2,
            onComplete: () => {
                this.colorsAnimation()
            }
        })
    }

    /*
     * colorsAnimation calls changeBackgroundColor() and colorizeImage() functions
     * Also expand background height
     */
    colorsAnimation () {
        this.changeBackgroundColor()
        this.colorizeImage()

        TweenLite.to(this.background, COLORS_DURATION_ANIMATION, {
            height: this.section.offsetHeight,
            onComplete: () => {
                this.positionsAnimation()
            }
        })
    }

    /*
     * Animate background linear-gradient change
     */
    changeBackgroundColor () {
        let colors = {
            color1: '#f2f4f8',
            color2: '#cfe4fc'
        }

        TweenMax.to(colors, COLORS_DURATION_ANIMATION, {
            colorProps: {
                color1: '#ffdfce',
                color2: '#cfe4fc'
            },
            onUpdate: () => {
                css(this.background, {
                    background: 'linear-gradient(to bottom, ' + colors.color1 + ', ' + colors.color2 + ')'
                })
            }
        })
    }

    /*
     * Animate image from grayscale to color
     */
    colorizeImage () {
        let grayscale = {
            gray: 1,
            opacity: 0.6
        }

        TweenMax.to(grayscale, COLORS_DURATION_ANIMATION, {
            gray: 0,
            opacity: 1,
            onUpdate: () => {
                css(this.img, {
                    filter: 'grayscale(' + grayscale.gray + ') opacity(' + grayscale.opacity + ')'
                })
            }
        })
    }

    /*
     * positionsAnimation calls moveElements() and makeAsideAppear() functions
     */
    positionsAnimation () {
        this.moveElements()
        this.makeAsideAppear()
    }

    /*
     * Animate img and header positions changes
     */
    moveElements () {
        TweenLite.to(this.imgContainer, POSITIONS_DURATION_ANIMATION, {
            ease: Power2.easeOut,
            width: this.finalWidthImgContainer,
            top: 0,
            left: '50%',
            marginLeft: -this.finalWidthImgContainer / 2 + 'px'
        })
        TweenLite.to(this.img, POSITIONS_DURATION_ANIMATION, {
            ease: Power2.easeOut,
            width: 'auto',
            height: 'auto'
        })

        TweenLite.to(this.header, POSITIONS_DURATION_ANIMATION, {
            ease: Power2.easeOut,
            top: this.finalHeightImgContainer + this.paddingBottomImg + 'px',
            onComplete: () => {
                this.imgContainer.style.position = 'static'
                this.imgContainer.style.width = '100%'
                this.imgContainer.style.marginLeft = 0
                this.imgContainer.style.height = ''

                this.header.style.position = 'static'
                this.content.style.opacity = 1

                this.background.style.height = this.section.offsetHeight - this.background.offsetTop + 'px'
            }
        })
    }

    /*
     * Animate aside (and eventually header link) opacity
     */
    makeAsideAppear () {
        TweenLite.to(this.headerAside, POSITIONS_DURATION_ANIMATION, {
            alpha: 1
        })

        if (this.headerLink) {
            TweenLite.to(this.headerLink, POSITIONS_DURATION_ANIMATION, {
                alpha: 1
            })
        }
    }
}
