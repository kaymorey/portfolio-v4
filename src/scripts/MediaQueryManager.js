import Emitter from './Emitter'

const BREAKPOINTS = [
    {
        'name': 'mobile',
        'content': '(max-width: 768px)'
    },
    {
        'name': 'tablet',
        'content': '(min-width: 769px) and (max-width: 1024px)'
    },
    {
        'name': 'small-desktop',
        'content': '(min-width: 1025px) and (max-width: 1199px)'
    },
    {
        'name': 'desktop',
        'content': '(min-width: 1200px)'
    }
]

class MediaQueryManager {

    constructor () {
        this.currentBreakpoint = ''
        this.previousBreakpoint = ''
        this.emitter = Emitter

        window.addEventListener('resize', () => {
            this.resizeWindow()
        })

        this.init()
    }

    init () {
        this.setCurrentBreakpoint()
    }

    setCurrentBreakpoint () {
        for (let breakpoint of BREAKPOINTS) {
            if (window.matchMedia(breakpoint.content).matches && this.currentBreakpoint != breakpoint.name) {
                this.previousBreakpoint = this.currentBreakpoint
                this.currentBreakpoint = breakpoint.name
                this.emitter.emit('changeBreakpoint')
            }
        }
    }

    resizeWindow () {
        this.setCurrentBreakpoint()
    }
}

let mediaQueryManager = new MediaQueryManager()
export default mediaQueryManager
