const fetch = require('node-fetch');
const { google } = require('googleapis');

require('dotenv').config();

let email = process.env.SERVICE_EMAIL;
let key = process.env.SERVICE_KEY;

if (!email || !key) {
  throw 'Please set the SERVICE_EMAIL and SERVICE_KEY environment variables.';
}

const jwtClient = new google.auth.JWT(email, null, key, ['https://www.googleapis.com/auth/indexing'], null);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    throw err;
  }

  const urls = ['https://rustyrollersrestoration.com/index.html'];

  urls.forEach((url) => {
    const options = {
      method: 'POST',
      // Your options, which must include the Content-Type and auth headers
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokens.access_token,
      },
      // Define contents here. The structure of the content is described in the next step.
      body: JSON.stringify({
        url,
        type: 'URL_UPDATED',
      }),
    };

    fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', options)
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
});
