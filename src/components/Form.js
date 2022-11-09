import React from 'react';
import { Link } from 'react-router-dom';

function Form(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.currentTarget.value);
    }

    function handleChangePassword(e) {
        setPassword(e.currentTarget.value);
    }

    function handleSubmit(e) {
        console.log(e);
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
                        value={email ||''}
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