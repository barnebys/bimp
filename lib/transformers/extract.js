function getOptions(str) {
  if (!str) {
    return false;
  }

  const options = str.split(",");

  if (options.length === 4) {
    return options;
  }

  return false;
}

const extract = prop => (params, transform) => {
  const options = getOptions(params[prop]);

  if (params[prop] && options) {
    transform.extract({
      left: parseInt(options[0]),
      top: parseInt(options[1]),
      width: parseInt(options[2]),
      height: parseInt(options[3])
    });
  }
  return transform;
};

module.exports = extract;
