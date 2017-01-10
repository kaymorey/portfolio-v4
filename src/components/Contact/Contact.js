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
            },
            methods: {
                isValidName: function () {
                    return /[a-z]+$/.test(this.name)
                },
                isValidEmail: function () {
                    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(this.email)
                },
                isValidMessage: function () {
                    let str = this.message.trim()

                    return str.length > 0
                },
                submitForm: function () {
                    console.log('yop')
                    if (this.isValidName() && this.isValidEmail() && this.isValidMessage()) {
                        // Send email
                        console.log('send mail')
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
