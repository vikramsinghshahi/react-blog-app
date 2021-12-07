import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import UserContext from "../context/UserContext";

class Articles extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    static contextType = UserContext;

    getDate = (date) =>
    {
        let newDate = new Date(date).toISOString().split('T')[0];
        return newDate;
    };

    render()
    {
        let { isLoggedIn } = this.context.data;

        let { articles, error } = this.props;
        console.log(articles, "from Articles");
        if (error)
        {
            return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
        }

        if (!articles)
        {
            return <Loader />;
        }
        if (!articles.length)
        {
            return (
                <h2 className="text-red-500 text-center text-xl mt-8">
                    No articles found
                </h2>
            );
        }
        return (
            <article>
                {articles.map((article) =>
                {
                    return (
                        <div
                            key={article.slug}
                            className="bg-gray-200 flex justify-between flex-col mb-10 w-full p-4 rounded-md shadow-md"
                        >
                            <div className="flex justify-between w-full">
                                <div className="flex items-center my-2">
                                    <Link to={`/profiles/${article.author.username}`}>
                                        <img
                                            src={article.author.image || 'smiley.png'}
                                            alt={article.author.username}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    </Link>
                                    <div className="ml-4">
                                        <h5 className="text-gray-500 font-bold text-xl mr-5">
                                            {article.author.username}
                                        </h5>
                                        <h6 className="text-gray-600">{this.getDate(article.createdAt)}</h6>
                                    </div>
                                </div>
                                <div className="flex items-center text-xl border-gray-500 px-3 py-1 rounded-full shadow-lg bg-gray-400">
                                    <i
                                        className={
                                            isLoggedIn
                                                ? 'fas fa-heart text-red-700'
                                                : article.favorited
                                                    ? 'fas fa-heart cursor-pointer text-pink-600'
                                                    : 'far fa-heart cursor-pointer text-gray-700'
                                        }
                                        onClick={(e) => this.props.handleFavorite(e)}
                                        data-id={article.favorited}
                                        data-slug={article.slug}
                                    ></i>
                                    <span className="ml-2">{article.favoritesCount}</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-5 mt-5 text-gray-700">{article.title}</h2>
                            <p className="text-gray-500 mb-5">{article.description}</p>
                            <Link to={`/articles/${article.slug}`}>
                                <h4 className="btn btn-primary inline-block">Read More</h4>
                            </Link>
                        </div>
                    );
                })}
            </article>
        );
    }
}

export default Articles;