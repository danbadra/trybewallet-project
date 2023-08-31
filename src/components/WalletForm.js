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

    //  2. Altera o id antes de subir para o estado global
    // obs.: expenses.length não funcionaria, pq depois poderia ocorrer ids duplicados em caso de exclusão de uma expense.
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
      <div
        className="flex justify-center"
      >
        <form
          className="p-10 absolut grid place-content-center
          mt-5 rounded-3xl bg-stone-400 shadow-black shadow-lg w-2/5"
        >

          <label>
            Valor:
            <input
              data-testid="value-input"
              type="number"
              placeholder="Valor"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              className="bg-slate-200 block my-1 rounded-sm"
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
              className="bg-slate-200 block my-1 rounded-sm"
            />
          </label>

          <label>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
              className="bg-slate-200 block my-1 rounded-sm"
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
              className="bg-slate-200 block my-1 rounded-sm"
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
              className="bg-slate-200 block my-1 rounded-sm"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <div
            className="block"
          >
            <button
              onClick={ this.addNewExpense }
              className="border-style: solid
              bg-green-600
              p-2
              rounded-3xl
              mt-5
              disabled:bg-slate-300
              text-white"
            >
              Adicionar despesa
            </button>
          </div>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
