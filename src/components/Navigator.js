let createNavigator = (map) => {
  // @todo add Observer that updates map here!

  /**
   * Returns possible directions from state on
   * each level
   *
   * [
   *    0: {
     *      next: [2],
     *      previous: [1]
     *    },
   *    1: {
     *      next: [1, 1],
     *      previous: false
     *    }
   * ]
   *
   * @param state
   */
  let getDirections = (state) => {
    // for how many directions do we need this?? --> use deepest level of state!
    let elements = map;
    let result = [];
    let intermediateState = [];
    while (state.length > 0) {
      let index = state.shift();
      result.push({
        next: elements[index + 1] !== undefined && intermediateState.concat([index + 1]) || false,
        previous: elements[index - 1] !== undefined && intermediateState.concat([index - 1]) || false
      });

      intermediateState.push(index);
      elements = elements[index].children;
    }

    return result;
  };

  /**
   * Returns if a provided state exists within children.
   * Likely to be called with map.
   *
   * @param {number[]} state
   * @param {Object[]} children where to check for the state
   * @returns {bool}
   */
  let doesStateExist = (state, children) => {
    if (state.length === 0) return true;
    if (children[state[0]] === undefined) return false;

    return doesStateExist(state.slice(1), children[state[0]].children);
  };

  /**
   * Returns state till the level of level, in which
   * change is added to the value.
   *
   * Example:
   *  level = 1
   *  state = [0, 0, 2]
   *  change = 1
   *
   *  Will result in [0, 1]
   *
   * @param number level
   * @param number[] state
   * @param number change
   * @return number[] Resulting array
   */
  let getNextState = (level, state, change) => {
    state[level] += 1;
    return state.slice(0, level);
  };

  return {
    getDirections
  };
};

export default createNavigator;