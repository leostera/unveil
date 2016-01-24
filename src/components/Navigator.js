import { Observable, Subject } from 'rxjs';

let createNavigator = (opts) => {
  let { stateObservable } = opts;

  let subject = new Subject();

<<<<<<< HEAD
  let possibleMotions = [];
  let directions = {};
=======
  let possibleMoves = [];
  let possibleDirections = {};
>>>>>>> Extracts MoveCalculator and refactors Navigator

  /**
   * Maps motion-names to position in directions array
   *
<<<<<<< HEAD
   * @type {[
   *  left:  {level: number, direction: string},
   *  up:    {level: number, direction: string},
   *  right: {level: number, direction: string},
   *  down:  {level: number, direction: string}
   * ]}
=======
   * @type {{
   *  left: {level: number, direction: string},
   *  up: {level: number, direction: string},
   *  right: {level: number, direction: string},
   *  down: {level: number, direction: string}
   * }}
>>>>>>> Extracts MoveCalculator and refactors Navigator
   */
  let motions = {
    left:  { level: 0, direction: 'previous' },
    up:    { level: 1, direction: 'previous' },
    right: { level: 0, direction: 'next' },
    down:  { level: 1, direction: 'next' }
  };

<<<<<<< HEAD
  let toPossibleMotions = (directions) => {
    let reduce  = (result, name) => {
      let motion = motions[name];
      result[name] = !!(directions[motion.level] && directions[motion.level][motion.direction]);
      return result;
    };

    return getMotionNames().reduce(reduce, {});
  }

  /**
   * Get motion display names
   * @returns {string[]} Array of possible motions (left, right, down, up)
   */
  let getMotionNames = () => {
    return Object.keys(motions);
  };

  /**
   * Is direction possible?
   * @param {string} direction
   * @returns {boolean}
   */
  let isPossibleMotion = (motion) => {
    return !!possibleMotions[motion];
  };

  let isValidMotion = (motion) => {
    return typeof motion === 'string' &&
      getMotionNames().indexOf(motion.toLowerCase()) !== -1;
  };

  let isJumpMotion = (motion) => {
    return Array.isArray(motion) && motion.reduce( (acc, i) => {
      return acc && !Number.isNaN( Number(i) );
    }, true);
  };

  let toNumericIndices = (motion) => {
    return motion.map( (i) => Number(i) );
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
  let toState = (motion) => {
    return directions[motion.level] && directions[motion.level][motion.direction];
=======
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
>>>>>>> Extracts MoveCalculator and refactors Navigator
  };

  /**
   * Get subject to observe navigator changes
   * @returns {*}
   */
  let asObservable = () => {
<<<<<<< HEAD
    return Observable.merge(motionObservable, jumpObservable)
      .filter(isValidState)
  };

  // navigator.next("left");
  // navigator.next([0,1]);
  let next = (motion) => {
    subject.next(motion);
  };

  /*
   * Here's where the magic happens: Observability!
   */
  let motionUpdater = stateObservable
    .map(toPossibleMotions)
    .subscribe( (motions) => {
      possibleMotions = motions
    });

  let directionsUpdater = stateObservable
    .subscribe( (_directions) => {
      directions = _directions
    });

  let motionObservable = subject
    .filter(isValidMotion)
    .filter(isPossibleMotion)
    .map(toLevelAndDirection)
    .map(toState)

  let jumpObservable = subject
    .filter(isJumpMotion)
    .map(toNumericIndices)

  return {
    asObservable,
    isPossibleMotion,
    directions,
    motionNames: getMotionNames(),
    next
  };
=======
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
>>>>>>> Extracts MoveCalculator and refactors Navigator
};

export default createNavigator;