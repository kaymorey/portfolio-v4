import {TweenLite, Power3} from 'gsap'
import ScrollToPlugin from 'ScrollToPlugin'

import MenuItem from './MenuItem'
import MenuItemAnchor from './MenuItemAnchor'

export default class Menu {

    constructor () {
        // ---- Create items array ----
        let itemsList = [...document.querySelectorAll('.header__link')]
        let item

        this.items = []

        itemsList.forEach(el => {
            if (el.classList.contains('header__anchor')) {
                item = new MenuItemAnchor(el)
                this.anchorItem = item
            } else {
                item = new MenuItem(el)
            }
            this.items.push(item)
        })

        this.titleLink = document.querySelector('.header-title__link')
    }

    init () {
        // ---- Scroll to projects when clicking on corresponding item ----
        this.anchorItem.el.addEventListener('click', (e) => {
            e.preventDefault()

            this.scrollToEl(this.anchorItem.target.offsetTop)
        })

        // ---- Init items ----
        this.items.forEach(item => {
            item.init()
        })

        // ---- Logo opacity whether we are on homepage ----
        this.setLogoOpacity()
    }

    onScroll () {
        // ---- Show/hide titleLink ----
        this.setLogoOpacity()

        // ---- Deal with projects item selected state ----
        if (this.anchorItem.target) {
            this.anchorItem.setState()
        }
    }

    deselectAnchor () {
        console.log('deselect anchor')
        this.anchorItem.setState(0)
    }

    setLogoOpacity () {
        // ---- Show/hide titleLink ----
        let homeTitleTop = document.querySelector('.hello__title--top')
        if (homeTitleTop) {
            if (homeTitleTop.getBoundingClientRect().top <= 0) {
                TweenLite.to(this.titleLink, 0.5, {
                    alpha: 1
                })
            } else {
                TweenLite.to(this.titleLink, 0.5, {
                    alpha: 0
                })
            }
        } else {
            TweenLite.to(this.titleLink, 0.5, {
                alpha: 1
            })
        }
    }

    /**
     * scrollToEl() makes window scroll to an element
     * based on the passed-in el
     */
    scrollToEl (el) {
        TweenLite.to(window, 2.0, {
            scrollTo: el,
            ease: Power3.easeOut
        })
    }
}
