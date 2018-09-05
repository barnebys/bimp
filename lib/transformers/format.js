const format = prop => (params, transform) => {
  if (
    params[prop] &&
    (params[prop] === "compress" || params[prop] === "compressed")
  ) {
    transform.png({
      compressionLevel: 9,
      progressive: false,
      adaptiveFiltering: true,
      force: false
    });
    transform.jpeg({
      quality: 70,
      trellisQuantisation: true,
      overshootDeringing: true,
      optimiseScans: true,
      force: false
    });
  }

  return transform;
};

module.exports = format;
