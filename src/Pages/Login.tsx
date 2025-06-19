import '../Stylesheets/UserPages/Login.css'
import { Status, UserTypes } from '../App'
import { useNavigate } from 'react-router'

export default function Login() {
    const nav = useNavigate();
    
    function login(formData: FormData) {
        const email = formData.get("email");
        const password = formData.get("password");
        
        // TODO: Implement actual authentication logic
        // Get corresponding email's hash and user's permission level
        // bcrypt.compareSync(password, hashname);
        
        Status.loggedIn = true;
        Status.UserType = UserTypes.User;
        nav("/Dashboard");
    }

    return (
        <div className='login-container'>
            <div className='login-card'>
                <div className='login-header'>
                    <h1 className='login-title'>Welcome Back</h1>
                    <p className='login-subtitle'>
                        Sign in to your secure therapy account
                    </p>
                </div>

                <form className='login-form' action={login}>
                    <div className='form-group'>
                        <label htmlFor="email" className='form-label'>Email Address</label>
                        <input
                            className='form-input'
                            name="email"
                            id="email"
                            autoComplete="email webauthn"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input
                            className='form-input'
                            name="password"
                            id="password"
                            type="password"
                            autoComplete="current-password webauthn"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className='form-actions'>
                        <button className='btn-primary' type="submit">
                            Sign In
                        </button>
                        <button 
                            className='btn-secondary' 
                            type="button"
                            onClick={() => nav("/Registration")}
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className='forgot-password'>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        Forgot your password?
                    </a>
                </div>

                <div className='security-notice'>
                    <div className='security-icon'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                        </svg>
                    </div>
                    <div className='security-text'>
                        Your connection is secured with end-to-end encryption. Your privacy and anonymity are our top priorities.
                    </div>
                </div>

                <div className='register-link'>
                    <p>Don't have an account? <a href="#" onClick={() => nav("/Registration")}>Sign up here</a></p>
                </div>
            </div>
        </div>
    );
}