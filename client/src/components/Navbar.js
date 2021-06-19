import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = ()=>{
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
                <a className="navbar-brand" href="#">MyWays</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-item nav-link" to="/about">About</NavLink>
                    <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    <NavLink className="nav-item nav-link" to="/Blogs">Blogs</NavLink>
                    <NavLink className="nav-item nav-link" to="/AdminBlog">Admin</NavLink>
                    <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar