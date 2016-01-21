Object.prototype.toList = function () {
  return Array.isArray(this) && this || [this];
};

Array.prototype.flatten = function () {
  return this.reduce( function (a,b) {
    return a.concat(Array.isArray(b) && b.flatten() || b)
  }, []);
};

/*
 * useful, taken from ruby's stdlib (but ugly)
 */
Array.prototype.compact = function () {
  return this.filter((a) => {
    return !(a === null || a === undefined || (a.length !== undefined && a.length === 0));
  });
};

Array.prototype.equals = function (other) {
  return this.length === other.length
    && this
      .map((a, i) => (other[i] === a))
      .reduce((a, b) => (a && b), true);
};
