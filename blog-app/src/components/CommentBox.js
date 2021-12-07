import React from 'react';
import { Articles_URL, Local_Storage_Key } from '../utilities/constants';
import Comments from './Comments';
import UserContext from "../context/UserContext";

class CommentBox extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            inputText: '',
            comments: '',
        };
    }
    static contextType = UserContext;
    componentDidMount()
    {
        this.getComments();
    }

    handleChange = ({ target }) =>
    {
        let { name, value } = target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) =>
    {
        event.preventDefault();
        let slug = this.props.slug;
        let { inputText } = this.state;
        if (inputText)
        {
            fetch(Articles_URL + '/' + slug + '/comments', {
                method: 'POST',
                body: JSON.stringify({ comment: { body: inputText } }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage[Local_Storage_Key],
                },
            })
                .then((res) =>
                {
                    if (!res.ok)
                    {
                        return res.json().then(({ errors }) =>
                        {
                            return Promise.reject(errors);
                        });
                    }
                    return res.json();
                })
                .then((data) =>
                {
                    console.log(data);
                    this.setState({ inputText: '', comments: '' }, this.getComments);
                })
                .catch((err) => console.log(err));
        }
    };

    handleDelete = ({ target }) =>
    {
        let { id } = target.dataset;
        console.log(typeof id);
        let slug = this.props.slug;
        fetch(Articles_URL + '/' + slug + '/comments/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Token ' + localStorage[Local_Storage_Key],
            },
        })
            .then((res) =>
            {
                if (!res.ok)
                {
                    return res.json().then(({ errors }) =>
                    {
                        return Promise.reject(errors);
                    });
                }
                this.setState({ comments: '' }, this.getComments);
            })
            .catch((err) => console.log(err));
    };

    getComments = () =>
    {
        let slug = this.props.slug;
        fetch(Articles_URL + '/' + slug + '/comments')
            .then((res) =>
            {
                if (!res.ok)
                {
                    return res.json().then(({ errors }) =>
                    {
                        return Promise.reject(errors);
                    });
                }
                return res.json();
            })
            .then(({ comments }) =>
            {
                console.log(comments);
                this.setState({ comments });
            })
            .catch((err) => console.log(err));
    };

    render()
    {
        let { inputText, comments } = this.state;
        // let loggedInUser = this.props?.user?.username;
        let loggedInUser = this.context.data?.user?.username;
        console.log(loggedInUser, "user");
        // let {isLoggedIn} = this.context.data;
        return (
            <>
                {
                    loggedInUser && (
                        <div className="">
                            <form className="my-6 flex flex-col w-1/3" onSubmit={this.handleSubmit}>
                                <textarea
                                    className="w-full border-2 border-gray-400 rounded-md p-3 outline-none focus:border-blue-500"
                                    rows="3"
                                    placeholder="Enter Comments"
                                    value={inputText}
                                    onChange={this.handleChange}
                                    name="inputText"
                                ></textarea>
                                <input
                                    type="submit"
                                    value="Add Comment"
                                    className="px-2 py-1 shadow-md btn-primary self-end text-white text-xs rounded-md cursor-pointer hover:bg-blue-400 mt-5"
                                />
                            </form>
                        </div>
                    )
                }

                <div className="my-8">
                    <Comments
                        comments={comments}
                        handleDelete={this.handleDelete}
                    />
                </div>
            </>
        );
    }
}

export default CommentBox;