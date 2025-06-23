import '../Stylesheets/UserPages/FindProfessionals.css'
import { Status } from '../App'
import { useNavigate } from 'react-router'

export default function FindProfessionals() {
    const nav = useNavigate();

    if (!Status.loggedIn) {
        nav("/");
        return null;
    }

    return (
        <div className='find-professionals-container'>
            <div className='find-professionals-layout'>
                <div className='professionals-sidebar'>
                    <div className='professionals-header'>Find Professionals?</div>
                    <div className='search-section'>
                        <div className='search-item'>
                            <span>Search Professionals</span>
                            <div className='search-icon'>🔍</div>
                        </div>
                    </div>
                    <div className='professionals-list'>
                        <div className='professional-item'></div>
                        <div className='professional-item'></div>
                        <div className='professional-item'></div>
                        <div className='professional-item'></div>
                        <div className='professional-item'></div>
                    </div>
                </div>
                
                <div className='professionals-main'>
                    <div className='matching-header'>
                        <div className='matching-title'>Matching</div>
                        <div className='matching-subtitle'>Out</div>
                    </div>
                    <div className='matching-content'>
                        {/* Matching results would go here */}
                    </div>
                </div>
            </div>
        </div>
    );
}