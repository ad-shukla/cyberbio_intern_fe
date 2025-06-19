import '../Stylesheets/Landing.css'
import { useNavigate } from 'react-router'

export default function Landing() {
    const nav = useNavigate();

    return (
        <div className='landing-container'>
            <section className='hero-section'>
                <div className='hero-content'>
                    <h1 className='hero-title'>
                        100% Anonymous Therapy
                    </h1>
                    <p className='hero-subtitle'>
                        Secure, private, and professional mental health support with cutting-edge cybersecurity protection. Your privacy is our priority.
                    </p>
                    <div className='hero-actions'>
                        <button 
                            className='cta-button'
                            onClick={() => nav("/Registration")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Get Started
                        </button>
                        <button 
                            className='secondary-button'
                            onClick={() => nav("/Login")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                            </svg>
                            Sign In
                        </button>
                    </div>
                </div>
            </section>

            <section className='features-section'>
                <div className='features-container'>
                    <h2 className='features-title'>Why Choose Our Platform?</h2>
                    <p className='features-subtitle'>
                        Experience the future of secure mental health care with our advanced cybersecurity measures and anonymous therapy sessions.
                    </p>
                    
                    <div className='features-grid'>
                        <div className='feature-card'>
                            <div className='feature-icon'>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                                </svg>
                            </div>
                            <h3 className='feature-title'>Complete Anonymity</h3>
                            <p className='feature-description'>
                                Your identity remains completely protected with our advanced encryption and anonymous communication protocols.
                            </p>
                        </div>

                        <div className='feature-card'>
                            <div className='feature-icon'>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                                </svg>
                            </div>
                            <h3 className='feature-title'>Professional Therapists</h3>
                            <p className='feature-description'>
                                Connect with licensed mental health professionals who specialize in secure, anonymous therapy sessions.
                            </p>
                        </div>

                        <div className='feature-card'>
                            <div className='feature-icon'>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                                </svg>
                            </div>
                            <h3 className='feature-title'>Secure Communication</h3>
                            <p className='feature-description'>
                                All communications are encrypted end-to-end with military-grade security protocols to ensure your privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}