var admin = require("firebase-admin");

var serviceAccount = require("./backend-coderhouse-e6acd-firebase-adminsdk-xq4rd-08d4127351.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
