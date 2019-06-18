require("now-env");
const { SECRET, WHITELIST } = process.env;
const { send } = require("micro");
const { parse } = require("url");

const md5 = require("md5");
const sharp = require("sharp");
const decodeUrl = require("decodeurl");

const sendImage = require("./send-image");

const combineTransformers = transformers => (req, res, buffer) => {
  return transformers.reduce((stream, transform) => {
    return transform(parse(req.url, true).query, stream);
  }, sharp(buffer));
};

const createMicroHandle = (provider, transformer, { onError }) => async (
  req,
  res
) => {
  const {
    pathname,
    query: { s }
  } = parse(req.url, true);

  const path = decodeUrl(pathname.substring(1));
  const lastIndex =
    req.url.lastIndexOf("&s=") >= 0
      ? req.url.lastIndexOf("&s=")
      : req.url.lastIndexOf("?s=");
  const signedURL = req.url.slice(0, lastIndex);
  const hash = md5(SECRET + signedURL);
  const whitelistRegEx = new RegExp(WHITELIST, "g");

  if (req.url === "/favicon.ico") {
    return send(res, 204);
  }

  if (!path) {
    return send(res, 404, "Not found");
  }

  if (SECRET && hash !== s && SECRET) {
    const err = new Error("Invalid `signed` value");
    err.statusCode = 400;
    throw err;
  }

  if (WHITELIST && !whitelistRegEx.test(path)) {
    const err = new Error("URL not whitelisted");
    err.statusCode = 400;
    throw err;
  }

  try {
    const { contentType, file } = await provider(path);
    const image = transformer(req, res, file);
    return sendImage(req, res, image, {
      "Content-Type": contentType
    });
  } catch (err) {
    if (onError) {
      return onError(req, res, err);
    } else {
      console.log(err);
      return send(res, 500, "Internal error");
    }
  }
};

module.exports = {
  combineTransformers,
  createMicroHandle
};
