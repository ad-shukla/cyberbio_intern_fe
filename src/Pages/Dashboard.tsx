import '../Stylesheets/UserPages/Dashboard.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Status, UserTypes } from '../App';

export default function Dashboard() {
    const nav = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className='dashboard-container'>
            <div className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <button className='sidebar-toggle' onClick={toggleSidebar}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d={sidebarCollapsed ? "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" : "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"} />
                    </svg>
                </button>
                
                <div className='sidebar-content'>
                    <div className='sidebar-section'>
                        <h3 className='sidebar-title'>Navigation</h3>
                        <div className='sidebar-menu'>
                            <div className='sidebar-item active'>
                                <svg className='sidebar-icon' viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                </svg>
                                <span className='sidebar-text'>Dashboard</span>
                            </div>
                            
                            {Status.UserType === UserTypes.User && (
                                <>
                                    <div className='sidebar-item' onClick={() => nav("/Calendar")}>
                                        <svg className='sidebar-icon' viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                        </svg>
                                        <span className='sidebar-text'>Calendar</span>
                                    </div>
                                    <div className='sidebar-item' onClick={() => nav("/Notebook")}>
                                        <svg className='sidebar-icon' viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                        </svg>
                                        <span className='sidebar-text'>Notebook</span>
                                    </div>
                                </>
                            )}
                            
                            {Status.UserType === UserTypes.Therapist && (
                                <div className='sidebar-item' onClick={() => nav("/Contacts")}>
                                    <svg className='sidebar-icon' viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.06 7H16c-.8 0-1.54.37-2.01.99L12 10v8c0 1.1.9 2 2 2h8z"/>
                                    </svg>
                                    <span className='sidebar-text'>Patients</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='sidebar-section'>
                        <h3 className='sidebar-title'>Account</h3>
                        <div className='sidebar-menu'>
                            <div className='sidebar-item'>
                                <svg className='sidebar-icon' viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span className='sidebar-text'>Settings</span>
                            </div>
                            <div className='sidebar-item'>
                                <svg className='sidebar-icon' viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                                </svg>
                                <span className='sidebar-text'>Privacy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='dashboard-main'>
                <div className='dashboard-header'>
                    <h1 className='dashboard-title'>
                        Welcome to Your Secure Dashboard
                    </h1>
                    <p className='dashboard-subtitle'>
                        Your anonymous therapy journey starts here. All communications are encrypted and secure.
                    </p>
                </div>

                <div className='dashboard-grid'>
                    <div className='dashboard-card'>
                        <div className='card-header'>
                            <h3 className='card-title'>Security Status</h3>
                            <div className='card-icon'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                                </svg>
                            </div>
                        </div>
                        <div className='card-content'>
                            <div className='card-metric'>100%</div>
                            <div className='card-label'>Secure & Anonymous</div>
                            <p style={{ marginTop: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                Your identity is completely protected with end-to-end encryption.
                            </p>
                        </div>
                    </div>

                    <div className='dashboard-card'>
                        <div className='card-header'>
                            <h3 className='card-title'>Sessions</h3>
                            <div className='card-icon'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                        </div>
                        <div className='card-content'>
                            <div className='card-metric'>0</div>
                            <div className='card-label'>Completed Sessions</div>
                            <p style={{ marginTop: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                Start your first therapy session today.
                            </p>
                        </div>
                    </div>

                    <div className='dashboard-card'>
                        <div className='card-header'>
                            <h3 className='card-title'>Next Appointment</h3>
                            <div className='card-icon'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                            </div>
                        </div>
                        <div className='card-content'>
                            <div className='card-metric'>--</div>
                            <div className='card-label'>No appointments scheduled</div>
                            <p style={{ marginTop: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
                                Schedule your first session to get started.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='quick-actions'>
                    <h2 className='quick-actions-title'>Quick Actions</h2>
                    <div className='actions-grid'>
                        <div className='action-button' onClick={() => nav("/Calendar")}>
                            <div className='action-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                            </div>
                            <h3 className='action-title'>Schedule Session</h3>
                            <p className='action-description'>Book your next therapy appointment</p>
                        </div>

                        <div className='action-button' onClick={() => nav("/Notebook")}>
                            <div className='action-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                            </div>
                            <h3 className='action-title'>Open Notebook</h3>
                            <p className='action-description'>Write in your private journal</p>
                        </div>

                        <div className='action-button'>
                            <div className='action-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                            <h3 className='action-title'>Secure Messages</h3>
                            <p className='action-description'>Communicate with your therapist</p>
                        </div>

                        <div className='action-button'>
                            <div className='action-icon'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <h3 className='action-title'>Resources</h3>
                            <p className='action-description'>Access helpful mental health resources</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}