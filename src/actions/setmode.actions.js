import { modeConstants } from '../constants/mode.constants';

const Setmode = {
  SetdarkmodeActions,
  SetlightmodeActions,
};

function SetdarkmodeActions(mode) {
  return dispatch => {
    dispatch(_SetdarkmodeActions(mode));
  };
}

const _SetdarkmodeActions = mode => {
  return {
    type: modeConstants.SET_DARK_MODE,
    mode,
  };
};

function SetlightmodeActions(mode) {
  return dispatch => {
    dispatch(_SetlightmodeActions(mode));
  };
}

const _SetlightmodeActions = mode => {
  return {
    type: modeConstants.SET_LIGHT_MODE,
    mode,
  };
};

export default Setmode;
