import React from "react";
import { articlesURL } from "../utli/Const";
import { withRouter } from "react-router-dom"

class Newpost extends React.Component
{
    state = {
        title: "",
        description: "",
        tagList: "",
        body: "",
        errors: {
            title: "",
            description: "",
            tagList: "",
            body: "",
        }
    }

    handleChange = (event) =>
    {
        let { name, value } = event.target;

        let errors = { ...this.state.errors };
        this.setState({
            [name]: value,
            errors
        })

    }

    handleSubmit = (event) =>
    {
        const { title, description, body, tagList } = this.state;
        console.log(this.state, this.props.user.token)
        event.preventDefault()

        console.log(articlesURL)
        fetch(articlesURL, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                authorization: `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                article: {
                    title, description, body, tagList: tagList.split(',').map((tag) => tag.trim())
                },
            }),
        }).then((res) =>
        {
            if (!res.ok)
            {
                throw new Error("cannot create article")
            }
            return res.json();
        }).then((article) =>
        {
            console.log(article);
            this.setState({
                title: "",
                description: "",
                tagList: "",
                body: "",
            })
            this.props.history.push("/")
        }).catch((errors) => { this.setState({ errors }) })
    }


    render()
    {
        return <>
            <h2>This is new post component</h2>
            <div className="container form-container">
                <form className="form">
                    <input type="text"
                        placeholder="enter title"
                        name="title"
                        value={this.state.title}
                        onChange={(event) => { this.handleChange(event) }}
                    />
                    <input type="text"
                        placeholder="Whats this articles about"
                        name="description"
                        value={this.state.description}
                        onChange={(event) => { this.handleChange(event) }}
                    />
                    <textarea
                        placeholder="write your article"
                        rows="10"
                        name="body"
                        value={this.state.body}
                        onChange={(event) => { this.handleChange(event) }}
                    ></textarea>
                    <input type="text"
                        placeholder="enter tags"
                        name="tagList"
                        value={this.state.tagList}
                        onChange={(event) => { this.handleChange(event) }}
                    />
                    <input type="submit"
                        value="add article"
                        onClick={(event) => this.handleSubmit(event)} />

                </form>
            </div>
        </>
    }
}


export default withRouter(Newpost);