const sharp = require("sharp");

const resize = (widthProp, heightProp) => (params, transform) => {
  const w = params[widthProp];
  const h = params[heightProp];

  if (w || h) {
    transform.resize(w && parseInt(w), h && parseInt(h), {
      kernel: sharp.kernel.lanczos2
    });
  }

  return transform;
};

module.exports = resize;
