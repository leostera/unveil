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

  /**
   * Returns the indices of the state when moving
   * on level level if move is possible, else false.
   *
   * @param {number} level level at which to move
   * @param {number[]} state current state
   * @returns {number[]|false} indices of next state or
   *                           false if there is no next
   */
  let getNewIndices = (level, state, change) => {
    if (level < 0) return false;

    let nextState = getNextState(level, state, change);
    return doesStateExist(nextState, map) && nextState || getNext(level - 1, nextState);
  };

  /**
   * Returns the indices of the next state when moving
   * on level level if the move is possible, else false.
   *
   * @param {number} level level at which to move
   * @param {number[]} state current state
   * @returns {number[]|false} indices of next state or
   *                           false if there is no next
   */
  let getNext = (level, state) => {
    return getNewIndices(level, state, +1);
  };

  /**
   * Returns the indices of the previous state when moving
   * on level `level` if the move is possible, else false.
   *
   * @param {number} level level at which to move
   * @param {number[]} state current state
   * @returns {number[]|false} indices of next state or
   *                           false if there is no next
   */
  let getPrevious = (level, state) => {
    return getNewIndices(level, state, -1);
  };

  return {
    getDirections
  };
};

export default createNavigator;