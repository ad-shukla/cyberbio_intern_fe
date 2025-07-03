import { Status } from "../App"
import { useNavigate } from "react-router"
import Banner from "../Components/Banner/Banner"
export default function Invalid()
{
    const nav = useNavigate();

    return(<>
        <Banner />
        <div style={{position:"relative", textAlign:"center"}}>
            Looks like something went wrong {<br />}
            Error Code: 400 Bad Request {<br />}
            <button onClick={()=>nav(Status.loggedIn ? "/Landing" : "/")}>Return to Home</button>
        </div>
    </>)
}