import MenuItem from './MenuItem'

export default class MenuItemAnchor extends MenuItem {

    constructor (el) {
        super(el)

        let targetClass = el.dataset.target
        this.target = document.querySelector(targetClass)
    }

    /*
     * Set selected state according to scroll position
     */
    setState (state = 1) {
        if (this.target.getBoundingClientRect().top - document.querySelector('header.header').offsetHeight - 120 <= 0) {
            console.log(this.target.getBoundingClientRect().top)
            console.log(this.target.offsetTop)
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

    /*
     * setUnselected animation
     */
    setUnselected () {
        this.el.classList.remove(MenuItem.SELECTED_CLASS)
        this.animateOnOut(() => {
            this.underline.style.bottom = 0
        })
    }
}
