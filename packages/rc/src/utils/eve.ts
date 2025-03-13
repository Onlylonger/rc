// Simple EventEmitter

type Handler<T = never> = (...params: T[]) => void;
type Handlers = Array<Handler> | undefined;
type AllParams<K> = Map<K, Handlers>;

type EveFn = <K extends string>(
  all?: AllParams<K>,
) => {
  all: AllParams<K>;
  on: (type: K, handler: Handler) => void;
  off: (type: K, handler?: Handler) => void;
  emit: (type: K, params?: unknown) => void;
};

const eve: EveFn = (all) => {
  all = all ?? new Map();

  if (!isMap(all)) {
    throw new TypeError("Expected argument to be an instance of Map.");
  }

  return {
    all,
    on(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        if (handler) {
          const index = handlers.indexOf(handler);
          if (index > -1) {
            handlers.splice(index, 1);
          }
        } else {
          all.set(type, []);
        }
      }
    },
    emit(type, params) {
      const handlers = all.get(type);
      if (handlers) {
        //
        handlers.slice().map((handler) => {
          handler(params as never);
        });
      }
    },
  };
};

function isMap(variable: unknown) {
  return Object.prototype.toString.call(variable) === "[object Map]";
}

export default eve;
