import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header(){
    const location = useLocation();
    const page = location.pathname.split('/')[1];
    const [active, setActive] = useState(page);
    useEffect(() => {
        setActive(page)
    }
    , [page])

    return(
        <header>
            <nav className='navbar'>
                <div className='logo'>placeholder</div>
                <div className='tabs'>
                    <div className='navtab'>
                        <Link className={active === '' ? 'active' : ''} to="/">Accueil</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={(active === 'series' || active === 'serie') ? 'active' : ''} to="/series/1">Séries</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={active === 'followed' ? 'active' : ''} to="/followed">Suivies</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={active === 'calendar' ? 'active' : ''} to="/calendar">Calendar</Link>
                    </div>
                    <div className='navtab'>
                        <Link className={active === 'user' ? 'active' : ''} to="/user/1">Profil</Link>
                    </div>
                </div>
                <div className='searchBar'>
                    <input type="text" placeholder="Rechercher une série" />
                    <button type="submit">Rechercher</button>
                </div>
                <div className='userZone'>
                    login | logout
                </div>
            </nav>
        </header>
    )
}
export default Header;