import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logout from '../functions/logout';

function Header(){
    const location = useLocation();
    const page = location.pathname.split('/')[1];
    const [active, setActive] = useState(page);

    useEffect(() => {
        setActive(page)
    }
    , [page])

    if(localStorage.getItem('userId') !== null){
        return(
            <header>
                <nav className='navbar'>
                    <div className='logo'>placeholder</div>
                    <div className='tabs'>
                        <div className='navtab'>
                            <Link className={active === '' ? 'active' : ''} to="/">Accueil</Link>
                        </div>
                        <div className='navtab'>
                            <Link className={active === 'user' ? 'active' : ''} to="/user/1">Profil</Link>
                        </div>
                        <div className='navtab'>
                            <Link className={active === 'calendar' ? 'active' : ''} to="/calendar">Calendar</Link>
                        </div>
                        <div className='navtab'>
                            <Link className={(active === 'series' || active === 'serie') ? 'active' : ''} to="/series/1">Séries</Link>
                        </div>
                    </div>
                    <div className='userZone'>
                        <div className='navtab'>
                            <Link className={(active === 'logout' || active === 'logout') ? 'active' : ''} to="/" onClick={logout}>Logout</Link>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

    return(
        <header>
            <nav className='navbar'>
                <div className='logo'>placeholder</div>
                <div className='tabs'>
                    <div className='navtab'>
                        <Link className={active === '' ? 'active' : ''} to="/">Accueil</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={active === 'user' ? 'active' : ''} to="/user/1">Profil</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={active === 'calendar' ? 'active' : ''} to="/calendar">Calendar</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={(active === 'series' || active === 'serie') ? 'active' : ''} to="/series/1">Séries</Link>
                    </div>
                </div>
                <div className='userZone'>
                    <div className='navtab'>
                        <Link className={(active === 'register' || active === 'register') ? 'active' : ''} to="/register">Register</Link>
                        /
                        <Link className={(active === 'login' || active === 'login') ? 'active' : ''} to="/login">Login</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header;