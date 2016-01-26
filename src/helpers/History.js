import createHistory from 'history/lib/createHashHistory';

let history = createHistory({
    queryKey: false
});

export default history;
