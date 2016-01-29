import {createHistory, useQueries} from 'history';

let history = useQueries(createHistory)({
  queryKey: false
});

export default history;
