import '../../Stylesheets/Banner.css'
import { Status } from '../../App'
import { UserTypes } from '../../App'
import { useNavigate, useLocation } from 'react-router'

export default function Banner() {
    const nav = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className='banner'>
            <button 
                className="banner-logo" 
                onClick={() => Status.loggedIn ? nav("/Dashboard") : nav("/")}
            >
                <img src='../../logo.png' alt="Logo" />
                <span>CyberBioSec</span>
            </button>
            
            {Status.loggedIn && (
                <nav className='banner-nav'>
                    {Status.UserType === UserTypes.User && (
                        <>
                            <button 
                                className={`nav-button ${isActive('/Dashboard') ? 'active' : ''}`}
                                onClick={() => nav("/Dashboard")}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                </svg>
                                Dashboard
                            </button>
                            <button 
                                className={`nav-button ${isActive('/Calendar') ? 'active' : ''}`}
                                onClick={() => nav("/Calendar")}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                                Calendar
                            </button>
                            <button 
                                className={`nav-button ${isActive('/Notebook') ? 'active' : ''}`}
                                onClick={() => nav("/Notebook")}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                                Notebook
                            </button>
                        </>
                    )}
                    {Status.UserType === UserTypes.Therapist && (
                        <>
                            <button 
                                className={`nav-button ${isActive('/Dashboard') ? 'active' : ''}`}
                                onClick={() => nav("/Dashboard")}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                </svg>
                                Dashboard
                            </button>
                            <button 
                                className={`nav-button ${isActive('/Contacts') ? 'active' : ''}`}
                                onClick={() => nav("/Contacts")}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.06 7H16c-.8 0-1.54.37-2.01.99L12 10v8c0 1.1.9 2 2 2h8z"/>
                                </svg>
                                Patients
                            </button>
                        </>
                    )}
                </nav>
            )}
            
            <div className='banner-actions'>
                {!Status.loggedIn ? (
                    location.pathname !== "/Login" && (
                        <button 
                            className="login-button" 
                            onClick={() => nav("/Login")}
                        >
                            Sign In
                        </button>
                    )
                ) : (
                    <div className="user-menu">
                        <div className="user-avatar">
                            {Status.UserType === UserTypes.User ? 'U' : 
                             Status.UserType === UserTypes.Therapist ? 'T' : 'A'}
                        </div>
                        <button 
                            className="logout-button" 
                            onClick={() => {
                                Status.loggedIn = false; 
                                Status.UserType = UserTypes.None; 
                                nav("/");
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}