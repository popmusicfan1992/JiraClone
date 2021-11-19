import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
            <a className="navbar-brand">Navbar</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/home'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/contact'>Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/login'>Login</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/todolistrcc'>TodolistRCC</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/todolistrfc'>TodolistRFC</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/todolistredux'>TodolistRedux</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeHeader' className='nav-link' to='/todolistsaga'>TodolistSaGa</NavLink>
                    </li>
                    <li className="nav-item dropdown show">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            DemoHOC
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <NavLink activeClassName='activeHeader' className='nav-link dropdown-item' to='/demoHOC'>ModalHOC</NavLink>
                        </div>
                    </li>

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    );
}
