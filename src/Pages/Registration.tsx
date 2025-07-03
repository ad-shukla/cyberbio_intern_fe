import '../Stylesheets/UserPages/Registration.css'
import bcrypt from "bcryptjs";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Status, UserTypes } from '../App';

const Section = Object.freeze({
    Login: 0,
    Name: 1,
    Address: 2,
    UserType: 3,
    Certificate: 4
});

export default function Registration() {
    const nav = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [selectedUserType, setSelectedUserType] = useState<number | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [showTermsModal, setShowTermsModal] = useState(false);
    
    const strengthTarget = 100;
    const Data = new Map<String, any>();
    Data.set("version", 0);

    const sectionTitles = [
        "Create Account",
        "Personal Information", 
        "Address Details",
        "Account Type",
        "Professional Verification"
    ];

    function applyFormData(formData: FormData) {
        formData.forEach((element, key) => {
            if (key === "password") {
                if (checkPasswordStrength(element as string)) {
                    element = bcrypt.hashSync(element as string, 12);
                } else return false;
            }
            Data.set(key, element);
        });
        setCurrentSection(currentSection + 1);
    }

    function checkPasswordStrength(pswd: string) {
        const lowerCaseLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        const upperCaseLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const digits = ['0','1','2','3','4','5','6','7','8','9'];

        const lowerStrengthCoeff = 6;
        const upperStrengthCoeff = 6;
        const digitStrengthCoeff = 4;
        const specialStrengthCoeff = 18;

        let LCLC = 0, UCLC = 0, DC = 0, SCC = 0, score = 0, i = 0;
        while (i < pswd.length) {
            if (lowerCaseLetters.find(x => x === pswd[i])) {
                LCLC++;
            } else if (upperCaseLetters.find(x => x === pswd[i])) {
                UCLC++;
            } else if (digits.find(x => x === pswd[i])) {
                DC++;
            } else {
                SCC++;
            }
            i++;
        }

        score += LCLC * lowerStrengthCoeff;
        score += DC * digitStrengthCoeff;
        score += UCLC * upperStrengthCoeff;
        score += SCC * specialStrengthCoeff;
        
        score = Math.min(score, strengthTarget);
        setPasswordStrength(score);
        
        return score >= strengthTarget;
    }

    function handleProfilePictureChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target?.result as string);
                Data.set('profilePicture', e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    function submit() {
        setShowTermsModal(true);
    }

    function acceptTerms() {
        JSON.stringify(Data);
        Status.loggedIn = true;
        setShowTermsModal(false);
        nav("/Dashboard");
    }

    function declineTerms() {
        setShowTermsModal(false);
    }

    return (
        <div className='registration-container'>
            <div className='registration-card'>
                <div className='registration-header'>
                    <h1 className='registration-title'>{sectionTitles[currentSection]}</h1>
                    <p className='registration-subtitle'>
                        {currentSection === 0 && "Join our secure platform for anonymous therapy"}
                        {currentSection === 1 && "Tell us a bit about yourself"}
                        {currentSection === 2 && "We need your address for verification"}
                        {currentSection === 3 && "Choose your account type"}
                        {currentSection === 4 && "Upload your professional credentials"}
                    </p>
                </div>

                <div className='progress-indicator'>
                    {Array.from({ length: 5 }, (_, i) => (
                        <div 
                            key={i} 
                            className={`progress-step ${i <= currentSection ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className='form-section'>
                    {currentSection === Section.Login && (
                        <form action={applyFormData}>
                            <div className='form-grid'>
                                <div className='form-column'>
                                    <div className='form-group'>
                                        <label htmlFor="email" className='form-label'>Email Address</label>
                                        <input
                                            className='form-input'
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className='form-column'>
                                    <div className='form-group'>
                                        <label htmlFor="password" className='form-label'>Password</label>
                                        <input
                                            className='form-input'
                                            name="password"
                                            id="password"
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="Create a strong password"
                                            minLength={10}
                                            required
                                            onChange={(e) => checkPasswordStrength(e.currentTarget.value)}
                                        />
                                        <div className='password-strength'>
                                            <div className='strength-label'>
                                                <span>Password Strength</span>
                                                <span>{passwordStrength}/{strengthTarget}</span>
                                            </div>
                                            <progress 
                                                className='strength-progress' 
                                                max={strengthTarget} 
                                                value={passwordStrength}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='profile-picture-section'>
                                <div className='profile-picture-upload'>
                                    <div className='profile-picture-preview'>
                                        {profilePicture ? (
                                            <img src={profilePicture} alt="Profile preview" />
                                        ) : (
                                            <div className='profile-picture-placeholder'>
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        className='profile-picture-input'
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                    />
                                    <button
                                        type="button"
                                        className='profile-picture-button'
                                        onClick={() => document.getElementById('profilePicture')?.click()}
                                    >
                                        {profilePicture ? 'Change Photo' : 'Add Profile Photo (Optional)'}
                                    </button>
                                </div>
                            </div>
                            
                            <div className='form-actions'>
                                <button className='btn-primary' type="submit">
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentSection === Section.Name && (
                        <form action={applyFormData}>
                            <div className='form-grid'>
                                <div className='form-column'>
                                    <div className='form-group'>
                                        <label htmlFor="firstname" className='form-label'>First Name</label>
                                        <input
                                            className='form-input'
                                            name="firstname"
                                            id="firstname"
                                            autoComplete="given-name"
                                            placeholder="Enter your first name"
                                            required
                                        />
                                    </div>
                                    
                                    <div className='form-group'>
                                        <label htmlFor="middlename" className='form-label'>Middle Name (Optional)</label>
                                        <input
                                            className='form-input'
                                            name="middlename"
                                            id="middlename"
                                            autoComplete="additional-name"
                                            placeholder="Enter your middle name"
                                        />
                                    </div>
                                </div>
                                
                                <div className='form-column'>
                                    <div className='form-group'>
                                        <label htmlFor="lastname" className='form-label'>Last Name</label>
                                        <input
                                            className='form-input'
                                            name="lastname"
                                            id="lastname"
                                            autoComplete="family-name"
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                    
                                    <div className='form-group'>
                                        <label htmlFor="birthdate" className='form-label'>Date of Birth</label>
                                        <input
                                            className='form-input'
                                            name="birthdate"
                                            id="birthdate"
                                            autoComplete="bday"
                                            type="date"
                                            min="1940-01-01"
                                            max="2020-01-01"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='form-actions'>
                                <button 
                                    className='btn-secondary' 
                                    type="button"
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                >
                                    Back
                                </button>
                                <button className='btn-primary' type="submit">
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentSection === Section.Address && (
                        <form action={applyFormData}>
                            <div className='form-grid'>
                                <div className='form-column'>
                                    <div className='form-group'>
                                        <label htmlFor="streetadr" className='form-label'>Street Address</label>
                                        <input
                                            className='form-input'
                                            name="streetadr"
                                            id="streetadr"
                                            autoComplete="street-address"
                                            placeholder="Enter your street address"
                                            required
                                        />
                                    </div>
                                    
                                    <div className='form-group'>
                                        <label htmlFor="cityadr" className='form-label'>City</label>
                                        <input
                                            className='form-input'
                                            name="cityadr"
                                            id="cityadr"
                                            autoComplete="address-level2"
                                            placeholder="Enter your city"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className='form-column'>
                                    <div className='form-group'>
                                        <label htmlFor="stateadr" className='form-label'>State/Province</label>
                                        <input
                                            className='form-input'
                                            name="stateadr"
                                            id="stateadr"
                                            autoComplete="address-level1"
                                            placeholder="Enter your state or province"
                                            required
                                        />
                                    </div>
                                    
                                    <div className='form-group'>
                                        <label htmlFor="countryadr" className='form-label'>Country</label>
                                        <input
                                            className='form-input'
                                            name="countryadr"
                                            id="countryadr"
                                            autoComplete="country-name"
                                            placeholder="Enter your country"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='form-actions'>
                                <button 
                                    className='btn-secondary' 
                                    type="button"
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                >
                                    Back
                                </button>
                                <button className='btn-primary' type="submit">
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {currentSection === Section.UserType && (
                        <div>
                            <div className='user-type-selection'>
                                <div 
                                    className={`user-type-card ${selectedUserType === UserTypes.User ? 'selected' : ''}`}
                                    onClick={() => setSelectedUserType(UserTypes.User)}
                                >
                                    <div className='user-type-icon'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                    </div>
                                    <h3 className='user-type-title'>Patient</h3>
                                    <p className='user-type-description'>
                                        Seeking mental health support and therapy sessions
                                    </p>
                                </div>
                                
                                <div 
                                    className={`user-type-card ${selectedUserType === UserTypes.Therapist ? 'selected' : ''}`}
                                    onClick={() => setSelectedUserType(UserTypes.Therapist)}
                                >
                                    <div className='user-type-icon'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                        </svg>
                                    </div>
                                    <h3 className='user-type-title'>Professional</h3>
                                    <p className='user-type-description'>
                                        Licensed therapist providing mental health services
                                    </p>
                                </div>
                            </div>
                            
                            <div className='form-actions'>
                                <button 
                                    className='btn-secondary' 
                                    type="button"
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                >
                                    Back
                                </button>
                                <button 
                                    className='btn-primary' 
                                    disabled={selectedUserType === null}
                                    onClick={() => {
                                        if (selectedUserType === UserTypes.User) {
                                            Status.UserType = UserTypes.User;
                                            submit();
                                        } else {
                                            setCurrentSection(currentSection + 1);
                                        }
                                    }}
                                >
                                    {selectedUserType === UserTypes.User ? 'Complete Registration' : 'Continue'}
                                </button>
                            </div>
                        </div>
                    )}

                    {currentSection === Section.Certificate && (
                        <div>
                            <div className='form-group'>
                                <label className='form-label'>Professional License</label>
                                <div style={{ 
                                    padding: 'var(--spacing-8)', 
                                    border: '2px dashed var(--border-medium)', 
                                    borderRadius: 'var(--radius-lg)', 
                                    textAlign: 'center',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto var(--spacing-4)' }}>
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                    </svg>
                                    <p>Upload your professional license and credentials</p>
                                    <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-2)' }}>
                                        Accepted formats: PDF, JPG, PNG (Max 10MB)
                                    </p>
                                </div>
                            </div>
                            
                            <div className='form-actions'>
                                <button 
                                    className='btn-secondary' 
                                    type="button"
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                >
                                    Back
                                </button>
                                <button 
                                    className='btn-primary' 
                                    onClick={() => {
                                        Status.UserType = UserTypes.Therapist;
                                        submit();
                                    }}
                                >
                                    Complete Registration
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='login-link'>
                    <p>Already have an account? <a href="#" onClick={() => nav("/Login")}>Sign in here</a></p>
                </div>
            </div>

            {/* Terms and Conditions Modal */}
            {showTermsModal && (
                <div className='terms-modal-overlay'>
                    <div className='terms-modal'>
                        <div className='terms-modal-header'>
                            <h2 className='terms-modal-title'>Terms and Conditions</h2>
                        </div>
                        <div className='terms-modal-content'>
                            <p>
                                This product is designed to provide safe, private, and secure access to therapy and other mental health resources. We are committed to protecting your name, personal information, IP address, and all usage data. While we adhere to industry-standard cybersecurity practices and protocols, no system is completely immune to potential security threats. As such, we cannot guarantee absolute protection against unauthorized access or data breaches.
                            </p>
                        </div>
                        <div className='terms-modal-actions'>
                            <button 
                                className='terms-decline-button'
                                onClick={declineTerms}
                            >
                                Decline
                            </button>
                            <button 
                                className='terms-accept-button'
                                onClick={acceptTerms}
                            >
                                Accept & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}