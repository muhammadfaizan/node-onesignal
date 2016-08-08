"use strict"
//import Joi from 'joi';
//import Request from 'superagent';
const Joi = require('joi');
const Request = require('superagent');

// OneSignal v1 API url
const API_URL = 'https://onesignal.com/api/v1';


// The OneSignal Client
module.exports= class Client {

    /**
     * Creates a new OneSignal client
     * @param  {string} appId      the appId for your app
     * @param  {string} restApiKey the REST API key for your app
     * @return {object} an initialized client
     */
    constructor(appId, restApiKey) {

        Joi.assert(appId, Joi.string().guid().required(), new Error('`appId` is required'));
        Joi.assert(restApiKey, Joi.string().required(), new Error('`restApiKey` is required'));

        this.appId = appId;
        this.restApiKey = restApiKey;
    }

    /**
     * Sends a notification.
     * @param  {string|object} message the message to display to the recipient
     * @param  {object} options a hash of options to pass to the API
     * @return {object} the response
     */
    sendNotification(message, options) {

        return new Promise ((resolve, reject) => {
            options = options || {};

            // Perform some basic validation
            Joi.assert(message, Joi.alternatives().try(Joi.string(), Joi.object()).required(), new Error('`message` is required'));
            Joi.assert(options, Joi.object());

            // Convert message to object as required by the API
            if (typeof message === 'string') {
                message = {
                    en: message
                }
            }

            // Craft the payload
            const payload = Object.assign({
                app_id: this.appId,
                contents: message
            }, options);

            // Make the request
            try {
                        console.log(`${API_URL}/notifications`);
                        console.log(`Basic ${this.restApiKey}`);

                        Request
                        .post(`${API_URL}/notifications`)
                        .set('Authorization', `Basic ${this.restApiKey}`)
                        .send(payload)
                        .end((err, res) => {
                            console.log(err, res.data);
                            resolve(res);
                        });
            }
            catch(err) {

                throw new Error(err.response.error.text);
            }
        })
        
    }
};
