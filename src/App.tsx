import { Outlet } from 'react-router'
import Banner from './Components/Banner/Banner'

export const UserTypes = Object.freeze({
    None:-1,
    User:0,
    Therapist:1,
    Admin:2,
});

export class Status
{
    static loggedIn : boolean;
    static UserType : number = UserTypes.None;  
    static inCall : boolean;
}

function App() {
    return (<>
        <Banner />
        <Outlet/>
    </>)
}
export default App