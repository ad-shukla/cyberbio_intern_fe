import '../../Stylesheets/UserPages/Registration.css';
import { useState, type FormEvent } from 'react';
import { authFetch, } from '../../api';
import { Dropdown } from '../../Components/FormItems';
import { useAuth } from '../../Auth';

// keeps track of registration data
const Data = new Map<string, any>();

export default function ClinicianRegistration()
{
    // set by network traffic
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // used to track the selected license, I think could be replaced with just a normal let though
    const [licenseType, setLicenseType] = useState('');

    // for API validation
    Data.set('version', 0);

    
    const { token } = useAuth();

    // abstraction system to synchonously set Data and re-render the page with the new data
    function setData(d : string, s : string)
    {
        FuncRef.get(d)?.(s);
        Data.set(d, s);
    }
    const FuncRef = new Map<string, Function>();
    FuncRef.set('License', setLicenseType);

    async function submitLicensing(e: FormEvent)
    {
        // keeps the submit button from navigating off the page immediately on click
        e.preventDefault();
        setError(null);
        setLoading(true);

        // allows for multiple errors at once
        let errorlist : string[] = [];

        // since dropdown not an 'input' class, must manually validate fill
        let lt = Data.get('License');
        if(lt == undefined || lt == '>')
        {
            errorlist.push('Set a License type')
        }
        

        if(errorlist.length > 0)
        {
            setError(errorlist.toString());
            setLoading(false);
            return;
        }

        try {
            if(!token)
                return setError('Null token???');
            await authFetch('clinician/licensingSubmission', token, {body:JSON.stringify(Data), method:'PUT'});
            // on return
        }
        catch (err: any) { setError(err?.detail ?? 'Lookup failed'); }
        finally { setLoading(false); }
    }
    return (<div className='RegistrationParent'>
        <div className='Registration'>
            <form onSubmit={submitLicensing} className='registrationFormEntry'>
                {error && <><p className='error'>{error}</p> <br /></>}
                Licensing Board: <Dropdown id='License' itemCBFun={setData} itemCBVal={licenseType}>
                    {/* makes it visually clear what the current selection is */}
                    {(licenseType.startsWith('>') ? '' : '>') + licenseType} 
                    {'LPC'}
                    {'LCSW'}
                    {'PsyD'}
                </Dropdown>

                License Number: <input id='licenseNumber' type='text' inputMode='numeric' required onBeforeInput={(e) => {
                    // ensures that only numbers can be entered in the field, without could input 'e' and '.'
                    let nextVal = e.currentTarget.value.substring(0, e.currentTarget.selectionStart??0) +
                    (e.data ?? '') +
                    e.currentTarget.value.substring(e.currentTarget.selectionEnd??0)
                        if(!/^(\d{0,9}|\d{3}-?\d{0,4}|)$/.test(nextVal)) {
                            e.preventDefault();
                }}} onChange={(value)=>Data.set('licenseNumber', value.currentTarget.value)}/>
                
                <button className='submitButton' type='submit' disabled={loading} >{loading ? 'Awaiting Lookup...' : 'Submit'}</button>
            </form>
        </div>
    </div>);
}