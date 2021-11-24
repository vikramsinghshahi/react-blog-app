import React from "react";
import { userVerifyUrl } from "../utli/Const";
import { withRouter } from "react-router-dom";

class Setting extends React.Component
{
    state = {
        bio: "",
        image: "",
        email: this.props.user.email,
        username: this.props.user.username,
        password: ""
    }

    handleChange = (event) =>
    {
        let { name, value } = event.target;


        this.setState({
            [name]: value
        })

    }

    handleSubmit = (event) =>
    {
        const { bio, image, password, username, email } = this.state;
        console.log(bio, image, password, username, email, this.props)
        event.preventDefault()

        // console.log(articlesURL)
        fetch(userVerifyUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                authorization: `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                user: {
                    bio, image, password, username, email
                },
            }),
        }).then((res) =>
        {
            if (!res.ok)
            {
                throw new Error("cannot create article")
            }
            return res.json();
        }).then((user) =>
        {
            console.log(user);
            // this.setState({
            //     title: "",
            //     description: "",
            //     tagList: "",
            //     body: "",
            // })
            this.props.history.push("/profile")
        }).catch((errors) => { this.setState({ errors }) })
    }


    render()
    {
        return <>
            <h2>This is setting component</h2>
            <div className="container form-container">
                <form className="form">
                    <input type="url"
                        placeholder="profile image url"
                        name="image"
                        value={this.state.image}
                        onChange={(event) => { this.handleChange(event) }}
                    />
                    <input type="text"
                        placeholder="enter username "
                        name="username"
                        value={this.props.user.username}
                        readOnly
                    />
                    <textarea
                        placeholder="write about your self"
                        rows="10"
                        name="bio"
                        value={this.state.bio}
                        onChange={(event) => { this.handleChange(event) }}
                    ></textarea>
                    <input type="email"
                        placeholder="enter email"
                        name="email"
                        value={this.props.user.email}
                        readOnly

                    />
                    <input type="password"
                        placeholder="new passowrd"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => { this.handleChange(event) }}
                    />

                    <input type="submit"
                        value="update setting"
                        onClick={(event) => this.handleSubmit(event)} />

                </form>
            </div>
        </>
    }
}

export default withRouter(Setting);