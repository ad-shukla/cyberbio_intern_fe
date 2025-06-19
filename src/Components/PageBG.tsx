import '../Stylesheets/PageBG.css'
import type { CSSProperties, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

export function Spacer({ className, style, children } : {className?:string, style?:CSSProperties, children?:ReactNode})
{
    return <div className={className} style={style}>
        {children}
    </div>
}

export function LargePane(props: PropsWithChildren)
{
    return <div className='largePane'>
        {props.children}
    </div>;
}

export function SmallPane(props: PropsWithChildren)
{
    return <div className='smallPane'>
        {props.children}
    </div>;
}

export function PaneTab({ className, style, children, onClick, text } : {className?:string, style?:CSSProperties, children?:ReactNode, onClick?:MouseEventHandler, text?:string})
{
    return <button className={"paneTab " + className} style={style} onClick={onClick}>
        {children}
        {text}
    </button>
}

export function tabToggle()
{
    if(!document.getElementsByClassName("smallPane")[0].classList.contains("minimized"))
        document.getElementsByClassName("smallPane")[0].classList.add("minimized");
    else document.getElementsByClassName("smallPane")[0].classList.remove("minimized");
}