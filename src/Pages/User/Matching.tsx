import '../../Stylesheets/UserPages/Matching.css';
import { useState, type FormEvent } from 'react';
import { InputField } from '../../Components/FormItems';
import { Checkbox, NextButton } from '../../Components/FormItems';
import { authFetch } from '../../api';
import { useAuth } from '../../Auth';

// Text representation of numeric form sections
const Section = Object.freeze(
{
    PriorDiagnoses: 0,
    Specialties: 1,
    Religion: 2,
    Identity: 3,
});
    
export default function Matching()
{
    const Data = new Map<string, any>();
    // used both normally but also for 'identity' page, where 3 different 'other's are shown. Could be abstracted into
    // function Otherbox({id} : {id : string})
    // {
    //      const [showOth, setShowOth] = useState(false);
    //      return {showOth && <InputField className='other' id='OtherSpecText' type='text' />}
    // }
    const [showOth, setShowOth] = useState(false);
    const [showOth1, setShowOth1] = useState(false);
    const [showOth2, setShowOth2] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { token } = useAuth();

    // can be provided by backend request before rendering
    const headers = [
        'What (if any) prior diagnoses do you have?',
        'What specialization, if any, are you seeking?',
        'Would you prefer your therapist to be of a specific religion?',
        'Do you have any preference to the identity of potential matches?'
    ];

    // called on submitting a section of the form (that isn't the last section)
    function appendFormData(formData : FormData)
    {
        formData.forEach((element, key) => {
            Data.set(key, element);
        });
        
        setShowOth(false);
        setCurrentSection(currentSection+1);
    }

    // called on form submission
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if(!token)
                return setError('Null Token???');
            await authFetch('user/matching', token, {body:JSON.stringify(Data), method:'PUT'});
                        // on return
        }
        catch (err: any) { setError(err?.detail ?? 'Submission failed'); }
        finally { setLoading(false); }
    }

    const [currentSection, setCurrentSection] = useState(0);

    return (<>
        <div className='claim'><h4 style={{fontStyle:'italic', margin:0}}>
            In order to match you with the professionals most suited to you, we need to collect information about your history and needs. Information collected is encrypted, completely confidential, and not shared with anyone. 
        </h4></div>
        <div className='RegistrationParent'>
            <div className='Registration Matching'>
                {/* shows corresponding section header */}
                <div className='ct'><p>{headers[currentSection]}</p><br/></div>
                {currentSection == Section.PriorDiagnoses && <form className='matchingFormEntry' action={appendFormData}>
                    <div>
                        {/* def not my finest work here, could do with a lot more JS'ing to organize neatly */}
                        <div className='flex-grid l'>
                            <Checkbox name='ADHD' />
                            <Checkbox name='Anxiety' />
                            <Checkbox name='Depression' />
                            <Checkbox name='PTSD' />
                        </div>
                        <div className='flex-grid'>
                            <Checkbox name='OCD' />
                            <Checkbox name='Self-Harm' />
                            <Checkbox name='Grief' />
                            <Checkbox name='Bipolar Disorder' id='BPD' />
                        </div>
                    </div>
                    <div>
                        {/* positioning of the Other field is very situational */}
                        <Checkbox name='Other' id='OtherDiag' onClick={()=>{setShowOth(!showOth)}}/>
                        {showOth && <InputField className='other' id='OtherDiagText' type='text' />}
                    </div>
                    <NextButton />
                </form>}

                {currentSection == Section.Specialties && <form className='matchingFormEntry' action={appendFormData}>
                    <div>
                        <div className='flex-grid l'>
                            <Checkbox name='CBT' id='CBT' />
                            <Checkbox name='DBT' id='DBT' />
                            <Checkbox name='Family Therapy' id='FT' />
                            <Checkbox name='Mindfulness-Based' id='MB' />
                        </div>
                        <div className='flex-grid'>
                            <Checkbox name='Multicultural' id='MC' />
                            <Checkbox name='Neurofeedback' id='NF' />
                            <Checkbox name='Somatic' id='Somatic' />
                            <Checkbox name='Trauma Focused' id='TF' />
                        </div>
                    </div>
                    <div>
                        <Checkbox name='Other' id='OtherSpec' onClick={()=>setShowOth(!showOth)}/>
                        {showOth && <InputField className='other' id='OtherSpecText' type='text' />}
                    </div>
                    <NextButton />
                </form>}

                {currentSection == Section.Religion && <form className='matchingFormEntry' action={appendFormData}>
                    <div>
                        <div className='flex-grid l'>
                            <Checkbox name='Christian' id='Christian' />
                            <Checkbox name='Muslim' id='Muslim' />
                            <Checkbox name='Jewish' id='Jewish' />
                            <Checkbox name='Buddhist' id='Buddhist' />
                        </div>
                        <div className='flex-grid'>
                            <Checkbox name='Hindu' id='Hindu' />
                            <Checkbox name='Sikh' id='Sikh' />
                            <Checkbox name='Secular' id='Secular' />
                        </div>
                    </div>
                    <div>
                        <Checkbox name='Other' id='OtherRel' onClick={()=>setShowOth(!showOth)}/>
                        {showOth && <InputField className='other' id='OtherRelText' type='text' />}
                    </div>
                    <NextButton />
                </form>}
                
                {/* onSubmit because final section */}
                {currentSection == Section.Identity && <form className='matchingFormEntry' action={appendFormData} onSubmit={handleSubmit}>
                    {error && <p className='error'>{error}</p>}
                    <div>
                        <div className='flex-grid l'>
                            <Checkbox name='Male' id='Male' />
                            <Checkbox name='Female' id='Female' />
                            <Checkbox name='Non-Binary' id='NB' />
                            <Checkbox name='Other' id='OtherGen' onClick={()=>setShowOth(!showOth)}/>
                            {showOth && <InputField className='other' id='OtherGenText' type='text' />}
                        </div>
                        <div className='flex-grid l'>
                            <Checkbox name='Straight' id='Straight' />
                            <Checkbox name='Gay' id='Gay' />
                            <Checkbox name='Lesbian' id='Lesbian' />
                            <Checkbox name='Other' id='OtherSex' onClick={()=>setShowOth1(!showOth1)}/>
                            {showOth1 && <InputField className='other' id='OtherSexText' type='text' />}
                        </div>
                        <div className='flex-grid'>
                            <Checkbox name='White Non-Hispanic' id='WhiteNH' />
                            <Checkbox name='Black' id='Black' />
                            <Checkbox name='Hispanic' id='Hispanic' />
                            <Checkbox name='Asian' id='Asian' />
                            <Checkbox name='Arabic' id='Arabic' />
                            <Checkbox name='Other' id='OtherRace' onClick={()=>setShowOth2(!showOth2)}/>
                            {showOth2 && <InputField className='other' id='OtherRaceText' type='text' />}    
                        </div>
                    </div>
                    <div>
                        <br /><NextButton disabled={loading} text={loading ? 'Submitting...' : 'Submit'}/>
                    </div>
                </form>}
            </div>
        </div>
    </>);
}