import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <label>
            Valor:
            <input
              data-testid="value-input"
              type="number"
              placeholder="Valor"
            />
          </label>

          <label>
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              placeholder="Descrição"
            />
          </label>

          <label>
            Moeda:
            <select
              data-testid="currency-input"
            >
              {currencies.map((currency) => <option key={ currency }>{currency}</option>)}
            </select>
          </label>

          <label>
            Método de pagamento:
            <select
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label>
            Categoria:
            <select
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default WalletForm;
