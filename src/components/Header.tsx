import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logout from '../functions/logout';
import { useNavigate } from 'react-router-dom';
import { getOneUser } from '../functions/getOneUser';
import { firestore } from '../App';
import { ToastContainer, toast } from "react-toastify";


function Header(){
    const location = useLocation();
    const page = location.pathname.split('/')[1];
    const [active, setActive] = useState(page);
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();

    function searchSerie(){
        const query = document.getElementById('serieSrch') as HTMLInputElement;
        const endQuery = query.value.trim();
        if(endQuery !== '') {
        navigate('/series/search/' + endQuery + '/1');
        }
    }

    useEffect(() => {
        setActive(page)
        if(localStorage.getItem('userId')){
            getOneUser({db: firestore, userId: localStorage.getItem('userId')}).then((res) => {
                if(!res.user){
                    localStorage.removeItem('userId')
                    toast.error("User doesn't exist", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        autoClose: 3000,
                    });
                    navigate('/')
                } else {
                    setUser(res.user)
                }
            })
        } else {
            setUser({});
            if(page === 'profile' || page === 'followed' || page === 'calendar'){
                toast.error("You must be logged in to access this page", {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    autoClose: 3000,
                });
                navigate('/');
            }
        }
    }
    , [page])

    return(
        <header>
            <ToastContainer />
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
                        <Link className={active === 'profile' ? 'active' : ''} to="/profile">Profil</Link>
                    </div>
                </div>
                <div className='searchBar'>
                    <input type="text" id="serieSrch" placeholder="Rechercher une série" onKeyUp={(e) => {if(e.key === 'Enter'){searchSerie()}}} />
                    <button className='btn-reset' type="submit" onClick={searchSerie}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className='userZone'>
                    {!user.username ? (
                    <div className='navtab'>
                        <Link className={active === 'register' ? 'active' : ''} to="/register">Register</Link>
                        |
                        <Link className={active === 'login' ? 'active' : ''} to="/login">Login</Link>
                    </div> ) : (
                    <div className='navtab'>
                        <Link className={(active === 'logout' || active === 'logout') ? 'active' : ''} to="/" onClick={logout}>Logout</Link>
                    </div> 
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Header;