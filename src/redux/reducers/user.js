import { ADD_USER } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
export const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default user;
