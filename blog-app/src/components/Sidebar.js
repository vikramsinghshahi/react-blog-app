import React from "react";
import { Root_URL } from "../utli/Const";
import Loader from "./Loader";


class Sidebar extends React.Component
{
    state = {
        tags: null,
        error: "",
    }

    componentDidMount()
    {
        fetch(Root_URL + 'tags')
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
                tags: data.tags,
            })).catch((err) => this.setState({
                error: "Not able to load tags"
            }))
    }

    render()
    {

        // console.log(this.state)
        if (this.state.error)
        {
            return <p>{this.state.error}</p>
        }
        if (!this.state.tags)
        {
            return <Loader />
        } else
        {
            return <>
                <div>
                    {this.state.tags.map((tag, i) => (
                        <button
                            onClick={() => this.props.addTab(tag)}
                            key={i}>{tag}</button>
                        // console.log(tag)
                    ))}
                </div>
            </>
        }

    }
}


export default Sidebar;