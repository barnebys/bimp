const request = require("request");

module.exports = path =>
  new Promise((resolve, reject) => {
    request({ url: path, encoding: null }, (err, response, file) => {
      if (err || response.statusCode !== 200) {
        return reject(response.message);
      }

      resolve({
        contentType: response.headers["content-type"],
        file
      });
    });
  });
