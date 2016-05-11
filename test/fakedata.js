// Data in use comes from AWS SNS Docs with some modifications (http://docs.aws.amazon.com/sns/latest/dg/SendMessageToHttp.html)
export default {
  "notification" : {
    "Type" : "Notification",
    "MessageId" : "da41e39f-ea4d-435a-b922-c6aae3915ebe",
    "TopicArn" : "arn:aws:sns:us-west-2:123456789012:MyTopic",
    "Message" : "{\"notificationType\":\"Delivery\",\"mail\":{\"timestamp\":\"2012-04-25T21:49:25.719Z\",\"source\":\"no-reply@noreply.com\",\"sourceArn\":\"arn:aws:sns:us-west-2:123456789012:MyTopic\",\"sendingAccountId\":\"100000000000\",\"messageId\":\"06024413478330bd5-gc321a79-2bfa-4da3-b1b0-4e5a88eee0dc-000000\",\"destination\":[\"no-reply@noreply.com\"]},\"delivery\":{\"timestamp\":\"2012-04-25T21:49:25.719Z\",\"processingTimeMillis\":905,\"recipients\":[\"no-reply@noreply.com\"],\"smtpResponse\":\"250 2.0.0 OK 4124145 ag412415.48 - gsmtp\",\"reportingMTA\":\"a8-345.smtp-out.eu-west-1.amazonses.com\"}}",
    "Timestamp" : "2012-04-25T21:49:25.719Z",
    "SignatureVersion" : "1",
    "Signature" : "EXAMPLElDMXvB8r9R83tGoNn0ecwd5UjllzsvSvbItzfaMpN2nk5HVSw7XnOn/49IkxDKz8YrlH2qJXj2iZB0Zo2O71c4qQk1fMUDi3LGpij7RCW7AW9vYYsSqIKRnFS94ilu7NFhUzLiieYr4BKHpdTmdD6c0esKEYBpabxDSc=",
    "SigningCertURL" : "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-f3ecfb7224c7233fe7bb5f59f96de52f.pem",
    "UnsubscribeURL" : "https://sns.us-west-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-west-2:123456789012:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55"
  },
  "suscription" : {
    "Type" : "SubscriptionConfirmation",
    "MessageId" : "165545c9-2a5c-472c-8df2-7ff2be2b3b1b",
    "Token" : "2336412f37fb687f5d51e6e241d09c805a5a57b30d712f794cc5f6a988666d92768dd60a747ba6f3beb71854e285d6ad02428b09ceece29417f1f02d609c582afbacc99c583a916b9981dd2728f4ae6fdb82efd087cc3b7849e05798d2d2785c03b0879594eeac82c01f235d0e717736",
    "TopicArn" : "arn:aws:sns:us-west-2:123456789012:MyTopic",
    "Message" : "You have chosen to subscribe to the topic arn:aws:sns:us-west-2:123456789012:MyTopic.\nTo confirm the subscription, visit the SubscribeURL included in this message.",
    "SubscribeURL" : "https://sns.us-west-2.amazonaws.com/?Action=ConfirmSubscription&TopicArn=arn:aws:sns:us-west-2:123456789012:MyTopic&Token=2336412f37fb687f5d51e6e241d09c805a5a57b30d712f794cc5f6a988666d92768dd60a747ba6f3beb71854e285d6ad02428b09ceece29417f1f02d609c582afbacc99c583a916b9981dd2728f4ae6fdb82efd087cc3b7849e05798d2d2785c03b0879594eeac82c01f235d0e717736",
    "Timestamp" : "2012-04-26T20:45:04.751Z",
    "SignatureVersion" : "1",
    "Signature" : "EXAMPLEpH+DcEwjAPg8O9mY8dReBSwksfg2S7WKQcikcNKWLQjwu6A4VbeS0QHVCkhRS7fUQvi2egU3N858fiTDN6bkkOxYDVrY0Ad8L10Hs3zH81mtnPk5uvvolIC1CXGu43obcgFxeL3khZl8IKvO61GWB6jI9b5+gLPoBc1Q=",
    "SigningCertURL" : "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-f3ecfb7224c7233fe7bb5f59f96de52f.pem"
  }
};
