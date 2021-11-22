import React from "react";
import Post from "./Post";
// import { articlesURL } from "../utli/Const"
import Loader from "./Loader"


function Posts(props)
{

    // console.log(props)

    if (props.error)
    {
        return <p>{props.error}</p>
    }
    if (!props.articles)
    {
        return <Loader />
    } else if (props.articles.length < 1)
    {
        return <h2>There is no article </h2>
    } else
    {
        return <>
            <div>
                {props.articles.map((article, i) => (

                    <Post key={i} article={article} />
                ))}


            </div>
        </>
    }
}





export default Posts;