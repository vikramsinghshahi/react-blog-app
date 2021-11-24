import React from "react";
import { articlesURL } from "../utli/Const"
import Loader from "./Loader";
import { Link, withRouter } from "react-router-dom"
// import { useParams } from "react-router-dom";
// import { withRouter } from "react-router-dom";

class Singlepost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            article: null,
            error: "",
        }
    }

    componentDidMount()
    {

        let slug = this.props.match.params.slug;
        fetch(articlesURL + "/" + slug)
            .then((res) =>
            {
                if (!res.ok)
                {
                    throw new Error(res.statusText)
                } else
                {
                    return res.json()
                }
            })
            .then((data) => this.setState({
                article: data.article,

            })).catch((err) => this.setState({ error: "Not able to fetch data" }))

    }

    render()
    {
        const { article, error } = this.state;
        // console.log(this.props.match.params.slug)
        // console.log(article)
        console.log(this.props)
        if (error)
        {
            return <h2>{error}</h2>
        }
        if (!article)
        {
            return <Loader />
        } else
        {
            return <>
                <h2>This is single  article  component</h2>
                <article>
                    <div className="article-meta flex">
                        <div className="flex">
                            <figure>
                                <img src={article.author.image || `logo512.png`} alt="" />
                            </figure>
                            <div className="info">
                                <p>{article.createdAt.split("T")[0]}</p>
                                <p>{article.body}</p>
                            </div>
                        </div>
                        <div>
                            <button>like 1</button>
                        </div>
                    </div>
                    <div>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <div className="flex">
                            <span>taglist</span>
                        </div>
                    </div>
                    {this.props.user === null ?
                        <footer>
                            <div className="singlepost-footer">
                                <p>
                                    <Link to="/login">
                                        login
                                    </Link>or
                                    <Link to="/signup">
                                        signup
                                    </Link> to add comment on the article
                                </p>
                            </div>
                        </footer>
                        : ""
                    }
                </article>
            </>
        }
    }

}

// function Singlepost(props)
// {
//     return <>
//         <h1>Hello {props.match.params.username}!</h1>;
//     </>
// }


export default withRouter(Singlepost);