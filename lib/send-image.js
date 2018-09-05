const DEFAULT_MAX_AGE = 86400000;

const sendImage = (req, res, buffer, headers) => {
  const defaultHeaders = {
    "Content-Type": "image/jpg",
    "Cache-Control": "public, max-age=" + DEFAULT_MAX_AGE / 1000
  };

  if (headers && headers["Content-Type"]) {
    defaultHeaders["Content-Type"] = headers["Content-Type"];
  }

  if (headers && headers["Cache-Control"]) {
    defaultHeaders["Cache-Control"] = headers["Cache-Control"];
  }

  headers = defaultHeaders;

  res.writeHead(200, headers);
  buffer.pipe(res);
};

module.exports = sendImage;
