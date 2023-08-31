import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes da aplicação Trybewallet', () => {
  test('Testes da tela de Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const enterButton = screen.getByText('Entrar');
    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, 'emailteste@emailteste.com');
    userEvent.type(passwordInput, '123456');
    expect(enterButton).not.toBeDisabled();

    userEvent.click(enterButton);
    await waitFor(() => {
      expect(screen.getByText('BRL')).toBeVisible();
    });
  });

  test('Testes da tela Wallet', async () => {
    const initialEntries = ['/'];
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    act(() => { history.push('/carteira'); });

    expect(screen.getByText('BRL')).toBeVisible();

    const valor = screen.getByTestId('value-input');
    expect(valor).toBeVisible();
    expect(valor.value).toBe('');
    userEvent.type(valor, '55');
    expect(valor.value).toBe('55');

    const description = screen.getByTestId('description-input');
    expect(description).toBeVisible();
    expect(description.value).toBe('');
    userEvent.type(description, 'Compras');
    expect(description.value).toBe('Compras');

    const moeda = screen.getByTestId('currency-input');
    expect(moeda).toBeVisible();

    const metodo = screen.getByTestId('method-input');
    expect(metodo).toBeVisible();
    userEvent.selectOptions(metodo, 'Dinheiro');
    expect(metodo.value).toBe('Dinheiro');

    const categoria = screen.getByTestId('tag-input');
    expect(categoria).toBeVisible();
    userEvent.selectOptions(categoria, 'Saúde');
    expect(categoria.value).toBe('Saúde');

    const addBtn = screen.getByText('Adicionar despesa');
    expect(addBtn).toBeVisible();
    userEvent.click(addBtn);

    const expensesTable = screen.getByTestId('expenses-table');
    expect(expensesTable).toBeVisible();

    const tableValue = await screen.findByRole('cell', { name: /55\.00/i });

    expect(tableValue).toBeInTheDocument();
  });
});
