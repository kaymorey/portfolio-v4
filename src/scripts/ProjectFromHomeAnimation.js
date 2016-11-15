import {TweenLite, TweenMax, Power2} from 'gsap'
import ColorPropsPlugin from 'ColorPropsPlugin'
import css from 'css-styler'

import Utils from 'scripts/Utils'

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

        this.header = document.querySelector('.project__header')
        this.headerAside = document.querySelector('.project-header__aside')
        this.headerLink = null

        this.slider = document.querySelector('.projects')

        window.scroll(0, 0)

        Utils.loadImages().then(() => {
            this.init()
        })
    }

    init () {
        this.headerLink = document.querySelector('.project-header__link')
        this.setInitialStyles()
        this.slider.remove()
        this.slider.classList.remove('project-loading')

        this.colorsAnimation()
    }

    setInitialStyles () {
        // 49px _ 268.391px
        this.imgContainer.style.top = window.imgRect.top - this.container.getBoundingClientRect().top + 'px'
        this.imgContainer.style.left = window.imgRect.left - this.container.getBoundingClientRect().left + 'px'

        // 124px _ 0px
        this.header.style.top = window.textRect.top - this.container.getBoundingClientRect().top + 'px'
        this.header.style.left = window.textRect.left - this.container.getBoundingClientRect().left + 'px'

        this.background.style.height = this.slider.offsetHeight + 'px'
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
            width: this.img.naturalWidth,
            top: 0,
            left: '50%',
            marginLeft: -this.img.naturalWidth / 2 + 'px'
        })
        TweenLite.to(this.img, POSITIONS_DURATION_ANIMATION, {
            ease: Power2.easeOut,
            width: 'auto',
            height: 'auto'
        })

        TweenLite.to(this.header, POSITIONS_DURATION_ANIMATION, {
            ease: Power2.easeOut,
            top: this.img.naturalHeight + 59 + 'px',
            onComplete: () => {
                this.imgContainer.style.position = 'static'
                this.imgContainer.style.width = '100%'
                this.imgContainer.style.marginLeft = 0

                this.header.style.position = 'static'
                this.content.style.opacity = 1

                this.background.style.height = this.section.offsetHeight + 'px'
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
