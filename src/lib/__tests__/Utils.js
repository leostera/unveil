jest.dontMock('../Utils')

require('../Utils')

describe("Utils", () => {

  describe("Object.prototype.toList", () => {

    it("returns a list from an object, containing the object", () => {
      const a = {}
      const b = [{}]
      expect(a.toList()).toEqual(b)
      expect(a.toList()).not.toEqual(a)
    })

    it("returns itself if the object already is a list", () => {
      const a = []
      const b = []
      const c = [[]]
      expect(a.toList()).toEqual(b)
      expect(a.toList()).not.toEqual(c)
    })

  })

  describe("Array.prototype.compact", () => {

    it("removes all null values", () => {
      const a = [1, null]
      const b = [1]
      expect(a.compact()).toEqual(b)
    })

    it("removes all undefined values", () => {
      const a = [1, undefined]
      const b = [1]
      expect(a.compact()).toEqual(b)
    })

    it("removes all empty strings values", () => {
      const a = [1, ""]
      const b = [1]
      expect(a.compact()).toEqual(b)
    })

  })

  describe("Array.prototype.flatten", () => {

    it("flattens an array", () => {
      const a = [1,[2,3]]
      const b = [1,2,3]
      expect(a.flatten()).toEqual(b)
    })

    it("flattens an array recursively", () => {
      const a = [1,[2,[3]]]
      const b = [1,2,3]
      expect(a.flatten()).toEqual(b)
    })

  })

  describe("Array.prototype.equals", () => {

    it("fails on different length arrays", () => {
      const a = [1,2]
      const b = [1,2,3]
      expect(a.equals(b)).toEqual(false)
    })

    it("succeeds when arrays have equal length and elements", () => {
      const a = [1,2,3]
      const b = [1,2,3]
      expect(a.equals(b)).toEqual(true)
    })

    it("fails when arrays have equal length but different elements", () => {
      const a = [1,2,3]
      const b = [1,2,5]
      expect(a.equals(b)).toEqual(false)
    })

    it("fails when arrays have equal length but differently positioned elements", () => {
      const a = [1,2,3]
      const b = [1,3,2]
      expect(a.equals(b)).toEqual(false)
    })

  })

})
