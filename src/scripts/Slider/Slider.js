import {TweenLite, Power3} from 'gsap'

import Emitter from '../Emitter'
import mediaQueryManager from '../MediaQueryManager'

import SliderDragging from './SliderDragging'
import SliderPagination from './SliderPagination'

export default class Slider {

    constructor () {
        this.emitter = Emitter

        this.items = [...document.querySelectorAll('.projects-slider__item')]
        this.texts = [...document.querySelectorAll('.projects-slider__text')]

        this.sliderContainer = document.querySelector('.projects__slider')
        this.el = document.querySelector('.projects-slider__list')

        this.firstItem = this.getFirstItem()
        this.sliderDragging = new SliderDragging(document.querySelector('.projects-slider__dragging'), this.el, this.firstItem)
        this.sliderPagination = new SliderPagination()

        this.animationTextCompletedEvent = new window.Event('animationTextCompleted')

        this.reversedTexts = false
        this.updateItemsInterval = null
        this.itemsToCopy = []
        this.selectedIndex = 0
    }

    init () {
        // Responsive
        this.emitter.on('changeBreakpoint', () => {
            this.changeBreakpoint()
        })

        this.sliderLeft = this.el.offsetLeft

        // Init SliderPagination and add eventListener
        this.sliderPagination.init()
        this.sliderPagination.links.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()

                let link = e.target
                let index = this.sliderPagination.links.indexOf(link)

                this.slideTo(index)
                this.sliderPagination.didClickOnLink(link)
            }, false)
        })

        // Init SliderDragging
        this.sliderDragging.init()
        // EventListener on sliderDragging to auto slide to next item
        this.sliderDragging.el.addEventListener('draggedToNextEvent', () => {
            console.log('draggedToNext')
            this.slideAfterDrag()
        })
        // EventListener on sliderDragging to auto slide back to current item
        this.sliderDragging.el.addEventListener('mouseUpEvent', () => {
            this.slideTo(this.getCurrentIndex(), false)
        })

        window.addEventListener('resize', () => {
            this.resize()
            this.sliderDragging.resize()
        })
    }

    changeBreakpoint () {
        this.items.forEach(item => {
            item.style = ''
        })

        // From mobile to other resolutions / From tablet to mobile
        if (mediaQueryManager.previousBreakpoint === 'mobile') {
            let selectedItem = this.items[this.selectedIndex]
            this.selectItemsToCopy(selectedItem)
            this.update('updateOnBreakpointChange')
            this.sliderLeft = 122 // sliderLeft for tablet resolution
            this.didSlideTo(this.selectedIndex)
        } else if (mediaQueryManager.previousBreakpoint === 'tablet' && mediaQueryManager.currentBreakpoint === 'mobile') {
            this.el.style = ''
        }
    }

    resize () {
        this.sliderLeft = this.el.offsetLeft

        this.sliderPagination.resize()
    }

    slideTo (index, animateText = true) {
        if (index >= 0 && index < this.items.length) {
            let selectedItem = this.items[index]

            let didClickOnPaginationLinkEvent = new window.CustomEvent('didClickOnPaginationLink', {'detail': index})
            this.el.dispatchEvent(didClickOnPaginationLinkEvent)

            if (mediaQueryManager.currentBreakpoint == 'mobile') {
                this.slideAnimationMobile(index)
            } else {
                this.selectItemsToCopy(selectedItem)

                this.updateItemsInterval = window.setInterval(() => {
                    this.update()
                }, 100)

                let offsetLeft = selectedItem.offsetLeft
                TweenLite.to(this.el, 0.7, {
                    left: -offsetLeft + this.sliderLeft,
                    ease: Power3.easeOut,
                    onComplete: () => {
                        this.didSlideTo(index)
                    }
                })

                if (animateText) {
                    this.animateText()
                }
            }
        }
    }

    slideAnimationMobile (index) {
        TweenLite.to(this.el, 0.3, {
            opacity: 0,
            ease: Power3.easeOut,
            onComplete: () => {
                this.items.forEach(item => {
                    item.style.display = 'none'
                })
                this.items[index].style.display = 'inline-block'

                this.selectedIndex = index
            }
        })
        TweenLite.to(this.el, 0.3, {
            delay: 0.3,
            opacity: 1,
            ease: Power3.easeIn
        })

        this.animateText()
    }

    selectItemsToCopy (selectedItem) {
        let items = this.getCurrentItemsList()
        let index = items.indexOf(selectedItem)

        for (let i = 0; i < items.length && i < index; i++) {
            let item = items[i]

            let itemToCopy = {
                'copied': false,
                'el': item,
                'copy': null
            }
            this.itemsToCopy.push(itemToCopy)
        }
    }

    update (updateOnBreakpointChange = false) {
        for (let i = 0; i < this.itemsToCopy.length; i++) {
            let itemToCopy = this.itemsToCopy[i]

            if (!itemToCopy.copied) {
                let el = itemToCopy.el

                if (Math.round(el.getBoundingClientRect().left + el.offsetWidth) <= this.sliderContainer.offsetLeft || updateOnBreakpointChange) {
                    itemToCopy.copy = el.cloneNode(true)
                    this.el.appendChild(itemToCopy.copy)
                    itemToCopy.copied = true
                }
            }
        }
    }

    slideAfterDrag () {
        let firstItem = [...document.querySelectorAll('.projects-slider__item')][0]
        let index = parseInt(firstItem.dataset.index) + 1

        // Back to first item
        if (index === this.items.length) {
            index = 0
        }

        this.slideTo(index)
    }

    didSlideTo (index) {
        window.clearInterval(this.updateItemsInterval)

        this.itemsToCopy.forEach(itemToCopy => {
            if (itemToCopy.copied) {
                itemToCopy.el.remove()
                this.items[itemToCopy.el.dataset.index] = itemToCopy.copy
            }
        })
        this.itemsToCopy = []

        this.el.style.left = this.sliderLeft + 'px'
        this.sliderDragging.refItem = this.getFirstItem()

        this.selectedIndex = index
    }

    animateText () {
        let textLeftX = 238

        if (mediaQueryManager.currentBreakpoint === 'mobile') {
            textLeftX = 5 * window.innerWidth / 100
        } else if (mediaQueryManager.currentBreakpoint === 'tablet') {
            textLeftX = -18 * window.innerWidth / 100
        } else if (mediaQueryManager.currentBreakpoint === 'small-desktop') {
            textLeftX = -15.5 * window.innerWidth / 100
        } else {
            textLeftX = (-23 * window.innerWidth / 100) + ((window.innerWidth - 1200) / 2)
        }

        for (let text of this.texts) {
            if (mediaQueryManager.currentBreakpoint === 'mobile') {
                if (text.dataset.index == 1) {
                    text.style.top = document.querySelector('.projects-slider__text[data-index="0"]').offsetTop + 'px'
                }
            }

            let index = text.dataset.index
            TweenLite.to(text, 0.7, {
                left: textLeftX,
                opacity: index, /* First text (index 0) to opacity 0, second (index 1) to 1 */
                ease: Power3.easeOut,
                onComplete: () => {
                    // Inverse data-index value
                    if (index === '0') {
                        text.dataset.index = '1'
                    } else {
                        text.dataset.index = '0'
                    }

                    // Set reversedTexts to true if first element has index 1
                    if (this.texts[0].dataset.index == '1') {
                        this.reversedTexts = true
                    } else {
                        this.reversedTexts = false
                    }

                    // Unset style elements
                    text.removeAttribute('style')

                    // Dispatch completed animation event
                    this.el.dispatchEvent(this.animationTextCompletedEvent)
                }
            })
        }
    }

    getFirstItem () {
        let items = this.getCurrentItemsList()

        if (items.length > 0) {
            return items[0]
        }

        return null
    }

    getCurrentItemsList () {
        let items = [...document.querySelectorAll('.projects-slider__item')]

        return items
    }

    getCurrentIndex () {
        let items = [...document.querySelectorAll('.projects-slider__item')]
        let index = -1

        if (items.length > 0) {
            index = parseInt(items[0].dataset.index)
        }

        return index
    }

}
