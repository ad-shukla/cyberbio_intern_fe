import '../Stylesheets/UserPages/Dashboard.css'
import { Status, UserTypes } from '../App'
import { useNavigate } from 'react-router'

export default function Dashboard() {
    const nav = useNavigate();

    if (!Status.loggedIn) {
        nav("/");
        return null;
    }

    const isUser = Status.UserType === UserTypes.User;
    const isTherapist = Status.UserType === UserTypes.Therapist;

    return (
        <div className='dashboard-container'>
            <div className='dashboard-content'>
                {/* Welcome Section */}
                <div className='dashboard-welcome'>
                    <div className='welcome-text'>
                        <h1 className='dashboard-title'>
                            Welcome back{isUser ? ', Patient' : isTherapist ? ', Doctor' : ''}
                        </h1>
                        <p className='dashboard-subtitle'>
                            Your secure therapy platform. All communications are private and encrypted.
                        </p>
                    </div>
                    <div className='security-badge'>
                        <div className='security-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                            </svg>
                        </div>
                        <span>Secure Connection</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='quick-actions'>
                    <h2 className='section-title'>Quick Actions</h2>
                    <div className='actions-grid'>
                        <button 
                            className='action-card primary'
                            onClick={() => nav("/Calendar")}
                        >
                            <div className='action-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
                                </svg>
                            </div>
                            <div className='action-content'>
                                <h3>View Calendar</h3>
                                <p>Check your appointments</p>
                            </div>
                        </button>

                        <button 
                            className='action-card'
                            onClick={() => nav("/Messages")}
                        >
                            <div className='action-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20V16Z"/>
                                </svg>
                            </div>
                            <div className='action-content'>
                                <h3>Messages</h3>
                                <p>Secure communication</p>
                            </div>
                        </button>

                        {isUser && (
                            <>
                                <button 
                                    className='action-card'
                                    onClick={() => nav("/FindProfessionals")}
                                >
                                    <div className='action-icon'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z"/>
                                        </svg>
                                    </div>
                                    <div className='action-content'>
                                        <h3>Find Professionals</h3>
                                        <p>Connect with therapists</p>
                                    </div>
                                </button>

                                <button 
                                    className='action-card'
                                    onClick={() => nav("/Notebook")}
                                >
                                    <div className='action-icon'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                        </svg>
                                    </div>
                                    <div className='action-content'>
                                        <h3>Notebook</h3>
                                        <p>Personal journal</p>
                                    </div>
                                </button>
                            </>
                        )}

                        {isTherapist && (
                            <button 
                                className='action-card'
                                onClick={() => nav("/Contacts")}
                            >
                                <div className='action-icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16,4C16.88,4 17.67,4.84 17.67,5.84C17.67,6.82 16.88,7.68 16,7.68C15.12,7.68 14.33,6.82 14.33,5.84C14.33,4.84 15.12,4 16,4M16,10.33C18.76,10.33 21,12.57 21,15.33V21H11V15.33C11,12.57 13.24,10.33 16,10.33M8,4C8.88,4 9.67,4.84 9.67,5.84C9.67,6.82 8.88,7.68 8,7.68C7.12,7.68 6.33,6.82 6.33,5.84C6.33,4.84 7.12,4 8,4M8,10.33C10.76,10.33 13,12.57 13,15.33V21H3V15.33C3,12.57 5.24,10.33 8,10.33Z"/>
                                    </svg>
                                </div>
                                <div className='action-content'>
                                    <h3>Patient Contacts</h3>
                                    <p>Manage your patients</p>
                                </div>
                            </button>
                        )}
                    </div>
                </div>

                {/* Status Cards */}
                <div className='status-section'>
                    <div className='status-grid'>
                        <div className='status-card'>
                            <div className='status-header'>
                                <h3>Next Appointment</h3>
                                <div className='status-icon'>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='status-content'>
                                <p className='status-value'>No appointments scheduled</p>
                                <button 
                                    className='status-action'
                                    onClick={() => nav("/Calendar")}
                                >
                                    Schedule Now
                                </button>
                            </div>
                        </div>

                        <div className='status-card'>
                            <div className='status-header'>
                                <h3>Messages</h3>
                                <div className='status-icon'>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20V16Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='status-content'>
                                <p className='status-value'>0 unread messages</p>
                                <button 
                                    className='status-action'
                                    onClick={() => nav("/Messages")}
                                >
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className='status-card'>
                            <div className='status-header'>
                                <h3>{isUser ? 'Sessions Completed' : 'Active Patients'}</h3>
                                <div className='status-icon'>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9,12L11,14L15,10L20,15H4L9,12Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='status-content'>
                                <p className='status-value'>{isUser ? '0 sessions' : '0 patients'}</p>
                                <span className='status-subtitle'>This month</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className='activity-section'>
                    <h2 className='section-title'>Recent Activity</h2>
                    <div className='activity-list'>
                        <div className='activity-item empty'>
                            <div className='activity-icon'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                                </svg>
                            </div>
                            <div className='activity-content'>
                                <p className='activity-title'>Welcome to the platform!</p>
                                <p className='activity-subtitle'>Your secure therapy journey begins here</p>
                                <span className='activity-time'>Just now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}