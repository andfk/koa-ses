# koa-ses

A middleware for Koa to receive and handle sns notifications [Amazon SNS](https://aws.amazon.com/sns/) from [Amazon SES](https://aws.amazon.com/ses/).

[![](https://img.shields.io/node/v/koa-ses.svg?style=flat)](https://www.npmjs.com/package/koa-ses)
[![Downloads](https://img.shields.io/npm/dm/koa-ses.svg?style=flat)](https://www.npmjs.com/package/koa-ses)
[![](https://img.shields.io/travis/andfk/koa-ses.svg)](https://www.npmjs.com/package/koa-ses)


## Setup

`npm i koa-ses -S`

## Usage

**Important**: To receive notifications in your koa app you should have configured previously SNS with SES in your AWS account. Check [docs](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/notifications-via-sns.html) for more info.

```js
var koa = require('koa');
var koaSES = require('koa-ses');

var app = koa();

// Create a function that will receive the
// notification data coming from AWS. This is required
var notificationHandler = function * (message){
	// Your own logic to handle the notification
};

app.use(koaSES(notificationHandler, options));
```
With your own implementation sending emails by SES. You need to store the `messageId` in db/somewhere to use it later as the reference in the callback. **Remember the callback receives the `messageId` you previously stored when sending the email for the first time.**


## Callback
This is called when the middleware handles a notification with the following params.

* **messageId**: id of the SES email on AWS.
* **serviceStatus**: SES Status of the email. `['Delivery', 'Bounce', 'Complaint']`
* **from**
* **status**: Simplified status. `['Sent', 'Failed']`
* **destination**
* **timestamp**
* **rawMessage**: Need more data for custom behaviour? get it from here.

## Options

* **path**: Path url to receive SNS http/s notifications. Default: `/ses/notifications`

## Contributing

PR are very welcome to this repo!

## To-do

- [x] Validate signature of notification
- [ ] Improve code, testing and coverage

## Tests

`mocha`

## Support

Please open a github issue if you find a bug or have a question. Thanks.
