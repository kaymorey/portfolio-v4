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
        this.isSliding = false

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
        this.sliderPagination.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                let index = this.sliderPagination.links.indexOf(link)

                this.slideTo(index)
            }, false)
        })

        // Init SliderDragging
        this.sliderDragging.init()
        // EventListener on sliderDragging to auto slide to next item
        this.sliderDragging.el.addEventListener('draggedToNextEvent', () => {
            this.slideAfterDrag()
        })
        // EventListener on sliderDragging to auto slide back to current item
        this.sliderDragging.el.addEventListener('mouseUpEvent', () => {
            this.slideTo(this.getCurrentIndex(), false)
        })

        // EventListener click on project
        this.addEventListenerOnLinks()

        window.addEventListener('resize', () => {
            this.resize()
            this.sliderDragging.resize()
        })
    }

    addEventListenerOnLinks () {
        let links = [...document.querySelectorAll('.projects-slider__item-link')]
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()

                let items = this.getCurrentItemsList()
                let item = link.parentElement
                let itemIndex = items.indexOf(item)

                if (itemIndex === 0 || mediaQueryManager.currentBreakpoint === 'mobile') {
                    Emitter.emit('didSelectProject', link)
                }
            })
        })
    }

    changeBreakpoint () {
        this.items.forEach(item => {
            item.style = ''
        })

        // From mobile to other resolutions / From tablet to mobile
        if (mediaQueryManager.previousBreakpoint === 'mobile') {
            let selectedItem = this.items[this.selectedIndex]
            this.copyNextItems(selectedItem)
            this.update('updateOnBreakpointChange')
            this.sliderLeft = 122 // sliderLeft for tablet resolution
            this.didSlideToNext(this.selectedIndex)
        } else if (mediaQueryManager.previousBreakpoint === 'tablet' && mediaQueryManager.currentBreakpoint === 'mobile') {
            this.el.style = ''
        }
    }

    resize () {
        this.sliderLeft = this.el.offsetLeft

        this.sliderPagination.resize()
    }

    slideTo (index, animateText = true) {
        if (index >= 0 && index < this.items.length && !this.isSliding) {
            this.isSliding = true
            let selectedItem = this.items[index]

            let didClickOnPaginationLinkEvent = new window.CustomEvent('didClickOnPaginationLink', {'detail': index})
            this.el.dispatchEvent(didClickOnPaginationLinkEvent)
            Emitter.emit('didClickOnPaginationLink', index)

            if (mediaQueryManager.currentBreakpoint == 'mobile') {
                this.slideAnimationMobile(index)
            } else {
                if (index < this.selectedIndex && this.selectedIndex - index < this.items.length / 2) {
                    this.slideToPrevElmt(index)

                    if (animateText && index !== this.selectedIndex) {
                        this.animateText('prev')
                    }
                } else {
                    this.slideToNextElmt(index)

                    if (animateText && index !== this.selectedIndex) {
                        this.animateText()
                    }
                }
            }
        }
    }

    slideToNextElmt (index) {
        let selectedItem = this.items[index]

        // Select items to copy
        this.copyNextItems(selectedItem)

        // Remove hidden items on left while sliding
        this.updateItemsInterval = window.setInterval(() => {
            this.updateWhileSlidingNext()
        }, 100)

        // Sliding animation
        let offsetLeft = selectedItem.offsetLeft
        TweenLite.to(this.el, 0.7, {
            left: -offsetLeft + this.sliderLeft,
            ease: Power3.easeOut,
            onComplete: () => {
                this.didSlideToNext(index)
            }
        })
    }

    slideToPrevElmt (index) {
        let selectedItem = this.items[index]

        // Select items to copy
        this.copyPrevItems(selectedItem)
        let firstItem = this.getFirstItem()

        // Insert copied items at the beginning
        for (let i = 0; i < this.itemsToCopy.length; i++) {
            this.el.insertBefore(this.itemsToCopy[i], this.el.firstChild)
        }
        this.itemsToCopy = []

        // Sliding animation
        this.el.style.left = -firstItem.offsetLeft + this.sliderLeft + 'px'
        TweenLite.to(this.el, 0.7, {
            left: this.sliderLeft,
            ease: Power3.easeOut,
            onComplete: () => {
                this.didSlideToPrev(index)
            }
        })
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
                this.isSliding = false
            }
        })
        TweenLite.to(this.el, 0.3, {
            delay: 0.3,
            opacity: 1,
            ease: Power3.easeIn
        })

        this.animateText()
    }

    copyNextItems (selectedItem) {
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

    copyPrevItems (selectedItem) {
        let items = this.getCurrentItemsList()

        let currentItemIndex = this.getCurrentIndex()
        let selectedIndex = selectedItem.dataset.index

        let nbItemsToCopy = currentItemIndex - selectedIndex
        let nbItems = items.length
        let copies = []

        for (let i = 1; i <= nbItemsToCopy; i++) {
            let itemToCopy = items[nbItems - i]
            let copy = itemToCopy.cloneNode(true)
            this.itemsToCopy.push(itemToCopy)
        }

        for (let i = 1; i <= nbItemsToCopy; i++) {
            items[nbItems - i].remove()
        }
    }

    updateWhileSlidingNext (updateOnBreakpointChange = false) {
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

    didSlideToNext (index) {
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
        this.addEventListenerOnLinks()
        this.isSliding = false
    }

    didSlideToPrev (index) {
        this.sliderDragging.refItem = this.getFirstItem()
        this.selectedIndex = index
        this.addEventListenerOnLinks()
        this.isSliding = false
    }

    animateText (prev = false) {
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
            let ease = Power3.easeOut
            if (index == 1) {
                ease = Power3.easeIn
            }

            if (index === '1' && prev !== false) {
                text.style.left = textLeftX - 200 + 'px'
            }

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
