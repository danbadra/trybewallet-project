import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Wallet extends React.Component {
//   state = {
//     currencies: [], // array de string
//     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
//     editor: false, // valor booleano que indica de uma despesa está sendo editada
//     idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
//   };

  render() {
    // const { history, dispatch } = this.props;
    // const { currencies, expenses, editor, idToEdit } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">Teste</h2>
          <h2 data-testid="total-field">Teste</h2>
          <h2 data-testid="header-currency-field">Teste</h2>
        </header>
      </div>
    );
  }
}

// Wallet.propTypes = {
//   currencies: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.shape({ Object })).isRequired,
//   editor: PropTypes.bool.isRequired,
//   idToEdit: PropTypes.string.isRequired,
// };

// const mapStateToProps = (state) => ({
//   wallet: state,
// });

// export default connect(mapStateToProps)(Wallet);
export default Wallet;
