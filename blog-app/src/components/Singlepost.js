import React from "react";
import { articlesURL } from "../utli/Const"
import Loader from "./Loader";
// import { useParams } from "react-router-dom";
// import { withRouter } from "react-router";

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

        fetch(articlesURL + "/slug")
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
                {/* <article>
                <div className="article-meta flex">
                    <div className="flex">
                        <figure>
                            <img src={article.author.image || `logo512.png`} alt="" />
                        </figure>
                        <div className="info">
                            <NavLink to="/article/:slug">
                                {article.author.username}
                            </NavLink>
                            <p>{article.createdAt.split("T")[0]}</p>
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
                        <NavLink to={`/article/${article.slug}`} exact>
                            <span>Read more ....</span>
                        </NavLink>
                        <span>taglist</span>
                    </div>
                </div>
            </article> */}
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


export default Singlepost;