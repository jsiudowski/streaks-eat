/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/index.js (Firebase Cloud Function)

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const { building, eventName } = req.body;

  const message = {
    notification: {
      title: `New Event Created: ${eventName}`,
      body: `The event "${eventName}" is in the ${building} building.`,
    },
    token: 'BI2LbVIxDr8lK6G-_3QY884BJG_AcpwTA416c-fFsngIwYdfxk4QCjEvnftA886BbYIM9St5GeLUAhxgggEgbUo ', // This is found in firebases project settings under cloud messaging in the web push certificates spot
  };

  try {
    // Send the message to Firebase Cloud Messaging (FCM)
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    res.status(200).send('Notification sent');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Failed to send notification');
  }
});

