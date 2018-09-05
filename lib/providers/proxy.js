const request = require("request");

module.exports = path =>
  new Promise((resolve, reject) => {
    request({ url: path, encoding: null }, (err, response, file) => {
      if (err || response.statusCode !== 200) {
        return reject(new Error("Could not fetch image"));
      }

      if (!response.headers["content-type"].startsWith("image")) {
        return reject(new Error("Could not fetch image"));
      }

      resolve({
        contentType: response.headers["content-type"],
        file
      });
    });
  });
