import { Observable } from 'rxjs';

export default function fromHistory (history) {
  let unlisten;
  let listen = handler =>
    unlisten = history.listen(handler);

  return Observable.fromEventPattern(listen, unlisten);
};
