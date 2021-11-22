import { Link } from "react-router-dom";
function FeedNav(props)
{
    return <>
        <div className="feed ">
            <ul className="flex">
                <li onClick={props.removeTab}>
                    <Link
                        className={props.activeTab === "" ? "active-feednav" : ""}
                        to="/"
                    >
                        #Global Feed
                    </Link>

                </li>
                {props.activeTab && (
                    <li >
                        <Link to="by"
                            className={props.activeTab ? "active-feednav" : ""}>
                            #{props.activeTab}
                        </Link>

                    </li>)
                }
            </ul>
        </div>
    </>
}

export default FeedNav