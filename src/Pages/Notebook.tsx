
export default function Notebook()
{   
    let leftpage : HTMLElement | null = document.getElementById('LeftPage');
    let rightpage : HTMLElement | null = document.getElementById('RightPage');

    // this was admittedly, poorly done.

    setInterval(() => {
        if(leftpage?.hasAttribute('focused'))
            postMessage(leftpage, '');
        else if(rightpage?.hasAttribute('focused'))
            postMessage(rightpage, '');
    }, 10000)

    return(<>
        <div className='Notebook'>
            <div style={{color:'#000000'}}>
                <div id='LeftPage' className='inputField'  contentEditable='true'></div>
                <div className='divider'/>
                <div id='RightPage' className='inputField'  contentEditable='true'></div>
            </div>
        </div>
    </>)
}