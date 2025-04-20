const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const serviceAccount = require('./service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());


// نقطة إرسال إشعار
app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  
  const message = {
    notification: {
      title: "Notif",
      body: 'This is a Test Notification'
    },
    token: "ezxpLE_RRXOYk_pbYkB2iE:APA91bFQX7cSLLhlTRpqnfJNRUHJYjzjIQj75BDrYVMhULP5WHRUklMgdtQiBbizbrV_ambnHiHO_gXTgZfMdKKfIbzqDvBJGqqwU5KFfs98w2fPlz6poDg",
  };
  
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
  
});




app.get('/', (req, res) => {
  res.send('FCM Notification Server is running 🎉');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
