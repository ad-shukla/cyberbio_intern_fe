import '../../Stylesheets/Banner.css'
import { Status } from '../../App'
import { UserTypes } from '../../App'
import { useNavigate } from 'react-router'
export default function Banner()
{
    const nav = useNavigate();

    return (<div className='banner'>
        <button onClick={()=>Status.loggedIn ? nav("/Dashboard") : nav("/")}>
            <img src='../../logo.png' height={"60pt"}/>
        </button>
        <div className='buttonsSmall'>
            {Status.loggedIn && (
                (Status.UserType == UserTypes.User && (<>
                    <button onClick={()=>nav("/Calendar")}>Calendar</button>
                    <button onClick={()=>nav("/Notebook")}>Notebook</button>
                </>))
                ||
                (Status.UserType == UserTypes.Therapist && (<>
                    <button></button>
                </>))
                ||
                (Status.UserType == UserTypes.Admin && (<>
                    <button></button>
                </>))
            )}
        </div>
        <div className='spacer' />
        <div className='buttonsSmall' style={{justifyContent:"flex-end"}}>
            {!Status.loggedIn ? 
                location.pathname != "/Login" ? <button onClick={()=>nav("/Login")}>Login</button> : <></>
            :
                <button onClick={()=>{Status.loggedIn = false; Status.UserType = UserTypes.None; nav("/");}}>Logout</button>}
        </div>
    </div>)
}