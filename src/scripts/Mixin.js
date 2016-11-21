import DataLoader from './DataLoader'

export default {
    data () {
        return {
            sliderToProject: false,
            projectToSlider: false
        }
    },
    created () {
        if (this.rootPage) {
            if (window.sessionStorage.getItem('navigateFrom') === 'home' && this.$route.name == 'project') {
                this.sliderToProject = true
            }

            this.projectToSlider = true

            // if (window.sessionStorage.getItem('navigateFrom') === 'project' && this.$route.name == 'home') {
            //     this.projectToSlider = true
            // }
        }
    },
    beforeDestroy () {
        if (this.rootPage) {
            if (window.sessionStorage.getItem('navigateFrom') !== 'home' && this.rootPage) {
                this.resetOpacityPage()
            }
            if (this.menu) {
                this.menu.unselectAllItems()
            }

            window.sessionStorage.setItem('navigateFrom', 'unknown')
        }
    },
    methods: {
        imagePath: function (path, slug = '') {
            if (path) {
                if (slug) {
                    return require('assets/images/projects/' + slug + '/' + path)
                } else {
                    return require('assets/images/' + path)
                }
            }
        },
        lazyImagePath: function (path, slug = '') {
            let image = {
                src: this.imagePath(path, slug)
            }

            return image
        },
        videoPath: function (path, slug) {
            if (slug) {
                return require('assets/videos/projects/' + slug + '/' + path)
            }
        },
        imagesLoaded: function (images, callback) {
            if (images && images.length > 0) {
                let src = images[0]

                let image = new window.Image()
                image.src = src
                image.onload = () => {
                    images = images.slice(1)
                    this.imagesLoaded(images, callback)
                }
            } else {
                callback()
            }
        },
        resetOpacityPage: function () {
            let header = document.querySelector('header.header')
            let container = document.getElementById('main-container')

            header.style.opacity = ''
            header.classList.remove('visible')

            container.style.opacity = ''
            container.classList.remove('visible')
        }
    }
}
