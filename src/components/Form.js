import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { register, login } from './auth.js';

function Form(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();



    function handleChangeEmail(e) {
        setEmail(e.currentTarget.value);
    }

    function handleChangePassword(e) {
        setPassword(e.currentTarget.value);
    }

    function handleRegister(bool) {
        props.onRegister(bool);
    }

    function handleSubmit(e) {

        e.preventDefault()
        if (props.btnText === "Зарегистрироваться") {
            register(email, password).then(res => {
                if (res) {
                    setEmail('');
                    setPassword('');
                    handleRegister(true);
                    history.push('/login');
                } else {
                    handleRegister(false)
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (props.btnText === "Войти") {
            login(email, password).then(res => {
                if (res.token) {
                    setEmail('');
                    setPassword('');
                    props.onLogin();
                    history.push('/home');
                } else {
                    handleRegister(false)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }




    return (
        <div className="form">
            <h3 className="form__title">
                {props.formTitle}
            </h3>
            <form
                className="popup__form"
                action="#"
                name="sign-in"

                onSubmit={handleSubmit}
            >
                <input
                    className="form__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required=""
                    minLength={2}
                    maxLength={40}
                    value={email || ''}
                    onChange={handleChangeEmail}
                />

                <input
                    className="form__input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required=""
                    minLength={2}
                    maxLength={200}
                    value={password || ''}
                    onChange={handleChangePassword}
                />

                <button className="form__save" type="submit">
                    {props.btnText}
                </button>
            </form>
            {props.isRegister ? <Link to="/login" className="form__link">Уже зарегистрированы? Войти</Link> : ''}

        </div>
    )
}

export default Form;