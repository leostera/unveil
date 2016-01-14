import { Observable } from 'rxjs';

let fromHistory = (history) => {
  let unlisten;
  let listen = handler =>
    unlisten = history.listen(handler);
  return Observable.fromEventPattern(listen, unlisten);
};

Observable.fromHistory = fromHistory;
