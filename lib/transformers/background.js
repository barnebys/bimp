const sharp = require("sharp");

const background = prop => (params, transform) => {
  if (params[prop]) {
    transform.background(`#${params[prop]}`).flatten();
  } else {
    transform.background({ r: 0, g: 0, b: 0, alpha: 0 });
  }
  return transform;
};

module.exports = background;
