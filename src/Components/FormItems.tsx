import { useState } from 'react';
import type { MouseEventHandler, ChangeEventHandler, ReactNode } from 'react';

export function NextButton({ disabled, text = 'Next' } : { disabled? : boolean, text? : string})
{
    return <button className='submitButton' type='submit' disabled={disabled}> {text} </button>
}

export function SubmitButton({ radioGroup, disabled, text, func } : {radioGroup? : string, disabled? : boolean, text : string, func : MouseEventHandler<HTMLButtonElement>})
{
    return <button className='submitButton' radioGroup={radioGroup} disabled={disabled} onClick={func}>
    {text} </button>
}

export function Checkbox({ info, name, id, column, onClick } : { info? : string, name : string, id? : string, column? : number, onClick? : MouseEventHandler})
{
    id ??= name;
    return <div className='checkbox'>{info ? <InfoBubblet info={info}></InfoBubblet> : <></>}
    <label htmlFor={id} style={{gridColumn:column, paddingInline:'15px'}}> {name} <input
        type='checkbox'
        name={name}
        title={name}
        id={id}
        onClick={onClick}/>
    </label>
    </div>;
}

export function InputField({ className, name, id, type, autoComplete, required = false, onChange } : { className? : string, name? : string, id? : string, type? : string, autoComplete? : string, required? : boolean, onChange? : ChangeEventHandler })
{
    id ??= name;
    return <label htmlFor={id}> {name}: <>
    <input type={type ? type : ''}
        className={className ? className : undefined}
        autoComplete={autoComplete ? autoComplete : undefined}
        name={name}
        title={name}
        id={id}
        required={required}
        onChange={onChange}/> </>
    </label>
}

export function InfoBubblet({ info } : { info : string })
{
    return <div className='bubblet'>
        <div className='info'>
            {info}
        </div>
        i
    </div>
}

export function Dropdown({ children, id, itemCBFun, itemCBVal } : { children : string[], id : string, itemCBFun : Function, itemCBVal : any })
{
    let [n, sN] = useState(false);

    const cn = children.map(itemName => (
        <button role='radio' key={itemName} radioGroup={id} onClick={()=>itemCBFun(id, itemName)}>{itemName}</button>));
        
    return <div role='radiogroup' className='dropdown' id={id} onClick={()=>sN(!n)} aria-required={true}> {
        n && <div className='ddHolder' style={{height:(Math.min(100, cn.length * 25) + 1 + 'px')}}>
            {cn}
        </div>
        }{(!n ? (itemCBVal as string).startsWith('>') ? (itemCBVal as string).substring(1) : itemCBVal : "")}
    </div>
}

export function VerticalExpander()
{
    return <div className='verticalExpander'>
    </div>;
}

export function InfoBox({ children } : { children? : ReactNode })
{
    return <div className='infobox'>
        {children}
    </div>
}