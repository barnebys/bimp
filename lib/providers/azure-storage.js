require("now-env");
const { azure } = require("azure-storage");
const fileType = require("file-type");

module.exports = path =>
  new Promise(async (resolve, reject) => {
    const fileService = azure.createFileService();

    fileService.createReadStream(
      process.env.AZURE_SHARE,
      process.env.AZURE_DIRECTORY,
      path,
      (err, data) => {
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
