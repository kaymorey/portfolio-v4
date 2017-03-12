export default class ContactForm {

    constructor () {
        this.textarea = document.querySelector('.contact__textarea')
        this.textareaLines = document.querySelector('.contact__textarea-lines')
        this.textareaMinHeight = '205'
    }

    init () {
        // this.setTextareaMinHeight()
        // this.adjustTextareaHeight(this.textareaMinHeight)

        // this.textarea.addEventListener('focus', () => {
        //     this.textareaLines.style.opacity = 0
        // })

        // this.textarea.addEventListener('blur', () => {
        //     if (this.textarea.value == '') {
        //         this.textareaLines.style.opacity = 1
        //     }
        // })

        // this.textarea.addEventListener('input', () => {
        //     this.adjustTextareaHeight(this.textareaMinHeight)
        // })

        // window.addEventListener('resize', () => {
        //     this.setTextareaMinHeight()
        // })
    }

    setTextareaMinHeight () {
        if (window.innerWidth > 768 && this.textareaMinHeight !== 205) {
            this.textareaMinHeight = 205
            this.adjustTextareaHeight(this.textareaMinHeight)
        } else if (this.textareaMinHeight !== 154) {
            this.textareaMinHeight = 154
            this.adjustTextareaHeight(this.textareaMinHeight)
        }
    }

    adjustTextareaHeight (minHeight) {
        // compute the height difference which is caused by border and outline
        var outerHeight = window.parseInt(window.getComputedStyle(this.textarea).height, 10)
        var diff = outerHeight - this.textarea.clientHeight

        // set the height to 0 in case of it has to be shrinked
        this.textarea.style.height = 0

        // set the correct height
        // el.scrollHeight is the full height of the content, not just the visible part
        this.textarea.style.height = Math.max(minHeight, this.textarea.scrollHeight + diff) + 'px'
    }

}
