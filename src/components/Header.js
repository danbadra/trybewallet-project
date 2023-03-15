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
      <header>
        <div>
          <p data-testid="email-field">{email}</p>
          <div>
            Total de gastos:
            <p
              data-testid="total-field"
            >
              {this.verifyExpenses().toFixed(2)}
            </p>
          </div>
          <h4
            data-testid="header-currency-field"
          >
            BRL
          </h4>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state,
});

export default connect(mapStateToProps)(Header);
