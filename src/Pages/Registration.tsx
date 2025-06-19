import '../Stylesheets/UserPages/Registration.css'
import bcrypt from "bcryptjs";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Status, UserTypes } from '../App';

const Section = Object.freeze(
    {
        Login: 0,
        Name: 1,
        Address: 2,
        UserType: 3,
        Certificate: 4
    });
    
export default function Registration()
{
    const nav = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    
    const strengthtarget = 100;
    
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    const Data = new Map<String, any>();
    Data.set("version", 0);

    function applyFormData(formData : FormData)
    {
        formData.forEach((element, key) => {
            if(key == "password")
            {
                if(checkPasswordStrength(element as string))
                    element = bcrypt.hashSync(element as string, 12);
                else return false;
            }
            Data.set(key, element);
        });
        setCurrentSection(currentSection+1);
    }
    
    return (<div className='RegistrationParent'>
        <div className='Registration'>
            {currentSection == Section.Login && <form className='formEntry' action={applyFormData}>
                <label htmlFor="email"> Email: <input
                    title="email"
                    id="email"
                    autoComplete="email"
                    type="email"
                    required />
                </label> <br />
                <label htmlFor="password"> Password: <input
                    title="password"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={10}
                    required
                    onChange={(_) => checkPasswordStrength(_.currentTarget.value)}/>
                </label> <br /> <div className='verticalSpan' />
                Strength ({passwordStrength}/{strengthtarget}): <progress max={strengthtarget} value={passwordStrength}></progress>
                
                <button className='submitButton' type="submit"> Next </button>
            </form>}

            {currentSection == Section.Name && <form className='formEntry' action={applyFormData}>
                <label htmlFor="firstname"> First Name: <input
                    title="First Name"
                    id="firstname"
                    autoComplete="name"
                    required />
                </label> <br />
                <label htmlFor="middlename"> Middle Name: <input
                    title="Middle Name"
                    id="middlename"
                    autoComplete="additional-name" />
                </label> <br />
                <label htmlFor="lastname"> Last Name: <input
                    title="Last Name"
                    id="lastname"
                    autoComplete="family-name"
                    required />
                </label> <br />
                <label htmlFor="birthdate"> Birthday: <input
                    title="Birth Date"
                    id="birthdate"
                    autoComplete="bday-day"
                    type="date"
                    min="1940-01-01"
                    max="2020-01-01"
                    required />
                </label> <br /> <div className='verticalSpan' />
                
                <button className='submitButton' type="submit"> Next </button>
            </form>}

            {currentSection == Section.Address && <form className='formEntry' action={applyFormData}>
                <label htmlFor="streetadr"> Street Address: <input
                    id="streetadr"
                    autoComplete="street-address"
                    required />
                </label> <br />
                <label htmlFor="cityadr"> City <input
                    id="cityadr"
                    required />
                </label> <br />
                <label htmlFor="stateadr"> State: <input
                    id="stateadr"
                    required />
                </label> <br />
                <label htmlFor="countryadr"> Country: <input
                    id="countryadr"
                    required />
                </label> <br /> <div className='verticalSpan' />
                
                <button className='submitButton' type="submit"> Next </button>
            </form>}

            {currentSection == Section.UserType && <div className='formEntry'>
                I am a... <br />
                <button className='submitButton' radioGroup='usertype' onClick={()=>
                {
                    submit();
                    // on return
                    Status.loggedIn = true;
                    Status.UserType = UserTypes.User;
                    nav("/");
                }
                }>Patient</button>
                
                <button className='submitButton' radioGroup='usertype' onClick={()=>
                    setCurrentSection(currentSection+1)
                }>Professional
                </button> <br />
            </div>}

            {/* scuffed, don't ship this. Should async
            await a good response and drop user at
            landing page */}
            {currentSection == Section.Certificate ? 
                <button className='submitButton' type='submit' onClick={()=>{
                        (
                            Status.UserType = UserTypes.Therapist,
                            submit()
                        )
                    }}>Submit
                </button>
            :
            ""
            }
        </div>
    </div>);

    function checkPasswordStrength(pswd : string)
    {
        const lowerCaseLetters : Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        const upperCaseLetters : Array<string> = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const digits : Array<string> = ['0','1','2','3','4','5','6','7','8','9'];

        const lowerStrengthCoeff = 6;
        const upperStrengthCoeff = 6;
        const digitStrengthCoeff = 4;
        const specialStrengthCoeff = 18;

        let LCLC = 0, UCLC = 0, DC = 0, SCC = 0, score = 0, i : number = 0;
        while(i < pswd.length)
        {
            if(lowerCaseLetters.find(x => x === pswd[i]))
                LCLC++;
            else if(upperCaseLetters.find(x => x === pswd[i]))
                UCLC++;
            else if(digits.find(x => x === pswd[i]))
                DC++;
            else SCC++;
            i++;
        }

        score += LCLC * lowerStrengthCoeff;
        score += DC * digitStrengthCoeff;
        score += UCLC * upperStrengthCoeff;
        score += SCC * specialStrengthCoeff;
        
        score / pswd.length;

        setPasswordStrength(score);
        if(score < strengthtarget)
        {
            return false;
        }
        return true;
    }

    function submit()
    {
        JSON.stringify(Data);
        Status.loggedIn = true;
        nav("/Dashboard")
    }
}