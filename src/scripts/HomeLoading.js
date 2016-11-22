import {TimelineLite, TweenLite, Power3, Circ} from 'gsap'

export default class HomeLoading {

    constructor () {
        this.body = document.querySelector('body')
        this.mainContainer = document.getElementById('main-container')
        this.menu = document.querySelector('.header')
        this.section = document.querySelector('.hello')
        this.sectionContainer = document.querySelector('.hello__container')
        this.leftBackground = document.querySelector('.hello__background')
        this.rightBackground = document.querySelector('.hello__loading-right')
        this.links = [...document.querySelectorAll('.hello__link')]
    }

    init () {
        return new Promise((resolve) => {
            if (this.section) {
                this.setInitialStyles()
                this.launchAnimation().then(() => {
                    resolve(true)
                })

                this.links.forEach(link => {
                    link.classList.add('hello__link-animation')
                })
            }
        })
    }

    setInitialStyles () {
        this.body.style.overflow = 'hidden'

        this.mainContainer.classList.add('visible')

        let sectionHeight = this.section.offsetHeight
        this.leftBackground.style.bottom = sectionHeight - 182 + 'px'
        this.rightBackground.style.bottom = sectionHeight - 182 + 'px'

        this.leftBackground.style.width = '22px'
    }

    launchAnimation () {
        return new Promise((resolve) => {
            this.loadingBars().then(() => {
                this.expandLeftBackground()
                this.moveRightBackgroundDown()

                return this.makeContentAppear()
            })
        })
    }

    loadingBars () {
        return new Promise((resolve) => {
            TweenLite.to(this.leftBackground, 1.5, {
                bottom: '0px',
                ease: Power3.easeOut
            })
            TweenLite.to(this.rightBackground, 1.5, {
                bottom: '0px',
                ease: Power3.easeOut,
                onComplete: () => {
                    resolve(true)
                }
            })
        })
    }

    expandLeftBackground () {
        TweenLite.to(this.leftBackground, 1.0, {
            width: '80%',
            ease: Circ.easeInOut
        })
    }

    moveRightBackgroundDown () {
        TweenLite.to(this.rightBackground, 1.5, {
            top: window.innerHeight,
            bottom: -window.innerHeight - this.rightBackground.offsetHeight,
            ease: Power3.easeInOut,
            onComplete: () => {
                this.rightBackground.style.display = 'none'
            }
        })
    }

    makeContentAppear () {
        return new Promise((resolve) => {
            TweenLite.to(this.sectionContainer, 0.45, {
                alpha: 1,
                left: '0px',
                delay: 0.7,
                ease: Power3.easeOut,
                onComplete: () => {
                    // window.scroll(0, 0)
                    this.body.style.overflow = 'auto'
                    this.linksAnimation()
                    resolve(true)
                }
            })
            TweenLite.to(this.menu, 0.45, {
                alpha: 1,
                delay: 0.7,
                onComplete: () => {
                    this.menu.classList.add('visible')
                    this.menu.style.opacity = ''
                }
            })
        })
    }

    linksAnimation () {
        return new Promise((resolve) => {
            this.links.forEach(link => {
                let tl = new TimelineLite()
                let underline = link.querySelector('.link-underline')
                tl.to(underline, 0.5, {
                    width: '100%',
                    ease: Power3.easeOut
                })
                .to(underline, 0.5, {
                    bottom: '-8px',
                    ease: Power3.easeOut,
                    onComplete: () => {
                        link.classList.remove('hello__link-animation')
                        underline.style.cssText = ''
                        resolve(true)
                    }
                }, '+=0.5')
            })
        })
    }

}
