const AWS = require("aws-sdk");
const fileType = require("file-type");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

module.exports = path =>
  new Promise(async (resolve, reject) => {
    s3.getObject(
      {
        Bucket: process.env.S3_BUCKET,
        Key: `${process.env.S3_PREFIX}${path}`
      },
      function(err, data) {
        if (err) {
          return reject(new Error("Could not find key"));
        }

        const file = data.Body;
        const { mime } = fileType(file);

        if (!mime.startsWith("image")) {
          return reject(new Error("File is not an image"));
        }

        resolve({
          contentType: mime,
          file
        });
      }
    );
  });
