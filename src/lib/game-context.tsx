import { createContext, ParentProps, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

const STORAGE_KEY = "GameData";

class Data {
  lastError?: string;
  showTimeTracker = false;

  static isData(input: object): input is Data {
    return "showTimeTracker" in input;
  }
}

class Handler {
  ws: WebSocket;
  /**
   * Definitively assigned by calling the #load method.
   */
  data!: Data;
  /**
   * Definitely assigned by calling the #load method.
   */
  setData!: SetStoreFunction<Data>;

  constructor() {
    this.#load();

    if (import.meta.env.VITE_UI_DEV) {
      // @ts-ignore in ui dev mode
      this.ws = null;
      return;
    }

    if (!import.meta.env.VITE_WS_ENDPOINT) {
      throw new Error("VITE_WS_ENDPOINT is not defined, cannot connect to web socket");
    }
    this.ws = new WebSocket(import.meta.env.VITE_WS_ENDPOINT);
  }

  /**
   * Persist all game data.
   */
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      this.setData("lastError", String(e));
      console.error(`failed to save local data: ${e}`);
    }
  }

  #load() {
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (storageData) {
      try {
        // TODO parse and verify
        const parsed: Data = JSON.parse(storageData);
        if (!Data.isData(parsed)) {
          throw new Error("data is malformed");
        }

        const [data, setData] = createStore(parsed);
        this.data = data;
        this.setData = setData;

        return;
      } catch (e) {
        console.error(`failed to parse local data, using empty data: ${e}`);
      }
    }
    const [data, setData] = createStore(new Data());
    this.data = data;
    this.setData = setData;

  }
}

const GameContext = createContext<Handler>();

/**
 * The provider for the game context.
 */
export function GameProvider(props: ParentProps) {
  const data = new Handler();

  return (
    <GameContext.Provider value={data}>
      {props.children}
    </GameContext.Provider>
  );
}

/**
 * Access the game context if available.
 */
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("cannot find GameContext");
  }

  return context;
}
