// ACTION TYPES
export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const ADD_CURRENCY = 'ADD_CURRENCY';

// ACTION CREATORS

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  payload: wallet,
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
