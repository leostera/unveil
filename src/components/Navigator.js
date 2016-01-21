let createNavigator = () => {
  /**
   * Returns possible directions from state on each level.
   * If we are at state [1, 0] depending on the map, the
   * result might look something like this:
   * [
   *    {
   *      next: [2],
   *      previous: [0]
   *    },
   *    {
   *      next: [1, 1],
   *      previous: false
   *    }
   * ]
   *
   * @param {number[]} state State for which to return the directions
   * @param {*[]} elements Elements to go through
   * @param {number} level Depth of recursion. Defaults to 0
   * @return {[directions]} List of direcitons object
   */
  let getDirections = (state, elements, level = 0) => {
    if (level  === state.length) return [];

    let index = state[level];
    let stateLevel = state.slice(0, level);
    let result = [getDirectionObject(elements, index, stateLevel)];

    return result.concat(getDirections(state, elements[index].children, level + 1));
  };

  /**
   * Builds the direction object for one level.
   *
   * @param {*[]} elements Elements to look into
   * @param {number} index index of state at this level
   * @param {number[]} stateLevel state until level
   *
   * @returns {{next, previous}} object with indices of
   * next and previous indices. See @getIndex
   */
  let getDirectionObject = (elements, index, stateLevel) => {
    return {
      next: getIndex(elements, index + 1, stateLevel),
      previous: getIndex(elements, index - 1, stateLevel)
    }
  };

  /**
   * Returns the new state based on index or false, if
   * the state does not exist
   *
   * @param {*[]} elements
   * @param {number} index
   * @param {number[]} stateLevel state
   * @returns {boolean|number[]} state list or false
   */
  let getIndex = (elements, index, stateLevel) => {
    return elements[index] !== undefined && stateLevel.concat([index]) || false;
  };

  return {
    getDirections
  };
};

export default createNavigator;
