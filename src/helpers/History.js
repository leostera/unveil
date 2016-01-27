import {createHashHistory, useQueries} from 'history';

let history = useQueries(createHashHistory)({
  queryKey: false
});

export default history;