import React from "react";
import Header from "./Header";
import Home from "./Home"
import Login from "./Login";
import Signup from "./Signup";
import NoMatch from "./NoMatch";
import Singlepost from "./Singlepost";
import { Route, Switch } from "react-router-dom";
import { localStorageKey } from "../utli/Const"
import { userVerifyUrl } from "../utli/Const"
import Loader from "./Loader";
import Newpost from "./Newpost";
import Setting from "./Setting";
import Profile from "./Profile";


class App extends React.Component
{
    state = {
        isloggedIn: false,
        user: null,
        isverfiying: true,
    }

    updateUser = (user) =>
    {
        this.setState({
            isloggedIn: true,
            user: user,
            isverfiying: false
        })
        localStorage.setItem(localStorageKey, user.token)
    }

    componentDidMount()
    {
        console.log(userVerifyUrl)
        let key = localStorage[localStorageKey];
        if (key)
        {
            fetch(userVerifyUrl, {
                method: 'GET',
                headers: {
                    authorization: `Token ${key}`,
                },
            }).then((res) =>
            {
                if (res.ok)
                {
                    return res.json()
                }
                return res.json().then(({ errors }) =>
                {
                    return Promise.reject(errors)
                })

            }

            ).then(({ user }) => this.updateUser(user)).catch((errors) =>
            {
                console.log(errors)
            })

        } else
        {
            this.setState({
                isverfiying: false
            })
        }

    }
    render()
    {
        if (this.state.isverfiying)
        {
            return <Loader />
        }
        return <>
            <Header isloggedIn={this.state.isloggedIn} user={this.state.user} />
            {
                this.state.isloggedIn ? <AuthenicationApp user={this.state.user} /> : <UnAuthenicationApp updateUser={this.updateUser} user={this.state.user} />
            }

        </>
    }
}

function AuthenicationApp(props)
{
    return <>
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/new-post"  >
                <Newpost user={props.user} />
            </Route>
            <Route path="/profile"  >
                <Profile user={props.user} />
            </Route>
            <Route path="/setting"  >
                <Setting user={props.user} />
            </Route>
            <Route path="/article/:slug" >
                <Singlepost user={props.user} />
            </Route>
            <Route path="*" >
                <NoMatch />
            </Route>

        </Switch>



    </>
}

function UnAuthenicationApp(props)
{
    return <>
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/login" >
                <Login updateUser={props.updateUser} />
            </Route>
            <Route path="/signup"  >
                <Signup updateUser={props.updateUser} />
            </Route>
            <Route path="/article/:slug" >
                <Singlepost user={props.user} />
            </Route>
            <Route path="*" >
                <NoMatch />
            </Route>

        </Switch>
    </>
}
export default App