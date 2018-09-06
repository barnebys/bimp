const request = require("request");
const fileType = require("file-type");

module.exports = path =>
  new Promise((resolve, reject) => {
    request({ url: path, encoding: null }, (err, response, file) => {
      if (err || response.statusCode !== 200) {
        return reject(new Error("Could not fetch image"));
      }

      const { mime } = fileType(file);

      if (!mime.startsWith("image")) {
        return reject(new Error("File is not an image"));
      }

      resolve({
        contentType: mime,
        file
      });
    });
  });
