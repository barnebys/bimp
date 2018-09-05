const padding = prop => (params, transform) => {
  if (params[prop] && parseInt(params[prop])) {
    transform.extend({
      top: parseInt(params[prop]),
      bottom: parseInt(params[prop]),
      left: parseInt(params[prop]),
      right: parseInt(params[prop])
    });
  }
  return transform;
};

module.exports = padding;
