const sharp = require("sharp");

function mode(string) {
  if (!!sharp.gravity[string]) {
    return sharp.gravity[string];
  }

  if (!!sharp.strategy[string]) {
    return sharp.strategy[string];
  }

  return "center";
}

const crop = prop => (params, transform) => {
  if (params[prop]) {
    transform.crop(mode(params[prop]));
  }
  return transform;
};

module.exports = crop;
