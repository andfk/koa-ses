# koa-ses

A middleware for Koa to receive and handle sns notifications [Amazon SNS](https://aws.amazon.com/sns/) from [Amazon SES](https://aws.amazon.com/ses/).

## Setup

`npm i koa-ses -S`

## Usage

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

*Bonus: you can skip response of middleware returning `false` in the callback function.*


## Options

* **path**: Path url to receive SNS http/s notifications. Default: `/ses/notifications`

## Contributing

PR are very welcome to this repo!

## To-do

- [ ] Validate signature of notification

## Tests

`mocha`

## Support

Please open a github issue if you find a bug or have a question. Thanks.
