import { modeConstants } from '../constants/mode.constants';

export function Setmode(
  state = {
    darkmode: false,
  },
  action
) {
  switch (action.type) {
    case modeConstants.SET_DARK_MODE: {
      return {
        ...state,
        darkmode: true,
      };
    }
    case modeConstants.SET_LIGHT_MODE: {
      return {
        ...state,
        darkmode: false,
      };
    }
    default: {
      return state;
    }
  }
}
