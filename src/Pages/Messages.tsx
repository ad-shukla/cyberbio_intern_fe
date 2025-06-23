import '../Stylesheets/UserPages/Messages.css'
import { Status } from '../App'
import { useNavigate } from 'react-router'

export default function Messages() {
    const nav = useNavigate();

    if (!Status.loggedIn) {
        nav("/");
        return null;
    }

    return (
        <div className='messages-container'>
            <div className='messages-layout'>
                <div className='messages-sidebar'>
                    <div className='messages-header'>Messages</div>
                    <div className='message-list'>
                        <div className='message-item active'>
                            <div className='message-indicator'></div>
                            <span>Messager</span>
                        </div>
                        <div className='message-item'>
                            <span>Messager</span>
                        </div>
                        <div className='message-item'></div>
                        <div className='message-item'></div>
                        <div className='message-item'></div>
                        <div className='message-item'></div>
                    </div>
                </div>
                
                <div className='messages-main'>
                    <div className='chat-header'>
                        <div className='chat-title'>Messager</div>
                        <div className='chat-subtitle'>Message</div>
                    </div>
                    <div className='chat-content'>
                        {/* Chat messages would go here */}
                    </div>
                </div>
            </div>
        </div>
    );
}