'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// OneSignal v1 API url
var API_URL = 'https://onesignal.com/api/v1';

// The OneSignal Client

var Client = function () {

        /**
         * Creates a new OneSignal client
         * @param  {string} appId      the appId for your app
         * @param  {string} restApiKey the REST API key for your app
         * @return {object} an initialized client
         */
        function Client(appId, restApiKey) {
                (0, _classCallCheck3.default)(this, Client);


                _joi2.default.assert(appId, _joi2.default.string().guid().required(), new Error('`appId` is required'));
                _joi2.default.assert(restApiKey, _joi2.default.string().required(), new Error('`restApiKey` is required'));

                this.appId = appId;
                this.restApiKey = restApiKey;
        }

        /**
         * Sends a notification.
         * @param  {string|object} message the message to display to the recipient
         * @param  {object} options a hash of options to pass to the API
         * @return {object} the response
         */


        (0, _createClass3.default)(Client, [{
                key: 'sendNotification',
                value: function () {
                        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(message, options) {
                                var payload;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                                switch (_context.prev = _context.next) {
                                                        case 0:

                                                                options = options || {};

                                                                // Perform some basic validation
                                                                _joi2.default.assert(message, _joi2.default.alternatives().try(_joi2.default.string(), _joi2.default.object()).required(), new Error('`message` is required'));
                                                                _joi2.default.assert(options, _joi2.default.object());

                                                                // Convert message to object as required by the API
                                                                if (typeof message === 'string') {
                                                                        message = {
                                                                                en: message
                                                                        };
                                                                }

                                                                // Craft the payload
                                                                payload = (0, _assign2.default)({
                                                                        app_id: this.appId,
                                                                        contents: message
                                                                }, options);

                                                                // Make the request

                                                                _context.prev = 5;
                                                                _context.next = 8;
                                                                return _superagent2.default.post(API_URL + '/notifications').set('Authorization', 'Basic ' + this.restApiKey).send(payload);

                                                        case 8:
                                                                return _context.abrupt('return', _context.sent);

                                                        case 11:
                                                                _context.prev = 11;
                                                                _context.t0 = _context['catch'](5);
                                                                throw new Error(_context.t0.response.error.text);

                                                        case 14:
                                                        case 'end':
                                                                return _context.stop();
                                                }
                                        }
                                }, _callee, this, [[5, 11]]);
                        }));

                        function sendNotification(_x, _x2) {
                                return _ref.apply(this, arguments);
                        }

                        return sendNotification;
                }()
        }]);
        return Client;
}();

exports.default = Client;
;