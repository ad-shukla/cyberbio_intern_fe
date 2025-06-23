import '../Stylesheets/UserPages/Dashboard.css'
import { Status } from '../App'
import { useNavigate } from 'react-router'

export default function Dashboard() {
    const nav = useNavigate();

    if (!Status.loggedIn) {
        nav("/");
        return null;
    }

    return (
        <div className='dashboard-container'>
            <div className='dashboard-content'>
                <div className='dashboard-welcome'>
                    <h1 className='dashboard-title'>
                        Welcome to Your Dashboard
                    </h1>
                    <p className='dashboard-subtitle'>
                        Your secure therapy platform. All communications are private and encrypted.
                    </p>
                </div>

                <div className='dashboard-grid'>
                    <div className='dashboard-card'>
                        <h3 className='card-title'>Security Status</h3>
                        <div className='card-content'>
                            <p>Your connection is secure and anonymous.</p>
                        </div>
                    </div>

                    <div className='dashboard-card'>
                        <h3 className='card-title'>Sessions</h3>
                        <div className='card-content'>
                            <p>0 completed sessions</p>
                        </div>
                    </div>

                    <div className='dashboard-card'>
                        <h3 className='card-title'>Next Appointment</h3>
                        <div className='card-content'>
                            <p>No appointments scheduled</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}