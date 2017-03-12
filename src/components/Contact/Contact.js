import Vue from 'vue'

import Mixin from 'scripts/Mixin'
import Utils from 'scripts/Utils'

import ContactForm from 'scripts/ContactForm'
import TxtType from 'scripts/TxtType'

import './contact.scss'

export default class Contact {

    constructor () {
        this.component = Vue.component('contact', {
            template: require('./contact.html'),
            data () {
                return {
                    name: '',
                    subject: '',
                    email: '',
                    message: '',
                    errors: [],
                    success: false,
                    contactForm: {},
                    rootPage: true,
                    route: ''
                }
            },
            props: ['menu'],
            mounted () {
                this.route = this.$route.name

                Utils.loadImages().then(() => {
                    Utils.fadeInPage().then(() => {
                        this.menu.selectItem(this.route)
                    })
                })

                this.showEmail()
                this.createContactForm()
                this.typeText()
            },
            destroyed () {
                this.menu.unSelectItem(this.route)
                this.errors = []
            },
            methods: {
                isValidName: function () {
                    if (/[a-z]+$/.test(this.name)) {
                        return true
                    }

                    this.errors.push(this.translate('contact.errors.name'))

                    return false
                },
                isValidMessage: function () {
                    let str = this.message.trim()

                    if (str.length > 0) {
                        return true
                    }

                    this.errors.push(this.translate('contact.errors.message'))

                    return false
                },
                isValidEmail: function () {
                    if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(this.email)) {
                        return true
                    }

                    this.errors.push(this.translate('contact.errors.email'))

                    return false
                },
                submitForm: function () {
                    this.errors = []

                    if (this.isValidName() && this.isValidMessage() && this.isValidEmail()) {
                        let button = document.querySelector('.contact__send-container')
                        let underline = document.querySelector('.contact-send__underline')
                        let underlineOver = document.querySelector('.contact-send__underline--over')
                        let input = document.querySelector('.contact-send__input')

                        underline.addEventListener('animationend', (e) => {
                            if (e.animationName === 'expand') {
                                underlineOver.classList.remove('hidden')
                            }
                        })

                        button.classList.remove('button--default')
                        button.classList.add('button--loading')

                        let form = document.querySelector('.contact__form')
                        let data = new window.FormData(form)

                        let startTime = new window.Date().getTime()
                        var elapsedTime = 0

                        this.$http.post('./static/send-email.php', data).then(() => {
                            this.success = true
                            elapsedTime = new window.Date().getTime() - startTime

                            if (elapsedTime < 1000) {
                                window.setTimeout(() => {
                                    input.value = 'Envoyé'
                                    button.classList.remove('button--loading')
                                    button.classList.add('button--success')
                                }, 1000 - elapsedTime)
                            } else {
                                input.value = 'Envoyé'
                                button.classList.remove('button--loading')
                                button.classList.add('button--success')
                            }
                        }, (response) => {
                            console.log(response)
                            this.errors.push(this.translate('contact.errors.submit'))
                        })
                    }
                },
                showEmail: function () {
                    let email = 'bonjour@katia-moreira.fr'
                    document.querySelector('.contact__email').href = 'mailto:' + email
                    document.querySelector('.contact__email').innerHTML = email
                },
                createContactForm: function () {
                    if (Object.keys(this.contactForm).length === 0) {
                        this.contactForm = new ContactForm()
                        this.contactForm.init()
                    }
                },
                typeText: function () {
                    let elements = document.getElementsByClassName('typewrite')

                    for (let i = 0; i < elements.length; i++) {
                        let toRotate = elements[i].getAttribute('data-type')
                        let period = elements[i].getAttribute('data-period')
                        if (toRotate) {
                            let txtType = new TxtType(elements[i], JSON.parse(toRotate), period)
                            txtType.init()
                        }
                    }
                }
            }
        })
    }

}
