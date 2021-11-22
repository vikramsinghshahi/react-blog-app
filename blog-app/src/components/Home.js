import React from "react"
import Banner from "./Banner"
import FeedNav from "./FeedNav"
import Pagination from "./Pagination"
import Posts from "./Posts"
import Sidebar from "./Sidebar"
import { articlesURL } from "../utli/Const"

class Home extends React.Component
{
    state = {
        articles: null,
        error: "",
        articlesCount: 0,
        articlesPerPage: 10,
        activePageIndex: 1,
        activeTab: ""
    }

    componentDidMount()
    {
        //     console.log("cdm")
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState,)
    {
        console.log(prevProps, prevState, "this is from update")
        if (prevState.activePageIndex !== this.state.activePageIndex ||
            prevState.activeTab !== this.state.activeTab)
        {
            this.fetchData();
        }

        // 

    }

    fetchData = () =>
    {
        let limit = this.state.articlesPerPage
        let offset = (this.state.activePageIndex - 1) * limit
        let tag = this.state.activeTab
        // console.log(limit, offset, articlesURL + `?limit=${limit}&offset=${offset}`)
        fetch(articlesURL + `?limit=${limit}&offset=${offset}` + (tag ? `&tag=${tag}` : ""))
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
                articles: data.articles,
                articlesCount: data.articlesCount
            })).catch((err) => this.setState({ error: "Not able to fetch data" }))
        // console.log("async")
    }

    updateActivePageIndex = (page) =>
    {
        this.setState({
            activePageIndex: page
        })

    }

    removeTab = () =>
    {
        this.setState({
            activeTab: "",
        })
    }

    addTab = (value) =>
    {
        this.setState({
            activeTab: value,
        })
    }

    render()
    {
        // console.log(this.state)
        return <>
            <main >
                <Banner />
                <div className="container flex">
                    <div className="f-p-p-container">
                        <FeedNav activeTab={this.state.activeTab} removeTab={this.removeTab} />
                        <Posts articles={this.state.articles} error={this.state.error} />
                        <Pagination articlesCount={this.state.articlesCount}
                            articlesPerPage={this.state.articlesPerPage}
                            activePageIndex={this.state.activePageIndex}
                            updateActivePageIndex={this.updateActivePageIndex}
                        />
                    </div>
                    <div className="sidebar">
                        <Sidebar addTab={this.addTab} />
                    </div>
                </div>


            </main>

        </>
    }
}


export default Home