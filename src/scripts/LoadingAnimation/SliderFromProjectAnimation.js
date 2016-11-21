import TweenLite from 'gsap'

export default class SliderFromProjectAnimation {

    constructor () {
        this.mainContainer = document.getElementById('main-container')
        this.header = document.querySelector('.header')
        this.section = document.querySelector('.projects')
    }

    init () {
        this.launchAnimation()
    }

    launchAnimation () {
        window.scroll(0, this.section.offsetTop)
        this.mainContainer.classList.add('visible')

        TweenLite.to(this.header, 0.5, {
            alpha: 1
        })

        TweenLite.to(this.section, 0.5, {

        })
    }

}
