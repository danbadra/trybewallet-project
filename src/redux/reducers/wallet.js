import { ADD_WALLET } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export const INITIAL_STATE = {};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default wallet;
