import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },

      () => {
        if (this.validateEmailAndPassword()) {
          this.setState({
            isButtonDisabled: false,
          });
        } else {
          this.setState({
            isButtonDisabled: true,
          });
        }
      },
    );
  };

  validateEmailAndPassword = () => {
    const { email, password } = this.state;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const six = 6;

    const validation = (emailRegex.test(email) && password.length >= six);

    return validation;
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    const { history, dispatch } = this.props;
    return (
      <div
        className="bg-stone-200 min-h-screen flex items-center justify-center space-x-4"
      >
        <div
          className="text-6xl"
        >
          Trybewallet
        </div>

        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(addUser(this.state));
            history.push('/carteira');
            console.log('Ao clicar, envie a informação do formulário');
          } }
          className="bg-green-900 p-16
          shadow-black
          shadow-xl
          rounded-3xl
          text-center
          flex
          flex-col"
        >

          <div
            className="text-3xl font-semibold mb-7 text-white"
          >
            Sign in
          </div>

          <fieldset>
            <input
              type="text"
              name="email"
              value={ email }
              placeholder="email"
              onChange={ this.handleChange }
              data-testid="email-input"
              className="bg-slate-200 p-1 block my-1 rounded-sm"
            />
          </fieldset>

          <fieldset>
            <input
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              onChange={ this.handleChange }
              data-testid="password-input"
              className="bg-slate-200 block my-1 p-1"
            />
          </fieldset>

          <button
            type="submit"
            disabled={ isButtonDisabled }
            className="border-style: solid
            bg-green-600
            p-2
            rounded-3xl
            mt-5
            disabled:bg-slate-300 text-white"
          >
            {' '}
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state,
});

export default connect(mapStateToProps)(Login);
