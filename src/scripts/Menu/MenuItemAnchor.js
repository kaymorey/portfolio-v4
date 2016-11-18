import MenuItem from './MenuItem'

export default class MenuItemAnchor extends MenuItem {

    constructor (el) {
        super(el)

        this.targetClass = el.dataset.target
        this.target = document.querySelector(this.targetClass)
    }

    /*
     * Set selected state according to scroll position
     */
    setState () {
        this.target = document.querySelector(this.targetClass)
        if (this.target.getBoundingClientRect().top - document.querySelector('header.header').offsetHeight - 120 <= 0) {
            if (!this.el.classList.contains(MenuItem.SELECTED_CLASS)) {
                this.setSelected()
            }
        } else {
            if (this.el.classList.contains(MenuItem.SELECTED_CLASS)) {
                this.setUnselected()
            }
        }
    }

    /*
     * setSelected animation : different whether item is on over
     * if not we have to play over animation before selected animation
     */
    setSelected () {
        if (this.el.classList.contains(MenuItem.OVER_CLASS)) {
            this.animateSelected()
        } else {
            this.animateOnOver(() => {
                this.animateSelected(() => {
                    this.setState()
                })
            })
        }
    }
}
