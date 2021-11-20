import { NavLink } from "react-router-dom"

function Header()
{
    return <>
        <header >
            <nav className="header-nav">
                <h1>
                    logo
                </h1>
                <ul className="flex">
                    <li>
                        <NavLink to="/" activeclassname="active" exact="true">
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
            </nav>
        </header>


    </>
}

export default Header