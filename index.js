const isUrl = require("is-url");

const { combineTransformers, createMicroHandle } = require("./lib/transform");
const { crop, resize } = require("./lib/transformers");
const { proxy } = require("./lib/providers");

module.exports = createMicroHandle(path => {
  if (isUrl(path)) {
    return proxy(path);
  } else {
    return Promise.reject("Not implemented");
  }
}, combineTransformers([crop("crop"), resize("w", "h")]));
