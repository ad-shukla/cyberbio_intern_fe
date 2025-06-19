import '../Stylesheets/UserPages/Notebook.css'
import { Status } from '../App'
import { useNavigate } from 'react-router'

export default function Notebook()
{
    const nav = useNavigate();
    return (<>
    {Status.loggedIn ? <div className='Notebook'>
        <div>
            <circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle><circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle>
        </div>
    </div> : nav("/")}
    </>)
}