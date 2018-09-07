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
      quality: 65,
      progressive: false,
      chromaSubsampling: "4:4:4",
      trellisQuantisation: true,
      overshootDeringing: true,
      optimiseScans: true,
      optimiseCoding: true,
      quantisationTable: 0,
      force: false
    });
  }

  return transform;
};

module.exports = format;
