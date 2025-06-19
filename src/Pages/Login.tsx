import '../Stylesheets/UserPages/Registration.css'
import { Status, UserTypes } from '../App'
import { useNavigate } from 'react-router'

export default function Login()
{
    const nav = useNavigate();
    function login (formData : FormData)
    {
        formData.get("email");
        formData.get("password");
        {/* Get corresponding email's hash */}
        {/* And also user's permission level */}
        /*bcrypt.compareSync(password, hasname);*/
        Status.loggedIn = true;
        Status.UserType = UserTypes.User;
        nav("/Dashboard")
    }
    return (<div className='RegistrationParent'>
        <div className='Registration'>
            <form className='formEntry' action={login}>
                <label htmlFor="email"> Email <input
                    title="email"
                    id="email"
                    autoComplete="email webauthn"
                    type="email"
                    required />
                </label> <br />
                <label htmlFor="password"> Password <input
                    title="password"
                    id="password"
                    type="password"
                    autoComplete="current-password webauthn"
                    required />
                </label> <br />
                <div className='formButtons'>
                    <button className='submitButton' onClick={()=>nav("/Registration")}>Register</button>
                    <button className='submitButton' type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>)
}