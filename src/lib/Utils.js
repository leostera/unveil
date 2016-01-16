Object.prototype.toList = function () {
  return Array.isArray(this) && this || [this];
};

Array.prototype.flatten = function () {
  return this.reduce((a,b) => (a.concat(b)), []);
};

Array.prototype.compact = function () {
  return this.filter((a) => (a !== null && a !== undefined));
};
