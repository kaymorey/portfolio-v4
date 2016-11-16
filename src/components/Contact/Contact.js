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
                    contactForm: {}
                }
            },
            mounted () {
                Utils.loadImages().then(() => {
                    Utils.fadeInPage()
                })

                this.contactForm = new ContactForm()
                this.contactForm.init()
            }
        })
    }

}
