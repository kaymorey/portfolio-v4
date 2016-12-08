import Emitter from './Emitter'

const BREAKPOINTS = [
    {
        'name': 'mobile',
        'type': 'max',
        'value': '768'
    },
    {
        'name': 'tablet',
        'type': 'max',
        'value': '1024'
    },
    {
        'name': 'desktop',
        'type': 'min',
        'value': '1200'
    }
]

class MediaQueryManager {

    constructor () {
        this.currentBreakpoint = ''
        this.emitter = Emitter

        window.addEventListener('resize', () => {
            this.resizeWindow()
        })
    }

    init () {
        this.setCurrentBreakpoint()
    }

    setCurrentBreakpoint () {
        for (let breakpoint of BREAKPOINTS) {
            console.log(breakpoint)
            if (window.matchMedia('(' + breakpoint.type + '-width: ' + breakpoint.value + 'px)') && this.currentBreakpoint != breakpoint.name) {
                this.currentBreakpoint = breakpoint.name
                console.log('coucou')
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
