import { LIGHT_MODE } from "./actionType";

const initState = {
  isLight: true,
};

export const colorReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LIGHT_MODE:
      return {
        ...state,
        isLight: !state.isLight,
      };

    default:
      return state;
  }
};
