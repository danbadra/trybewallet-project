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
      <div>
        <div>Login</div>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(addUser(this.state));
            history.push('/carteira');
            console.log('Ao clicar, envie a informação do formulário');
          } }
        >
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled }
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
