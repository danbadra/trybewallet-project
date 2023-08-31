import { ADD_CURRENCY, ADD_QUOTATION, EDIT_EXPENSE,
  REMOVE_EXPENSE, UPDATE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_QUOTATION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.payload),
    };
  case EDIT_EXPENSE:
    return {};
  case UPDATE_EXPENSE:
    return {};
  default: return state;
  }
};

export default wallet;
