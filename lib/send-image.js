const etag = require("etag");
const DEFAULT_MAX_AGE = 604800;

const sendImage = async (req, res, sharp, headers) => {
  const buffer = await sharp.toBuffer();

  const defaultHeaders = {
    "Content-Type": "image/jpg",
    "Cache-Control": "public, max-age=" + DEFAULT_MAX_AGE,
    "Last-Modified": new Date(),
    ETag: etag(buffer)
  };

  if (headers && headers["Content-Type"]) {
    defaultHeaders["Content-Type"] = headers["Content-Type"];
  }

  if (headers && headers["Cache-Control"]) {
    defaultHeaders["Cache-Control"] = headers["Cache-Control"];
  }

  headers = defaultHeaders;

  res.writeHead(200, headers);
  sharp.pipe(res);
};

module.exports = sendImage;
