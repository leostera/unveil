import { Subject } from 'rxjs';

let createNavigator = () => {
  let subject = new Subject();

  let possibleMoves = [];
  let possibleDirections = {};

  /**
   * Maps motion-names to position in directions array
   *
   * @type {{
   *  left: {level: number, direction: string},
   *  up: {level: number, direction: string},
   *  right: {level: number, direction: string},
   *  down: {level: number, direction: string}
   * }}
   */
  let motions = {
    left:  { level: 0, direction: 'previous' },
    up:    { level: 1, direction: 'previous' },
    right: { level: 0, direction: 'next' },
    down:  { level: 1, direction: 'next' }
  };

  /**
   * Sets the currently possible moves and
   * re-calculates possible directions.
   *
   * @param {*[]} moves
   */
  let setPossibleMoves = (moves) => {
    possibleMoves = moves;
    calculatePossibleDirections();
  };

  /**
   * Calculates possible directions based on
   * possibleMoves
   */
  let calculatePossibleDirections = () => {
    let reduce  = (result, name) => {
      let motion = motions[name];
      result[name] = !!(possibleMoves[motion.level] && possibleMoves[motion.level][motion.direction]);
      return result;
    };

    possibleDirections = getDirectionNames().reduce(reduce, {});
  };

  /**
   * Get motion display names
   * @returns {string[]} Array of possible motions (left, right, down, up)
   */
  let getDirectionNames = () => {
    return Object.keys(motions);
  };

  /**
   * Is direction possible?
   * @param {string} direction
   * @returns {boolean}
   */
  let isDirectionPossible = (direction) => {
    return !!possibleDirections[direction];
  };

  /**
   * Is state valid?
   * Tests if state is an array.
   * @param {*} state
   * @returns {boolean}
   */
  let isValidState = (state) => {
    return Array.isArray(state);
  };

  /**
   * Get level and direction for motion-string
   * @param {string} direction
   * @returns {level, direction}
   */
  let toLevelAndDirection = (direction) => {
    return motions[direction];
  };

  /**
   * Returns new state from motion
   * @param {level, direction} motion
   * @returns {number[]|false}
   */
  let toState = (direction) => {
    let motion = toLevelAndDirection(direction);
    return possibleMoves[motion.level] && possibleMoves[motion.level][motion.direction];
  };

  /**
   * Pushes new state to subject if state is valid.
   * @param {*} newState
   */
  let pushNewState = (newState) => {
    if(isValidState(newState)) {
      subject.next(newState);
    }
  };

  /**
   * Calculates new state from direction (left/right/up/down)
   * and if valid, pushes the new state to the subject.
   * @param {string} direction
   */
  let move = (direction) => {
    if (!isDirectionPossible(direction)) return;
    pushNewState(toState(direction));
  };

  /**
   * If valid, pushes a new state to the subject.
   * @param {number[]} newState
   */
  let go = (newState) => {
    pushNewState(newState);
  };

  /**
   * Get subject to observe navigator changes
   * @returns {*}
   */
  let asObservable = () => {
    return subject;
  };

  return {
    asObservable,
    setPossibleMoves,
    isDirectionPossible,
    getDirectionNames,
    move,
    go
  }
};

export default createNavigator;