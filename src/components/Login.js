import React from 'react';

import Form from './Form.js';

function Login(props) {

    return (
        <>
            
            <Form formTitle="Вход" btnText="Войти" isRegister={false} onLogin={props.onLogin}/>
           
        </>
    )
}

export default Login;