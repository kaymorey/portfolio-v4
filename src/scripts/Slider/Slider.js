import {TweenLite, Power3} from 'gsap'
import SliderDragging from './SliderDragging'
import SliderPagination from './SliderPagination'

export default class Slider {

    constructor () {
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
    }

    init () {
        this.sliderDragging.init()
        this.sliderPagination.init()

        this.sliderLeft = this.el.offsetLeft /* /!\ RESPONSIVE /!\ This value may change if window size changes */

        this.sliderPagination.links.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()

                let link = e.target
                let index = this.sliderPagination.links.indexOf(link)

                this.slideTo(index)
                this.sliderPagination.didClickOnLink(link)
            }, false)
        })

        // EventListener on sliderDragging to auto slide to next item
        this.sliderDragging.el.addEventListener('draggedToNextEvent', () => {
            this.slideAfterDrag()
        })

        // EventListener on sliderDragging to auto slide back to current item
        this.sliderDragging.el.addEventListener('mouseUpEvent', () => {
            this.slideTo(this.getCurrentIndex(), false)
        })

        // window.addEventListener('resize', () => {
        //     this.resize()
        // })
    }

    resize () {
    }

    slideTo (index, animateText = true) {
        if (index >= 0 && index < this.items.length) {
            let selectedItem = this.items[index]

            let didClickOnPaginationLinkEvent = new window.CustomEvent('didClickOnPaginationLink', {'detail': index})
            this.el.dispatchEvent(didClickOnPaginationLinkEvent)
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

    update () {
        for (let i = 0; i < this.itemsToCopy.length; i++) {
            let itemToCopy = this.itemsToCopy[i]

            if (!itemToCopy.copied) {
                let el = itemToCopy.el

                if (el.getBoundingClientRect().left + el.offsetWidth < this.sliderContainer.offsetLeft) {
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
    }

    animateText () {
        for (let text of this.texts) {
            let index = text.dataset.index
            TweenLite.to(text, 0.7, {
                left: text.offsetLeft - 238, /* /!\ RESPONSIVE /!\ This value may change if window size changes */
                opacity: index, /* First text (index 0) to opacity 0, second (index 1) to 1 */
                ease: Power3.easeOut,
                onComplete: () => {
                    // Inverse data-index value
                    if (index === '0') {
                        text.dataset.index = '1'
                        text.style.left = '60px' /* /!\ RESPONSIVE /!\ This value may change if window size changes */
                    } else {
                        text.dataset.index = '0'
                    }

                    // Set reversedTexts to true if first element has index 1
                    if (this.texts[0].dataset.index == '1') {
                        this.reversedTexts = true
                    } else {
                        this.reversedTexts = false
                    }

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
