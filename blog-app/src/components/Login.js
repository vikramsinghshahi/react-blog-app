import React from "react";
import Validation from "../utli/validation/validation";
import { loginURL } from "../utli/Const";
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
class Login extends React.Component
{
    state = {
        email: "",
        password: "",
        errors: {
            email: "",
            password: ""
        }

    }
    handleChange = (event) =>
    {
        let { name, value } = event.target;
        let errors = { ...this.state.errors };
        Validation(errors, name, value)
        this.setState({
            [name]: value, errors
        })
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        // console.log("hello")
        const { password, email } = this.state;
        fetch(loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: { password, email }
            })
        }
        ).then((res) =>
        {
            if (!res.ok)
            {
                return res.json().then(({ errors }) =>
                {
                    return Promise.reject(errors)
                })
            }

            return res.json();
        }).then(({ user }) =>
        {
            this.props.updateUser(user)
            this.props.history.push('/')
        }
        ).catch((errors) =>

            this.setState((prevState) =>
            {
                return ({
                    ...prevState,
                    errors: {
                        ...prevState.errors,
                        email: "Email or password is in correct"
                    }
                })
            }
            ))
    }
    render()
    {
        console.log(this.state)
        const { email, password, errors } = this.state;
        return <>
            <div className="container form-container">
                <h2>login Form</h2>
                <p>
                    <Link to="/signup">Need an account?</Link>
                </p>
                <form className="form">
                    <input type="email"
                        name="email"
                        placeholder="enter your email"
                        onChange={(event) => this.handleChange(event)}
                        value={email}
                    />
                    <span>{errors.email}</span>
                    <input
                        name="password"
                        type="password"
                        placeholder="enter your password"
                        onChange={(event) => this.handleChange(event)}
                        value={password}
                    />
                    <span>{errors.password}</span>
                    <input type="submit"
                        value="signup"
                        onClick={(event) => this.handleSubmit(event)}
                        disabled={errors.email || errors.password}
                    />
                </form>
            </div>
        </>
    }

}


export default withRouter(Login);