function Pagiantion(props)
{
    let {
        articlesCount,
        articlesPerPage,
        activePageIndex,
        updateCurrentPageIndex,
    } = props;
    let numberOfPages = Math.ceil(articlesCount / articlesPerPage);

    let pagesArray = [];
    for (let i = 1; i <= numberOfPages; i++)
    {
        pagesArray.push(i);
    }
    return (
        <>
            <div className="flex justify-between">
                {activePageIndex !== 1 && numberOfPages !== 0 && (
                    <p
                        className="font-bold self-center cursor-pointer hover:shadow-lg"
                        onClick={() =>
                            updateCurrentPageIndex(
                                activePageIndex - 1 < 1 ? 1 : activePageIndex - 1
                            )
                        }
                    >
                        {'< Prev'}
                    </p>
                )}

                {pagesArray.map((page, i) =>
                {
                    return (
                        <span
                            key={page}
                            className={
                                activePageIndex === page
                                    ? 'bg-gray-800 text-white py-2 px-4 cursor-pointer hover:bg-green-500 rounded'
                                    : 'border border-gray-400 bg-green-50 py-2 px-4 cursor-pointer hover:bg-blue-400 rounded'
                            }
                            onClick={() => updateCurrentPageIndex(page)}
                        >
                            {page}
                        </span>
                    );
                })}
                {activePageIndex !== numberOfPages && numberOfPages !== 0 && (
                    <p
                        className="font-bold self-center cursor-pointer hover:shadow-lg"
                        onClick={() =>
                            updateCurrentPageIndex(
                                activePageIndex + 1 > numberOfPages
                                    ? numberOfPages
                                    : activePageIndex + 1
                            )
                        }
                    >
                        {'Next >'}
                    </p>
                )}
            </div>
        </>
    );
}
export default Pagiantion;