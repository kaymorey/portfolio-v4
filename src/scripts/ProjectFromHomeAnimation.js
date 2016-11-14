import {TweenLite, TweenMax} from 'gsap'
import ColorPropsPlugin from 'ColorPropsPlugin'
import css from 'css-styler'

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

        let imgObj = new window.Image()
        imgObj.src = this.img.dataset.src
        imgObj.onload = () => {
            this.init()
        }

        window.scroll(0, 0)
    }

    init () {
        this.headerLink = document.querySelector('.project-header__link')

        // 49px _ 268.391px
        this.imgContainer.style.top = window.imgRect.top - this.container.getBoundingClientRect().top + 'px'
        this.imgContainer.style.left = window.imgRect.left - this.container.getBoundingClientRect().left + 'px'

        // 124px _ 0px
        this.header.style.top = window.textRect.top - this.container.getBoundingClientRect().top + 'px'
        this.header.style.left = window.textRect.left - this.container.getBoundingClientRect().left + 'px'

        this.background.style.height = this.slider.offsetHeight + 'px'

        this.removeProjectsSlider()
    }

    removeProjectsSlider () {
        this.slider.remove()

        let obj = {
            color1: '#f2f4f8',
            color2: '#cfe4fc'
        }
        let grayscale = {
            gray: 1,
            opacity: 0.6
        }

        TweenMax.to(obj, 0.7, {
            delay: 0.5,
            colorProps: {
                color1: '#ffdfce',
                color2: '#cfe4fc'
            },
            onUpdate: () => {
                this.upFn(obj)
            }
        })

        TweenMax.to(grayscale, 0.7, {
            gray: 0,
            opacity: 1,
            onUpdate: () => {
                css(this.img, {
                    filter: 'grayscale(' + grayscale.gray + ') opacity(' + grayscale.opacity + ')'
                })
            }
        })

        TweenLite.to(this.background, 0.7, {
            delay: 0.5,
            height: this.section.offsetHeight,
            onComplete: () => {
                this.launchAnimation()
            }
        })
    }

    upFn (obj) {
        css(this.background, {
            background: 'linear-gradient(to bottom, ' + obj.color1 + ', ' + obj.color2 + ')'
        })
    }

    launchAnimation () {
        TweenLite.to(this.imgContainer, 0.7, {
            delay: 0.5,
            width: this.img.naturalWidth,
            top: 0,
            left: '50%',
            marginLeft: -this.img.naturalWidth / 2 + 'px'
        })
        TweenLite.to(this.img, 0.7, {
            delay: 0.5,
            width: 'auto',
            height: 'auto'
        })

        TweenLite.to(this.header, 0.7, {
            delay: 0.5,
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

        TweenLite.to(this.headerAside, 0.7, {
            delay: 0.5,
            alpha: 1
        })

        if (this.headerLink) {
            TweenLite.to(this.headerLink, 0.7, {
                delay: 0.5,
                alpha: 1
            })
        }
    }
}
