import TweenLite from 'gsap'

export default class SliderDragging {

    constructor (el, slider, refItem) {
        this.el = el
        this.slider = slider
        /* It would be better to calculate it only once (also used in Slider.js) */
        this.sliderLeft = this.slider.offsetLeft
        this.refItem = refItem
        this.draggingStarted = false

        let draggedToNextEvent = new window.Event('draggedToNextEvent')
        let mouseupEvent = new window.Event('mouseUpEvent')

        this.stoppedDraggingReasons = {
            DRAGGEDTONEXT: 0,
            MOUSEUP: 1
        }
        this.stoppedDraggingEvents = {
            DRAGGEDTONEXT: draggedToNextEvent,
            MOUSEUP: mouseupEvent
        }
    }

    init () {
        // Mousedown on element -> start dragging
        this.el.addEventListener('mousedown', (e) => {
            this.startDragging(e)
        })
        // Mousemove on element -> dragging
        this.el.addEventListener('mousemove', (e) => {
            this.dragging(e)
        })
        // Mouseup on element -> stop dragging
        this.el.addEventListener('mouseup', () => {
            this.stopDragging(this.stoppedDraggingReasons.MOUSEUP)
        })
        // Mouseleave element -> stop dragging
        this.el.addEventListener('mouseleave', () => {
            this.stopDragging(this.stoppedDraggingReasons.MOUSEUP)
        })
        // Mouseleave document -> stop dragging
        document.addEventListener('mouseleave', () => {
            this.stopDragging(this.stoppedDraggingReasons.MOUSEUP)
        })
    }

    startDragging (e) {
        e.preventDefault()

        this.draggingStarted = true
        this.initialMouseX = e.clientX
        this.initialElX = this.el.offsetLeft
        this.initialSliderX = this.slider.offsetLeft
    }

    dragging (e) {
        if (this.draggingStarted) {
            this.mouseX = e.clientX
            this.el.style.left = this.initialElX - (this.initialMouseX - this.mouseX) + 'px'
            this.slider.style.left = this.initialSliderX - (this.initialMouseX - this.mouseX) + 'px'
            if (this.slider.offsetLeft * -1 >= this.refItem.offsetWidth / 2.5) {
                this.stopDragging(this.stoppedDraggingReasons.DRAGGEDTONEXT)
            }
        }
    }

    stopDragging (stoppedDraggingReason) {
        if (this.draggingStarted) {
            this.draggingStarted = !this.draggingStarted
            this.animateDraggingIconBackToPlace()

            if (stoppedDraggingReason === this.stoppedDraggingReasons.DRAGGEDTONEXT) {
                this.el.dispatchEvent(this.stoppedDraggingEvents.DRAGGEDTONEXT)
            } else {
                this.el.dispatchEvent(this.stoppedDraggingEvents.MOUSEUP)
            }
        }
    }

    animateDraggingIconBackToPlace () {
        TweenLite.to(this.el, 0.25, {
            opacity: 0,
            onComplete: () => {
                this.el.remove()
                this.el.style.left = this.initialElX + 'px'
                document.querySelector('.projects__slider-list-container').appendChild(this.el)
                this.el.dataset.dragged = true
                TweenLite.to(this.el, 0.25, {
                    opacity: 1,
                    onComplete: () => {
                        this.el.dataset.dragged = false
                    }
                })
            }
        })
    }
}
