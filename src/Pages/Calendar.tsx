import '../Stylesheets/UserPages/Calendar.css'
import { Status } from '../App'
import { useNavigate } from 'react-router'

export default function Calendar() {
    const nav = useNavigate();

    if (!Status.loggedIn) {
        nav("/");
        return null;
    }

    return (
        <div className='calendar-container'>
            <div className='calendar-content'>
                <div className='appointment-list'>
                    <div className='appointment-item'>
                        <div className='appointment-info'>
                            <div className='appointment-title'>Dr. Doctor</div>
                            <div className='appointment-time'>2:00pm - 2:45pm</div>
                        </div>
                        <div className='appointment-actions'>
                            <button className='btn-message'>Message</button>
                            <button className='btn-reschedule'>Reschedule</button>
                            <button className='btn-cancel'>Cancel</button>
                        </div>
                    </div>
                    
                    <div className='appointment-slot'></div>
                    <div className='appointment-slot'></div>
                    <div className='appointment-slot'></div>
                </div>
            </div>
        </div>
    );
}