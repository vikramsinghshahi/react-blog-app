import React from "react";
import Posts from "./Posts";
import { articlesURL } from "../utli/Const"
import ProfileBanner from "./ProfileBanner";


class Profile extends React.Component
{
    state = {
        activeTab: "author",
        articles: [],
    }
    componentDidMount()
    {
        this.fetchData();
    }

    fetchData = () =>
    {
        fetch(articlesURL + `/?${this.state.activeTab}=${this.props.user.username}`)
            .then((res) =>
            {
                if (!res.ok)
                {
                    throw new Error('cannot fetch data for specific user')
                } else
                {
                    return res.json()
                }
            })
            .then((data) => this.setState({
                articles: data.articles,
            })).catch((err) =>
                this.setState({
                    error: "Not able to fetch data"
                }))

    }

    handleActive = (tab) =>
    {
        this.setState({
            activeTab: tab
        }, () => { this.fetchData(); })

    }

    render()
    {
        let { activeTab } = this.state

        const { user } = this.props
        console.log(user)
        return <>
            <h2>This is profile component</h2>
            <section className="profile-section">
                <ProfileBanner user={user} />
                <div >
                    <button
                        className={activeTab === "author" ? "active" : ""}
                        onClick={() => { this.handleActive("author") }}
                    >My articles
                    </button>
                    <button
                        onClick={() => { this.handleActive("favorited") }}
                        className={activeTab === "favorited" ? "active" : ""}
                    >Favourite Articles
                    </button>
                </div>
                <Posts articles={this.state.articles} />

            </section>
        </>
    }
}


export default Profile;