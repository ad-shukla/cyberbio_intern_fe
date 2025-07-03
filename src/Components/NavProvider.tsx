import { useAuth } from '../Auth';
import { ClinicianRoutes, PrivateRoutes, VideocallRoutes } from '../main';
import { useEffect, type ReactElement } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';

export let Nav : NavigateFunction;
// Allows for all pages to call the same provider, keeping performance high and allowing for centralized logic regarding
// restricted paths and whatnot.
export default function NavProvider({ children } : { children: ReactElement})
{
    Nav = useNavigate();
    const { token } = useAuth();
    
    useEffect(() =>
    {
        let cd = location.pathname.split(RegExp('\/$'));
        if(!token && PrivateRoutes.has(cd[0]))
            Nav('/');
        if(!token && ClinicianRoutes.has(cd[1] + '/' + cd[2]))
            Nav('/');
        if(!token && VideocallRoutes.has(cd[1]))
            Nav('/');
    },[Nav, token]);
    
    return (<>
        { children }
    </>)
}