import React from "react";
import Validation from "../utli/validation/validation";
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
        // switch (name)
        // {
        //     case "email":
        //         let emailError = value.indexOf("@") === -1 ? `Email does not contain @` : "";
        //         errors.email = emailError;
        //         break;
        //     case "username":
        //         let usernameError = value.length < 7 ? `Username cant be less then 7 character ` : "";
        //         errors.username = usernameError;
        //         break;
        //     case "password":
        //         let passwordError
        //         let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //         if (value.length < 8)
        //         {
        //             passwordError = `password cant be less then 8 character`
        //         } else if (!re.test(value))
        //         {
        //             passwordError = "password must contain a character and a number";
        //         }
        //         errors.password = passwordError;
        //         break;
        //     default:
        //         return errors;

        // }
        this.setState({
            [name]: value, errors
        })
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        // console.log(event.target.value)
    }

    render()
    {
        console.log(this.state)
        const { username, email, password, errors } = this.state;
        return <>
            <div className="container form-container">
                <h2>Signup Form</h2>
                <p>
                    <a href="by">Have an account?</a>
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

export default Signup;