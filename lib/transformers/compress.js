const compress = () => (params, transform) => {
  transform.png({ compressionLevel: 9, adaptiveFiltering: true });
  return transform;
};

module.exports = compress;
