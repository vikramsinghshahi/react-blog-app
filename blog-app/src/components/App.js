import React from "react";
import Header from "./Header";
import Home from "./Home"
import Login from "./Login";
import Signup from "./Signup";
import NoMatch from "./NoMatch";
import Singlepost from "./Singlepost";
import { Route, Routes } from "react-router-dom";

function App()
{
    return <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/article/:slug" element={<Singlepost />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>

    </>
}

export default App