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
app.post('/send-notification', async (req, res) => {
  const { token, title, body, data } = req.body;

  const message = {
    token: "ezxpLE_RRXOYk_pbYkB2iE:APA91bFQX7cSLLhlTRpqnfJNRUHJYjzjIQj75BDrYVMhULP5WHRUklMgdtQiBbizbrV_ambnHiHO_gXTgZfMdKKfIbzqDvBJGqqwU5KFfs98w2fPlz6poDg",
    notification: {
          title: "Notif",
      body: 'This is a Test Notification',
    },
    data: data || {},
  };

  
  try {
    const response = admin.messaging().send(message);
    console.log('تم إرسال الإشعار:', response);
    res.status(200).send({ success: true, messageId: response });
  } catch (error) {
    console.error('فشل الإرسال:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});




app.get('/', (req, res) => {
  res.send('FCM Notification Server is running 🎉');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
