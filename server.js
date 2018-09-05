require("now-env");
const { NOT_FOUND_IMAGE_URL } = process.env;
const isUrl = require("is-url");
const sharp = require("sharp");
const { send } = require("micro");
const sendImage = require("./lib/send-image");
const { combineTransformers, createMicroHandle } = require("./lib/transform");
const {
  crop,
  trim,
  resize,
  extract,
  padding,
  format,
  background
} = require("./lib/transformers");
const { proxy } = require("./lib/providers");

module.exports = createMicroHandle(
  path => {
    if (isUrl(path)) {
      return proxy(path);
    } else {
      return Promise.reject("Not implemented");
    }
  },
  combineTransformers([
    crop("crop"),
    trim("trim"),
    extract("extract"),
    padding("pad"),
    resize("w", "h"),
    background("bg"),
    format("format")
  ]),
  {
    onError: async (req, res, err) => {
      if (NOT_FOUND_IMAGE_URL) {
        const { contentType, file } = await proxy(NOT_FOUND_IMAGE_URL);
        const image = sharp(file);
        return sendImage(req, res, image, {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=" + 60
        });
      } else {
        console.log(err);
        return send(res, 500, "Internal error");
      }
    }
  }
);
