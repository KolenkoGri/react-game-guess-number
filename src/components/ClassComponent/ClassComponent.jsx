import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      restart: false,
      count: 0,
    };
  }

  handleClick = () => {
    this.setState((state, props) => ({
      userNumber: '',
    })
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        // this.handleClick();
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        // this.handleClick();
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber}.
        Попыток ${state.count}`,
        restart: true,
      };
    });
    this.handleClick();
  };

  handleChange = (e) => {
    this.setState((state, props) => ({
      userNumber: e.target.value,
    }), () => {
      console.log(e.target.value);
    });
  };

  handleRestart = () => {
    this.setState((state, props) => ({
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      restart: false,
      count: 0,
    }), () => {

    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}/>
          <button className={style.btn}> Угадать</button>
        </form>
        <button className = {this.state.restart ? style.btn : style.btnAgain}
          onClick={this.handleRestart}>
        Сыграть ещё?</button>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
