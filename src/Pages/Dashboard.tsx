import '../Stylesheets/PageBG.css'
import '../Stylesheets/UserPages/Dashboard.css'
import { LargePane, SmallPane, Spacer, PaneTab, tabToggle } from '../Components/PageBG';

export default function Dashboard()
{
    return (<>
        <div className='panes'>
            <SmallPane>
                <PaneTab onClick={()=>tabToggle()} text="≡" />
            </SmallPane>
            <LargePane>
                <Spacer className='verticalSpacer' style={{width:"5%"}} />
                <div>
                    <h1> 100% Anonymous Therapy </h1>
                        <h2> 100% of the time</h2>
                </div>
            </LargePane>
        </div>
    </>);
}