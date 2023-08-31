import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';

class Header extends Component {
  componentDidUpdate() {
    this.verifyExpenses();
  }

  verifyExpenses = () => {
    const state = store.getState();
    const { expenses } = state.wallet;
    // console.log(expenses);

    if (expenses.length === 0) return 0;

    const currencyValue = expenses.reduce((acc, curr) => {
      const quotation = curr.exchangeRates[curr.currency].ask;

      const convertion = (Number(curr.value) * Number(quotation));
      return acc + convertion;
    }, 0);

    return currencyValue;
  };

  render() {
    const state = store.getState();
    const { email } = state.user;

    return (
      <header
        className="flex justify-around items-center bg-green-900 text-white h-20 w-screen"
      >
        <p
          data-testid="email-field"
        >
          {email}
        </p>

        <p className="text-3xl">Trybewallet</p>

        <div>
          <p className="inline">
            Total de gastos:
            {' '}
          </p>
          <p
            data-testid="total-field"
            className="inline"
          >
            {this.verifyExpenses().toFixed(2)}
          </p>
          <p
            data-testid="header-currency-field"
            className="inline"
          >
            {' '}
            BRL
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state,
});

export default connect(mapStateToProps)(Header);
