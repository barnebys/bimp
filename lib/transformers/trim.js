const sharp = require("sharp");

const trim = prop => (params, transform) => {
  if (params[prop] && parseInt(params[prop])) {
    transform.trim(parseInt(params[prop]));
  }
  return transform;
};

module.exports = trim;
