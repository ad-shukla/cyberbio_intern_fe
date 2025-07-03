import '../../Stylesheets/Banner.css'
import { Status } from '../../App'
import { UserTypes } from '../../App'
import { useNavigate, useLocation } from 'react-router'

export default function Banner() {
    const nav = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    // Get profile picture from localStorage if available
    const profilePicture = localStorage.getItem('profilePicture');

    return (
        <div className='banner'>
            <button 
                className="banner-logo" 
                onClick={() => Status.loggedIn ? nav("/Dashboard") : nav("/")}
            >
                <span>[Product Name]</span>
            </button>
            
            {Status.loggedIn && (
                <nav className='banner-nav'>
                    <button 
                        className={`nav-button ${isActive('/Calendar') ? 'active' : ''}`}
                        onClick={() => nav("/Calendar")}
                    >
                        Calendar
                    </button>
                    
                    {Status.UserType === UserTypes.User && (
                        <>
                            <button 
                                className={`nav-button ${isActive('/FindProfessionals') ? 'active' : ''}`}
                                onClick={() => nav("/FindProfessionals")}
                            >
                                Find Professionals?
                            </button>
                            <button 
                                className={`nav-button ${isActive('/Notebook') ? 'active' : ''}`}
                                onClick={() => nav("/Notebook")}
                            >
                                Notebook
                            </button>
                        </>
                    )}
                    
                    {Status.UserType === UserTypes.Therapist && (
                        <button 
                            className={`nav-button ${isActive('/Contacts') ? 'active' : ''}`}
                            onClick={() => nav("/Contacts")}
                        >
                            Contacts
                        </button>
                    )}
                    
                    <button 
                        className={`nav-button ${isActive('/Messages') ? 'active' : ''}`}
                        onClick={() => nav("/Messages")}
                    >
                        Messages
                    </button>
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
                            {profilePicture ? (
                                <img src={profilePicture} alt="Profile" style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                Status.UserType === UserTypes.User ? 'U' : 
                                Status.UserType === UserTypes.Therapist ? 'T' : 'A'
                            )}
                        </div>
                        <button 
                            className="logout-button" 
                            onClick={() => {
                                Status.loggedIn = false; 
                                Status.UserType = UserTypes.None; 
                                localStorage.removeItem('profilePicture');
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