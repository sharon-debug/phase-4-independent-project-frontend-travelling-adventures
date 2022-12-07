import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import RubyVacationsNavLogoTransparent from '../assets/RubyVacationsNavLogoTransparent.gif';
import "./NarBar.css";

function NavBar({ setUser, setIsAuthenticated }) {
    const history = useNavigate()
    function handleLogout(){
        fetch('/logout', {
            method: 'DELETE',
        }).then(() => {
            setIsAuthenticated(false)
            setUser(null)
            history.push('/')
        });
    }

    return (
        <div className='nav'>
            <div className='logo-div'>
                {/* <img src={RubyVacationsNavLogoTransparent} className="Nav-logo" alt="logo" /> */}
            </div>
            <div className='links-div'>
                <h1><Link to="/userprofile" className='nav-links'>PROFLE</Link></h1>
                <h1><Link to="/myvisits" className='nav-links'>MY VISITS</Link></h1>
                <h1><Link to="/myreviews" className='nav-links'>MY REVIEWS</Link></h1>
                <h1><Link to="/availablehouses" className='nav-links'>AVAILABLE HOUSES</Link></h1>
            </div>
            <div className="navLogoutDiv">
                <button  className="navLogout"  onClick={handleLogout}>LOG OUT</button>
            </div>
        </div>
    )
}
 
export default NavBar;