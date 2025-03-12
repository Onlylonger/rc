export default function em(all?: Map<string, Function[]>) {
  all = all || new Map();

  return {
    all,
    on(type, handler) {
      const handlers = all!.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all!.set(type, [handler]);
      }
    },
    off(type, handler) {
      const handlers = all!.get(type);
      if (handlers) {
        if (handler) {
          const index = handlers.indexOf(handler);
          if (index > -1) {
            handlers.splice(index, 1);
          }
        } else {
          all!.set(type, []);
        }
      }
    },
    emit(type, evt) {
      const handlers = all!.get(type);
      if (handlers) {
        //
        handlers.slice().map((handler) => {
          handler(evt);
        });
      }
    },
  };
}
