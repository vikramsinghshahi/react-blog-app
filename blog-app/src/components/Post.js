function Post(props)
{
    const article = props.article;
    return <>
        <article>
            <div className="article-meta flex">
                <div className="flex">
                    <figure>
                        <img src={article.author.image || `logo512.png`} alt="" />
                    </figure>
                    <div className="info">
                        <a href="by">{article.author.username}</a>
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
                    <a href="by"><span>Read more ....</span></a>
                    <span>taglist</span>
                </div>
            </div>
        </article>
    </>
}

export default Post