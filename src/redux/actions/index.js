// ACTION TYPES
export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const ADD_QUOTATION = 'ADD_QUOTATION';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

// ACTION CREATORS

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const receiveCurrency = (currency) => ({
  type: ADD_CURRENCY,
  payload: currency,
});

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrency(Object.keys(currencies)
        .filter((currency) => currency !== 'USDT'))));
  };
}

export const receiveAllCurrencies = (quotation) => ({
  type: ADD_QUOTATION,
  payload: quotation,
});

export function fetchQuotation(localState) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((allCurrencies) => {
        const newExpense = {
          ...localState,
          exchangeRates: allCurrencies,
        };
        dispatch(receiveAllCurrencies(newExpense));
      });
  };
}

export const removeExpense = (editedExpense) => ({
  type: REMOVE_EXPENSE,
  payload: editedExpense,
});

export const editExpense = (editedExpense) => ({
  type: EDIT_EXPENSE,
  payload: editedExpense,
});

export const updateExpense = (editedExpense) => ({
  type: UPDATE_EXPENSE,
  payload: [...expenses, editedExpense],
});

// thunk: action que dispara uma action. O fetch representa uma action disparando outra.
