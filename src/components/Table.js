import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleEditButton = ({ target }) => {
    // Encontra a expense que possui o mesmo id que o botão e a edita.
    for (let index = 0; index < expenses.length; index += 1) {
      if (Number(expenses[index].id) === Number(target.id)) {
        const { dispatch } = this.props;
        dispatch(editExpense());
      }
    }
  };

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
      <div
        className="bg-green-900 w-fit rounded-3xl mt-5"
      >
        <table
          data-testid="expenses-table"
          className="bg-green-900 rounded-3xl text-white"
        >
          <thead className="mt-20">
            <tr>
              <th className="p-5 text-white mt-10">Descrição</th>
              <th className="p-5 text-white mt-10">Tag</th>
              <th className="p-5 text-white mt-10">Método de pagamento</th>
              <th className="p-5 text-white mt-10">Valor</th>
              <th className="p-5 text-white mt-10">Moeda</th>
              <th className="p-5 text-white mt-10">Câmbio utilizado</th>
              <th className="p-5 text-white mt-10">Valor convertido</th>
              <th className="p-5 text-white mt-10">Moeda de conversão</th>
              <th className="p-5 text-white mt-10">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { (expenses.length > 0)
              && (
                expenses.map((expense) => (
                  <tr key={ expense.id } className="text-sm">
                    <td className="p-5">{expense.description}</td>
                    <td className="p-5">{expense.tag}</td>
                    <td className="p-5">{expense.method}</td>
                    <td className="p-5">{Number(expense.value).toFixed(2)}</td>
                    <td className="p-5">
                      {expense.exchangeRates[expense.currency].name}
                    </td>
                    <td className="p-5">
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                      }
                    </td>
                    <td className="p-5">
                      {(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                    </td>
                    <td className="p-5">Real</td>
                    <td className="p-5">
                      <button
                        id={ expense.id }
                        data-testid="edit-btn"
                        onClick={ (event) => this.handleEditButton(event) }
                        className="border-style: solid
                        inline
                        bg-green-600
                        p-2
                        rounded-3xl
                        mt-5
                        disabled:bg-slate-300
                        text-white"
                      >
                        Editar
                      </button>
                      <button
                        id={ expense.id }
                        data-testid="delete-btn"
                        onClick={ (event) => this.handleDeleteButton(event) }
                        className="border-style: solid
                        inline
                        bg-green-600
                        p-2
                        rounded-3xl
                        mt-5
                        disabled:bg-slate-300 text-white"
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
