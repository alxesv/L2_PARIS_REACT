import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import logout from '../functions/logout';
import { useNavigate } from 'react-router-dom';
import { getOneUser } from '../functions/getOneUser';
import { firestore } from '../App';
import { ToastContainer, toast } from "react-toastify";
import logo from '../ressources/logo.png';
import NotifContainer from './NotifContainer';

function Header(){
    const location = useLocation();
    const page = location.pathname.split('/')[1];
    const [active, setActive] = useState(page);
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const [notif, setNotif] = useState(false);
    const [allowNotif, setAllowNotif] = useState(false);

    function searchSerie(){
        const query = document.getElementById('serieSrch') as HTMLInputElement;
        const endQuery = query.value.trim();
        if(endQuery !== '') {
        navigate('/series/search/' + endQuery + '/1');
        }
    }

    function handleLogout(){
        logout();
        setUser({});
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
                    res.user['id'] = localStorage.getItem('userId');
                    setUser(res.user)
                }
            })
        } else {
            setUser({});
            if(page === 'profile' || page === 'followed' || page === 'calendar' || page === 'notifications'){
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
                navigate('/login');
            }
        }
    }
    , [page])

    function showNotif(){
        const notifContainer = document.querySelector('.notifContainer') as HTMLDivElement;
        notifContainer.classList.toggle('visible');
        notifContainer.classList.toggle('hide');
        const notifButton = document.getElementById('notifButton') as HTMLButtonElement;
        notifButton.classList.toggle('active');
    }

    return(
        <header>
            <ToastContainer />
            <nav className='navbar'>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                    <span>Popcorn Series</span>
                </div>
                <div className='tabs'>
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
                        <button className={notif ? "notifOn btn-reset" : "btn-reset" } id="notifButton" onClick={showNotif}><FontAwesomeIcon icon={faBell}/></button>
                        <Link className={(active === 'logout' || active === 'logout') ? 'active' : ''} to="/login" onClick={handleLogout}>Logout</Link>
                    </div> 
                    )}
                </div>
            </nav>
            <NotifContainer currentUser={user} notifChanger={setNotif}/>
        </header>
    )
}
export default Header;