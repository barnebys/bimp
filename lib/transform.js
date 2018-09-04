require("now-env");
const { SECRET } = process.env;
const { send } = require("micro");
const { parse } = require("url");

const md5 = require("md5");
const sharp = require("sharp");
const encodeUrl = require("encodeurl");
const decodeUrl = require("decodeurl");

const sendImage = require("./sendImage");

const combineTransformers = transformers => (req, res, buffer) => {
  return transformers.reduce((stream, transform) => {
    return transform(parse(req.url, true).query, stream);
  }, sharp(buffer));
};

const createMicroHandle = (provider, transformer) => async (req, res) => {
  const {
    pathname,
    query: { s }
  } = parse(req.url, true);

  const path = decodeUrl(pathname.substring(1));
  const signedURL = req.url.slice(0, req.url.lastIndexOf("&s="));
  const hash = md5(SECRET + signedURL);

  if (req.url === "/favicon.ico") {
    return send(res, 204);
  }

  if (!path) {
    return send(res, 404, "Not found");
  }

  if (hash !== s) {
    const err = new Error("Invalid `signed` value");
    err.statusCode = 400;
    //throw err
  }

  try {
    const { contentType, file } = await provider(path);
    const image = transformer(req, res, file);

    return sendImage(req, res, image, {
      "Content-Type": contentType
    });
  } catch (err) {
    console.log(err);
    send(res, 500, "Internal error");
  }
};

module.exports = {
  combineTransformers,
  createMicroHandle
};
