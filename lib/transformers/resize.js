const resize = (widthProp, heightProp) => (params, transform) => {
  const w = params[widthProp];
  const h = params[heightProp];

  if (w || h) {
    transform.resize(w && parseInt(w), h && parseInt(h));
  }

  return transform;
};

module.exports = resize;
