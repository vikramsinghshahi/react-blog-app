import React from "react";
import Validation from "../utli/validation/validation";
import { signupURL } from "../utli/Const";
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom";


class Signup extends React.Component
{
    state = {
        email: "",
        username: "",
        password: "",
        errors: {
            email: "",
            password: "",
            username: ""
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
        const { username, password, email } = this.state;
        fetch(signupURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: { username, password, email }
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
            this.setState({
                username: "",
                email: "",
                password: "",

            })
            this.props.history.push('/')
        }
        ).catch((errors) =>

            this.setState({
                errors
            })
        );
    }

    render()
    {
        // console.log(this.state)
        const { username, email, password, errors } = this.state;
        return <>
            <div className="container form-container">
                <h2>Signup Form</h2>
                <p>
                    <Link to="/login">Have an account?</Link>
                </p>
                <form className="form">
                    <input type="text"
                        name="username"
                        placeholder="enter your username"
                        onChange={(event) => this.handleChange(event)}
                        value={username}
                    />
                    <span>{errors.username}</span>
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
                        disabled={errors.username || errors.password || errors.email}
                    />
                </form>
            </div>

        </>
    }
}

export default withRouter(Signup);