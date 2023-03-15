import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteButton = ({ target }) => {
    const { expenses } = this.props;
    // Encontra a expense que possui o mesmo id que o botão e a exclui.
    for (let index = 0; index < expenses.length; index += 1) {
      if (Number(expenses[index].id) === Number(target.id)) {
        const { dispatch } = this.props;
        dispatch(removeExpense(expenses[index]));
      }
    }
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table data-testid="expenses-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { (expenses.length > 0)
              && (
                expenses.map((expense) => (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{Number(expense.value).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                      }
                    </td>
                    <td>
                      {(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        id={ expense.id }
                        data-testid="delete-btn"
                        onClick={ (event) => this.handleDeleteButton(event) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>))
              )}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
