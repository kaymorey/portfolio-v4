import {TweenLite, Power1} from 'gsap'

import router from 'src/Router'
import store from 'src/store'
import * as types from 'src/store/mutation-types'

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

        this.logo = document.querySelector('.header__title')
    }

    init () {
        // ---- Scroll to projects when clicking on corresponding item ----
        this.anchorItem.el.addEventListener('click', (e) => {
            e.preventDefault()

            if (document.querySelector('.hello') != undefined) {
                this.scrollToEl(this.anchorItem.target.offsetTop)
            } else {
                store.commit(types.SET_IS_TRANSITIONING)
                this.pushPath()
            }
        })

        // ---- Init items ----
        this.items.forEach(item => {
            item.init()
        })

        // ---- Logo opacity whether we are on homepage ----
        this.setLogoOpacity()
    }

    onScroll () {
        // ---- Show/hide logo ----
        this.setLogoOpacity()

        // ---- Deal with projects item selected state ----
        if (this.anchorItem.target) {
            this.anchorItem.setState()
        }
    }

    deselectAnchor () {
        this.anchorItem.setUnselected()
    }

    selectItem (route) {
        this.items.forEach(item => {
            if (item.el.dataset.route === route) {
                item.setSelected()
            }
        })
    }

    unSelectItem (route) {
        this.items.forEach(item => {
            if (item.el.dataset.route === route) {
                item.setUnselected()
            }
        })
    }

    unselectAllItems () {
        this.items.forEach(item => {
            item.setUnselected(false)
        })
    }

    setLogoOpacity () {
        // ---- Show/hide logo ----
        let homeTitleTop = document.querySelector('.hello__title--top')
        if (homeTitleTop) {
            if (homeTitleTop.getBoundingClientRect().top <= 0) {
                this.logo.classList.remove('header__title--hidden')
            } else {
                this.logo.classList.add('header__title--hidden')
            }
        }
    }

    /**
     * scrollToEl() makes window scroll to an element
     * based on the passed-in el
     */
    scrollToEl (el) {
        TweenLite.to(window, 1.0, {
            scrollTo: el,
            ease: Power1.easeInOut
        })
    }

    pushPath () {
        router.push({
            name: 'home'
        })
    }
}
