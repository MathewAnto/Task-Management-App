import React from 'react'
import './Login.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    return (
        <div className='loginPage bg-secondary'>
            <Form className='loginForm border p-5 m-3 bg-light rounded-4'>
            <h1 id='loginTitle' className='mb-3'>Login</h1>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Button type="submit" href='/Home' className='mt-3 py-2 px-5 btn-light btn-outline-warning' id='submitBtn'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login
