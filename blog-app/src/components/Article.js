import React from 'react';
import Loader from './Loader';
import { Link, withRouter } from 'react-router-dom';
import { Articles_URL, Local_Storage_Key } from '../utilities/constants';
import CommentBox from './CommentBox';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import UserContext from '../context/UserContext';

class Article extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            article: '',
            error: '',
        };
    }
    static contextType = UserContext;
    componentDidMount()
    {
        this.getArticle();
    }

    getArticle = () =>
    {
        let slug = this.props.match.params.slug;
        fetch(Articles_URL + `/${slug}`)
            .then((res) =>
            {
                if (!res.ok)
                {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((data) =>
            {
                // console.log(data);
                this.setState({ article: data.article });
            })
            .catch((err) =>
            {
                this.setState({ error: 'Not able to fetch Articles' });
            });
    };

    getDate = (date) =>
    {
        let newDate = new Date(date).toISOString().split('T')[0];
        return newDate;
    };
    handleEdit = () =>
    {
        let { slug } = this.state.article;
        // console.log(this.props, 'Article props from edit');
        this.props.history.push({
            pathname: `/articles/edit/${slug}`,
            article: this.state.article,
        });
    };

    handleDelete = () =>
    {
        let { user } = this.props;
        // console.log(user.username, 'username');
        fetch(Articles_URL + '/' + this.props.match.params.slug, {
            method: 'DELETE',
            headers: {
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
                this.props.history.push(`/profiles/${user.username}`);
            })
            .catch((err) => console.log(err));
    };

    render()
    {
        if (this.state.info)
        {
            throw new Error('Something went wrong');
        }
        let { error, article } = this.state;
        let loggedInUser = this.props?.user?.username;
        let { isLoggedIn, user } = this.context.data;
        // let isLoggedIn = this.context.isLoggedIn;
        // let user = this.props?.user;

        if (error)
        {
            return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
        }

        if (!article)
        {
            return <Loader />;
        }
        let { tagList } = article;

        return (
            <main>
                {/* hero section */}
                <section className="px-20 bg-gray-400 py-12 flex items-center rounded-md shadow-md">
                    <div className="flex py-6 items-center flex-col mr-20">
                        <Link to={`/profiles/${article.author.username}`}>
                            <img
                                src={article.author.image || 'smiley.png'}
                                alt={article.author.username}
                                className="w-16 h-16 object-cover rounded-full"
                            />
                        </Link>
                        <span className="mx-3 text-gray-700 font-bold text-xl">
                            {article.author.username}
                        </span>
                        <span className="mx-3 text-gray-700">
                            {this.getDate(article.createdAt)}
                        </span>
                    </div>
                    <div className="flex flex-col w-5/6">
                        <h2 className="mt-2 mb-5 text-4xl self-center text-gray-900">
                            {article.title}
                        </h2>
                        <p className="self-start text-gray-800 mb-5">
                            {article.description}
                        </p>
                        <div className="flex justify-between">
                            <div className="flex">
                                {tagList.map((tag) =>
                                {
                                    if (!tag)
                                    {
                                        return null;
                                    } else
                                    {
                                        return (
                                            <span
                                                key={tag}
                                                className="mr-3 bg-gray-700 p-1 px-2 text-xs rounded-md text-white"
                                            >
                                                {tag}
                                            </span>
                                        );
                                    }
                                })}
                            </div>
                            {isLoggedIn && user.username === article.author.username && (
                                <div className="">
                                    <span
                                        className={
                                            'btn bg-gray-300 text-gray-600 rounded-md mx-3 cursor-pointer'
                                        }
                                        onClick={this.handleEdit}
                                    >
                                        <i className="far fa-edit mr-2"></i> Edit
                                    </span>

                                    <span
                                        className={
                                            'btn bg-gray-300 text-gray-600 rounded-md mx-3 cursor-pointer'
                                        }
                                        onClick={this.handleDelete}
                                    >
                                        <i className="far fa-trash-alt mr-2"></i>Delete
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* article body */}
                <section className="bg-gray-100">
                    <div className="text-lg text-gray-700 px-20 py-12 border">
                        <ReactMarkdown
                            children={article.body}
                            remarkPlugins={[remarkGfm]}
                        />
                    </div>
                    <div className="px-20 py-12">
                        <CommentBox slug={article.slug} />
                        {!isLoggedIn && !loggedInUser && (
                            <div className="flex justify-center mt-10 mb-5">
                                <h3 className="text-xl text-gray-600">
                                    Please
                                    <Link to="/login" className="text-green-700 mx-1">
                                        Login
                                    </Link>
                                    to Add Comments on the Article
                                </h3>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        );
    }
}

export default withRouter(Article);