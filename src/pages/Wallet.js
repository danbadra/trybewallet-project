import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
// import PropTypes from 'prop-types';

class Wallet extends React.Component {
  state = {
    currencies: ['BRL'], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    // editor: false, // valor booleano que indica de uma despesa está sendo editada
    // idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  };

  render() {
    const state = store.getState();
    const { email } = state.user;
    const { expenses, currencies } = this.state;
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
    return (
      <div>
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h4 data-testid="total-field">{totalExpenses}</h4>
          <h4 data-testid="header-currency-field">{currencies[0]}</h4>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
//   currencies: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.shape({ Object })).isRequired,
//   editor: PropTypes.bool.isRequired,
//   idToEdit: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state,
});

export default connect(mapStateToProps)(Wallet);
