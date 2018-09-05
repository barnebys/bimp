const format = prop => (params, transform) => {
  if (
    params[prop] &&
    (params[prop] === "compress" || params[prop] === "compressed")
  ) {
    transform.png({ compressionLevel: 9, adaptiveFiltering: true });
    transform.jpeg({
      quality: 80,
      trellisQuantisation: true,
      overshootDeringing: true,
      optimiseScans: true
    });
  }

  return transform;
};

module.exports = format;
