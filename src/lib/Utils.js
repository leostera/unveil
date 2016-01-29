let defineSafeProperty = function (object, name, value) {
  Object.defineProperty(object, name, {
    value,
    writable: false,
    configurable: false,
    enumerable: false
  });
};

defineSafeProperty(Object.prototype, "toList", function () {
  return Array.isArray(this) && this || [this];
})

defineSafeProperty(Array.prototype, "flatten", function () {
  return this.reduce( function (a,b) {
    return a.concat(Array.isArray(b) && b.flatten() || b)
  }, []);
});

/*
 * useful, taken from ruby's stdlib (but ugly)
 */
defineSafeProperty(Array.prototype, "compact", function () {
  return this.filter((a) => {
    return !(a === null || a === undefined || (a.length !== undefined && a.length === 0));
  });
});

defineSafeProperty(Array.prototype, "equals", function (other) {
  const deepEqual = (a, b) => {
    if(a.length === 0 || b.length === 0) return true;
    return (a[0] === b[0]) && deepEqual(a.slice(1),b.slice(1));
  }

  return this.length === other.length && deepEqual(this, other);
});
