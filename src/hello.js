const request = require('superagent');

const handleResult = (resolve, reject, transform) => (err, r) => {
  if (err) {
    if (r && r.text) return reject(new Error(r.text));
    return reject(new Error('Unknown error'));
  }

  return resolve(transform(r.body));
};

const post = (url, payload, transform = x => x) => {
  return new Promise((resolve, reject) => {
    request.post(url).send(payload)
      .set('Accept', 'application/json')
      .end(handleResult(resolve, reject, transform));
  });
};

const hello = async (event, context, callback) => {
  const { queryStringParameters: { code } } = event;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  const auth_payload = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const { access_token } = await post('https://www.strava.com/oauth/token', { ...auth_payload, code });
  const response = {
    statusCode: 302,
    headers: {
      Location: 'http://localhost:8080/#/my-runs',
      'Set-Cookie': `ac=${access_token};`
    },
  };
  callback(null, response);
};

export default hello;
