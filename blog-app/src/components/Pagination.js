function Pagination(props)
{
    // console.log(props)
    let { articlesCount, articlesPerPage } = props;
    let numberOfpages = Math.ceil(articlesCount / articlesPerPage)
    let pagesArray = [];
    for (let i = 1; i <= numberOfpages; i++)
    {
        pagesArray.push(i)
    }

    // console.log(pagesArray)

    return <>
        <div className="pagination-container">
            <button onClick={() => props.updateActivePageIndex(props.activePageIndex - 1 < 1 ? 1 : props.activePageIndex - 1)}>Prev</button>
            {pagesArray.map((p, i) => (
                <button key={i}
                    className={props.activePageIndex === p ? "active" : ""}
                    onClick={() => props.updateActivePageIndex(p)}
                >{p}</button>
            ))}
            <button onClick={() => props.updateActivePageIndex(props.activePageIndex + 1 > numberOfpages ? numberOfpages : props.activePageIndex + 1)}>Next</button>

        </div>
    </>
}

export default Pagination;