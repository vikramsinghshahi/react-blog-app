import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Sign-Up';
import Login from './components/Log-In';
import ArticlesHome from './components/ArticlesHome';
import Article from './components/Article';
import NewArticle from './components/New-Article';
import Settings from './components/Settings';
import Profile from './components/Profile';
import FullPageLoader from './components/FullPageLoader';
import UpdateArticle from './components/UpdateArticle';
import NotFound from './components/NotFound';
import ErrorBoundary from "./components/ErrorBoundry";
import { UserProvider } from "./context/UserContext";

import { Local_Storage_Key, User_Verify_URL } from './utilities/constants';

class App extends React.Component
{
    state = {
        isLoggedIn: false,
        user: null,
        isVerifying: true,
    };

    componentDidMount()
    {
        let storageKey = localStorage[Local_Storage_Key];
        if (storageKey)
        {
            fetch(User_Verify_URL, {
                method: 'GET',
                headers: {
                    authorization: `Token ${storageKey}`,
                },
            })
                .then((res) =>
                {
                    if (res.ok)
                    {
                        return res.json();
                    }
                    return res.json().then(({ errors }) =>
                    {
                        return Promise.reject(errors);
                    });
                })
                .then(({ user }) => this.updateUser(user))
                .catch((errors) => console.log(errors));
        } else
        {
            this.setState({ isVerifying: false });
        }
    }
    updateUser = (user) =>
    {
        this.setState({ isLoggedIn: true, user, isVerifying: false });
        localStorage.setItem(Local_Storage_Key, user.token);
    };
    handleLogout = () =>
    {
        this.setState({ isLoggedIn: false, user: null });
    };

    render()
    {
        if (this.state.isVerifying)
        {
            console.log('Is Verifying');
            return <FullPageLoader />;
        }
        return (
            <Router>
                <UserProvider value={{ data: this.state, handleUser: this.updateUser, handleLogout: this.handleLogout }}>
                    <ErrorBoundary>
                        <Header />
                        {this.state.isLoggedIn ? (
                            <AuthenticatedApp />
                        ) : (
                            <UnAuthenticatedApp />
                        )}
                    </ErrorBoundary>
                </UserProvider>
            </Router>
        );
    }
}
function AuthenticatedApp(props)
{
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/articles" exact>
                <ArticlesHome />
            </Route>
            <Route path="/articles/edit/:slug">
                <UpdateArticle />
            </Route>
            <Route path="/articles/:slug">
                <Article />
            </Route>
            <Route path="/new-article" exact>
                <NewArticle />
            </Route>
            <Route path="/settings" exact>
                <Settings />
            </Route>
            <Route path="/profiles/:id" exact>
                <Profile user={props.user} isLoggedIn={props.isLoggedIn} />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

function UnAuthenticatedApp(props)
{
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/register" exact>
                <Signup />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/articles" exact>
                <ArticlesHome />
            </Route>
            <Route path="/articles/:slug">
                <Article />
            </Route>
            <Route path="/profiles/:id" exact>
                <Profile user={props.user} />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default App;