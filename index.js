const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});



app.use(bodyParser.json());

// نقطة إرسال إشعار
app.post('/send-notification', async (req, res) => {
  const { token, title, body, data } = req.body;

  const message = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: data || {},
  };

  try {
    const response = await admin.messaging().send(message);
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
