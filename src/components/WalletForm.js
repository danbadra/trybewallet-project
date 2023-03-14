import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuotation } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    // Altera o estado local para os valores inseridos
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  };

  addNewExpense = async (e) => {
    // No click do botão:
    // 1. Previne o refresh da página;
    e.preventDefault();

    //  ! 2. Altera o id antes de subir para o estado global - NÃO FUNCIONA
    const { dispatch } = this.props;
    this.setState(
      (previousState) => ({ id: previousState.id + 1 }),
    );

    // 3. Altera o estado global.
    dispatch(fetchQuotation(this.state));

    // 4. Limpa o estado local.
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;

    return (
      <div>
        <form>

          <label>
            Valor:
            <input
              data-testid="value-input"
              type="number"
              placeholder="Valor"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label>
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              placeholder="Descrição"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
            >
              {currencies.map((currencyName, index) => (
                <option key={ index } value={ currencyName }>
                  {currencyName}
                </option>))}
            </select>
          </label>

          <label>
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label>
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <br />
          <br />

          <div>
            <button onClick={ this.addNewExpense }>Adicionar despesa</button>
          </div>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape(Object)).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
