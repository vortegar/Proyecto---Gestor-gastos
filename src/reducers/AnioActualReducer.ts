import { Year } from "../interface/YearInterface";

type State = Year[]

export type Action =
  | { type: "SET_YEARS"; payload: Year[] }
  | { type: "ADD_YEAR"; payload: Year }
  | { type: "SEARCH_YEAR"; payload: string }
  | { type: "REMOVE_YEAR"; payload: string };

export const initialState: State = [];

export const anioReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_YEARS":
      return action.payload;
    case "ADD_YEAR":
      return [...state, action.payload];
      case "SEARCH_YEAR":
        return state.filter((year) => year.id == action.payload);
    case "REMOVE_YEAR":
      return state.filter((year) => year.id !== action.payload);
    default:
      return state;
  }
}