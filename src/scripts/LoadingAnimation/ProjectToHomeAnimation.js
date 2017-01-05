import {Power4, TweenLite} from 'gsap'
import css from 'css-styler'

import router from 'src/Router'
import mediaQueryManager from 'scripts/MediaQueryManager'

export default class ProjectToHomeAnimation {

    constructor () {
        this.mainContainer = document.getElementById('main-container')
        this.closeLink = document.querySelector('.project__close-link')
        this.container = document.querySelector('.project__container')
        this.background = document.querySelector('.project__background')
        this.backgroundFinalHeight = 0
        this.backgroundFinalTop = 0
    }

    init () {
        this.closeLink.addEventListener('click', (e) => {
            e.preventDefault()

            switch (mediaQueryManager.currentBreakpoint) {
            case 'tablet':
                this.backgroundFinalTop = 192
                this.backgroundFinalHeight = 475
                break
            case 'mobile':
                this.backgroundFinalTop = 192
                this.backgroundFinalHeight = 582
                break
            default:
                this.backgroundFinalTop = 0
                this.backgroundFinalHeight = 582
                break
            }

            if (mediaQueryManager.currentBreakpoint === 'mobile') {
                this.launchAnimationMobile()
            } else {
                this.launchAnimation()
            }
        })
    }

    launchAnimationMobile () {
        TweenLite.to(this.container, 0.5, {
            alpha: 0
        })
        TweenLite.to(this.closeLink, 0.5, {
            alpha: 0
        })
        TweenLite.to(this.background, 0.5, {
            alpha: 0,
            onComplete: () => {
                window.sessionStorage.setItem('navigateFrom', 'project')
                this.pushPath()
            }
        })
    }

    launchAnimation () {
        TweenLite.to(this.container, 0.5, {
            alpha: 0
        })
        TweenLite.to(this.closeLink, 0.5, {
            alpha: 0,
            onComplete: () => {
                this.shrinkBackground()
            }
        })
    }

    shrinkBackground () {
        let top = window.scrollY + this.backgroundFinalTop - 70

        TweenLite.to(this.background, 0.7, {
            height: this.backgroundFinalHeight,
            top: top,
            ease: Power4.easeOut
        })
        TweenLite.to(window, 0.7, {
            scrollTo: top
        })

        let colors = {
            color1: '#ffdfce',
            color2: '#cfe4fc'
        }

        TweenLite.to(colors, 0.7, {
            colorProps: {
                color1: '#f2f4f8',
                color2: '#cfe4fc'
            },
            onUpdate: () => {
                css(this.background, {
                    background: 'linear-gradient(to bottom, ' + colors.color1 + ', ' + colors.color2 + ')'
                })
            },
            onComplete: () => {
                console.log(this.background.style.top)
                this.background.classList.add('home-loading')
                this.background.style.top = ''
                this.mainContainer.insertBefore(this.background, this.mainContainer.firstChild)
                window.sessionStorage.setItem('navigateFrom', 'project')
                this.pushPath()
            }
        })
    }

    pushPath () {
        router.push({
            name: 'home'
        })
    }

}
