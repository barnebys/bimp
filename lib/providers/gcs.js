require("now-env");
const { Storage } = require("@google-cloud/storage");
const fileType = require("file-type");

module.exports = path =>
  new Promise(async (resolve, reject) => {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID
    });

    storage
      .bucket(process.env.GCP_BUCKET)
      .file(path)
      .download()
      .then(data => {
        const file = data[0];
        const { mime } = fileType(file);
        if (!mime.startsWith("image")) {
          return reject(new Error("File is not an image"));
        }
        resolve({
          contentType: mime,
          file
        });
      })
      .catch(err => {
        return reject(new Error("Could not find key"));
      });
  });
