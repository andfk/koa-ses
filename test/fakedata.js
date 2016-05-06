// Data in use comes from AWS SNS Docs (http://docs.aws.amazon.com/sns/latest/dg/SendMessageToHttp.html)
export default {
  "notification" : {
    "Type" : "Notification",
    "MessageId" : "346b626b-4ef9-51c8-8044-2dc84becb074",
    "TopicArn" : "arn:aws:sns:eu-west-1:273330492891:musikdk_email",
    "Message" : "{\"notificationType\":\"Delivery\",\"mail\":{\"timestamp\":\"2016-05-03T19:58:11.925Z\",\"source\":\"no-reply@musik.dk\",\"sourceArn\":\"arn:aws:ses:eu-west-1:273330492891:identity/no-reply@musik.dk\",\"sendingAccountId\":\"273330492891\",\"messageId\":\"0102015478330bd5-9c321a79-2bf1-4da3-b1b0-4c5a88eee0dc-000000\",\"destination\":[\"Manibetinapunk@gmail.com\"]},\"delivery\":{\"timestamp\":\"2016-05-03T19:58:12.830Z\",\"processingTimeMillis\":905,\"recipients\":[\"Manibetinapunk@gmail.com\"],\"smtpResponse\":\"250 2.0.0 OK 1462305492 70si208918wmw.48 - gsmtp\",\"reportingMTA\":\"a6-244.smtp-out.eu-west-1.amazonses.com\"}}",
    "Timestamp" : "2016-05-03T19:58:13.046Z",
    "SignatureVersion" : "1",
    "Signature" : "DifKj056UDkvvEvbynoEsMy5BDc4BD5KwWZ0QitWkZv5C3hWYE/9STOBiHH/TM8EzsXkktB3UW3GwR53YItMcp45l9rhcRiWNfBnuf620PTOaykh8RNBrW4soySPTmQsuWcvSxGYThqDxcA5F+dmWSJZPFsuQkVztuQQwdCaqT6V++HPcCKrg3Qjpns+OoZdez2eQqMu2uuEYEGSwTmhArQ5Zyz8pm1lw3DKn+JB0feN1OzLU+m9E8NjBCvbPCEN09gRyX5PI/1WG4nOWGRKBUIbMUP8VSePblcrE2bS5e6laRP/rBQdBTrlYCIgZCPb2bUnPQO+cQMwUXs+l887KA==",
    "SigningCertURL" : "https://sns.eu-west-1.amazonaws.com/SimpleNotificationService-bb750dd426d95ee9390147a5624348ee.pem",
    "UnsubscribeURL" : "https://sns.eu-west-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:eu-west-1:273330492891:musikdk_email:414b3717-e0b0-4d57-8e25-6d0e3ba131a7"
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
