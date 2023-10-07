const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('This is 15th Prac');
});

const customPrivateKey = fs.readFileSync('./custom-private-key.pem', 'utf8');
const customCertificate = fs.readFileSync('./custom-certificate.pem', 'utf8');
const customCA = fs.readFileSync('./custom-ca.pem', 'utf8');

const customCredentials = {
  key: customPrivateKey,
  cert: customCertificate,
  ca: customCA
};

const customHttpsServer = https.createServer(customCredentials, app);

customHttpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
