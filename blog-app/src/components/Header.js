import { NavLink } from "react-router-dom"

function Header(props)
{
    return <>
        <header >
            <nav className="header-nav">
                {props.isloggedIn ? <AuthHeader /> : <NonAuthHeader />}
            </nav>
        </header>


    </>
}

function NonAuthHeader()
{
    return <>
        <h1>
            logo
        </h1>
        <ul className="flex">
            <li>
                <NavLink to="/" activeclassname="active" exact={true}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/login" activeclassname="active" >
                    Login
                </NavLink>

            </li>
            <li>
                <NavLink to="/signup" activeclassname="active">
                    Signup
                </NavLink>

            </li>
        </ul>
    </>
}

function AuthHeader()
{
    return <>
        <h1>
            logo
        </h1>
        <ul className="flex">
            <li>
                <NavLink to="/" activeclassname="active" exact={true}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/new-post" activeclassname="active" >
                    New Article
                </NavLink>

            </li>
            <li>
                <NavLink to="/setting" activeclassname="active">
                    Setting
                </NavLink>

            </li>
            <li>
                <NavLink to="/profile" activeclassname="active">
                    Profile
                </NavLink>

            </li>
        </ul>
    </>
}
export default Header