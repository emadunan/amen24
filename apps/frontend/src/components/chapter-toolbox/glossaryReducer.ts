import { Lang } from "@amen24/shared";

export type ActiveLang = Lang.NATIVE | Lang.ENGLISH | Lang.ARABIC;

export type GlossaryState = Record<ActiveLang, string[]>;

export type GlossaryAction =
  | { type: "add"; lang: ActiveLang; word: string }
  | { type: "remove"; lang: ActiveLang; word: string }
  | { type: "toggle"; lang: ActiveLang; word: string }
  | { type: "clear"; lang?: ActiveLang };

export const initialState: GlossaryState = {
  [Lang.NATIVE]: [],
  [Lang.ENGLISH]: [],
  [Lang.ARABIC]: [],
};

export function glossaryReducer(
  state: GlossaryState,
  action: GlossaryAction,
): GlossaryState {
  switch (action.type) {
    case "add": {
      const words = state[action.lang];
      // if (words.includes(action.word)) return state;
      return {
        ...state,
        [action.lang]: [...words, action.word],
      };
    }

    case "remove": {
      const words = state[action.lang].filter((w) => w !== action.word);
      return {
        ...state,
        [action.lang]: words,
      };
    }

    case "toggle": {
      const words = state[action.lang];
      const exists = words.includes(action.word);
      return {
        ...state,
        [action.lang]: exists
          ? words.filter((w) => w !== action.word)
          : [...words, action.word],
      };
    }

    case "clear": {
      if (!action.lang) return initialState;

      return {
        ...state,
        [action.lang]: [],
      };
    }

    default:
      return state;
  }
}
