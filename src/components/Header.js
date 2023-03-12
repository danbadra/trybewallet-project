import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addWallet } from '../redux/actions';
import store from '../redux/store';

class Header extends Component {
  state = {
    currencies: ['BRL'], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  };

  // setLocalStateToGlobal = ({ target }) => {
  //   const { dispatch } = this.props;
  //   dispatch(addWallet(target.value));
  // };

  render() {
    const state = store.getState();
    const { email } = state.user;
    const { expenses, currencies } = this.state;
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);

    // window.onload(
    //   () => {
    //     dispatch(addWallet(this.state));
    //     console.log('Ao clicar, envie a informação do formulário');
    //   },
    // );

    return (
      <header>
        <div>Header</div>
        <div>
          <h4 data-testid="email-field">{email}</h4>
          <h4
            data-testid="total-field"
          // onChange={ this.setLocalStateToGlobal }
          >
            {totalExpenses}
          </h4>
          <h4
            data-testid="header-currency-field"
          // onChange={ this.setLocalStateToGlobal }
          >
            {currencies[0]}
          </h4>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state,
});

export default connect(mapStateToProps)(Header);
