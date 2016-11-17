import Vue from 'vue'

import ContactForm from 'scripts/ContactForm'

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
                    contactForm: {}
                }
            },
            mounted () {
                Utils.loadImages().then(() => {
                    Utils.fadeInPage()
                })

                this.contactForm = new ContactForm()
                this.contactForm.init()
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
                }
            }
        })
    }

}
