import React from 'react';
import Form from './Form.js';



function Register(props) {
    return (
        <>
            <Form formTitle="Регистрация" btnText="Зарегистрироваться" isRegister={true} onRegister={props.onRegister} onLogin={props.onLogin}/>
        </>
    )
}

export default Register;