export default class TxtType {

    constructor (el, toRotate, period) {
        this.toRotate = toRotate
        this.el = el
        this.loopNum = 0
        this.period = parseInt(period, 10) || 2000
        this.txt = ''
        this.isDeleting = false
    }

    init () {
        this.tick()
    }

    tick () {
        let i = this.loopNum % this.toRotate.length
        let fullTxt = this.toRotate[i]

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

        // let delta = 200 - Math.random() * 100
        let delta = 80

        if (this.isDeleting) {
            delta = delta / 2
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period
            this.isDeleting = true
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false
            this.loopNum++
            delta = 500
        }

        setTimeout(() => {
            this.tick()
        }, delta)
    }
}
