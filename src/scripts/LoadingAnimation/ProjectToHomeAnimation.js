import TweenLite from 'gsap'
import css from 'css-styler'

import router from 'src/Router'

export default class ProjectToHomeAnimation {

    constructor () {
        this.mainContainer = document.getElementById('main-container')
        this.closeLink = document.querySelector('.project__close-link')
        this.container = document.querySelector('.project__container')
        this.background = document.querySelector('.project__background')
    }

    init () {
        this.closeLink.addEventListener('click', (e) => {
            e.preventDefault()

            this.launchAnimation()
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
        let top = this.background.offsetHeight - 592 + this.background.offsetTop

        TweenLite.to(this.background, 0.5, {
            height: 592,
            top: top
        })
        TweenLite.to(window, 0.5, {
            scrollTo: top
        })

        let colors = {
            color1: '#ffdfce',
            color2: '#cfe4fc'
        }

        TweenLite.to(colors, 0.5, {
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
