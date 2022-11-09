import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form.js';


function Register() {

    return (
        <>
            
            <Form formTitle="Регистрация" btnText="Зарегистрироваться" isRegister={true}/>
            
        </>
    )
}

export default Register;