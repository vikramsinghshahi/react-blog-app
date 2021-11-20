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
            <button>Prev</button>
            {pagesArray.map((p, i) => (
                <button key={i}
                    className={props.activePageIndex === p ? "active" : ""}
                    onClick={() => props.updateActivePageIndex(p)}
                >{p}</button>
            ))}
            <button>Next</button>

        </div>
    </>
}

export default Pagination;