import {TweenLite, Power3} from 'gsap'

const SELECTED_CLASS = 'header__link--selected'
const OVER_CLASS = 'header__link--over'

export default class MenuItem {

    constructor (el) {
        this.el = el
        this.underline = this.el.querySelector('.header-link__underline')
        this.selectedAnimation = false
    }

    init () {
        this.el.addEventListener('mouseover', () => {
            this.animateOnOver()
        })
        this.el.addEventListener('mouseout', () => {
            this.animateOnOut()
        })
    }

    /**
     * animateOnOver() defines the strike out mouseover animation on the item
     * written in JavaScript and not by using CSS transition as we need to know if the hover animation is complete in the scrollToEl() function
     * This is done by adding a class at the end of the following animation
     * can take a callback function as a parameter
     */
    animateOnOver (callback = null) {
        if (!this.isSelected() && this.underline !== null) {
            TweenLite.to(this.underline, 0.6, {
                width: '100%',
                ease: Power3.easeOut,
                onComplete: () => {
                    this.el.classList.add(OVER_CLASS)
                    if (callback) {
                        callback()
                    }
                }
            })
        }
    }

    /**
     * animateOnOut() defines the strike out mouseout animation on the item
     * can take a callback function as a parameter
     */
    animateOnOut (callback = null) {
        if (!this.isSelected() && !this.selectedAnimation && this.underline !== null) {
            this.el.classList.remove(OVER_CLASS)
            TweenLite.to(this.underline, 0.5, {
                width: '0',
                ease: Power3.easeOut,
                onComplete: () => {
                    if (callback) {
                        callback()
                    }
                }
            })
        }
    }

    /**
     * animateSelected() defines the animation to selected item state
     * takes a callback function as a parameter
     */
    animateSelected (callback = null) {
        if (this.underline !== null) {
            this.el.classList.add(SELECTED_CLASS)
            TweenLite.to(this.underline, 0.5, {
                bottom: '-15px',
                ease: Power3.easeOut,
                onComplete: () => {
                    this.selectedAnimation = false
                    if (callback) {
                        callback()
                    }
                }
            })
        }
    }

    /**
     * Check if item is selected by checking if it contains SELECTED_CLASS
     */
    isSelected () {
        if (this.el.classList.contains(SELECTED_CLASS)) {
            return true
        }

        return false
    }

    setAnchorTarget (target) {
        this.target = target
    }

    /*
     * setSelected animation : different whether item is on over
     * if not we have to play over animation before selected animation
     */
    setSelected () {
        this.selectedAnimation = true
        if (this.el.classList.contains(MenuItem.OVER_CLASS)) {
            this.animateSelected()
        } else {
            this.animateOnOver(() => {
                this.animateSelected()
            })
        }
    }

    /*
     * setUnselected animation
     */
    setUnselected (animated = true) {
        this.el.classList.remove(MenuItem.SELECTED_CLASS)

        if (!animated) {
            if (this.underline) {
                this.underline.style.width = 0
                this.underline.style.bottom = 0
            }
        } else {
            this.animateOnOut(() => {
                this.underline.style.bottom = 0
            })
        }
    }

    /*
     * Static methods to get constants
     */
    static get SELECTED_CLASS () {
        return SELECTED_CLASS
    }

    static get OVER_CLASS () {
        return OVER_CLASS
    }

}
