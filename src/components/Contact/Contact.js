import Vue from 'vue'

import ContactForm from 'scripts/ContactForm'

import Mixin from 'scripts/Mixin'
import Utils from 'scripts/Utils'

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
            },
            destroyed () {
                this.menu.unSelectItem(this.route)
                this.errors = []
            },
            methods: {
                isValidName: function () {
                    this.errors.push(this.translate('contact.errors.name'))

                    return /[a-z]+$/.test(this.name)
                },
                isValidMessage: function () {
                    this.errors.push(this.translate('contact.errors.message'))
                    let str = this.message.trim()

                    return str.length > 0
                },
                isValidEmail: function () {
                    this.errors.push(this.translate('contact.errors.email'))

                    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(this.email)
                },
                submitForm: function () {
                    this.errors = []

                    if (this.isValidName() && this.isValidMessage() && this.isValidEmail()) {
                        let form = document.querySelector('.contact__form')
                        var data = new window.FormData(form)

                        this.$http.post('/static/send-email.php', data).then(() => {
                            this.success = true
                        }, () => {
                            this.errors.push('contact.errors.submit')
                        })
                    }
                },
                showEmail: function () {
                    let email = 'bonjour@katia-moreira.fr'
                    document.querySelector('.contact__email').href = 'mailto:' + email
                    document.querySelector('.contact__email').innerHTML = email
                }
            }
        })
    }

}
