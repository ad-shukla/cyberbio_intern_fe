import './Stylesheets/global.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router"
import { AuthProvider } from './Auth'; 

import Login from './Pages/Login.tsx'
import Invalid from './Pages/Invalid.tsx'
import Landing from './Pages/Landing.tsx'
import Notebook from './Pages/Notebook.tsx'
import Calendar from './Pages/Calendar.tsx'
import Contacts from './Pages/Contacts.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import Registration from './Pages/Registration.tsx'
import Messages from './Pages/Messages.tsx'
// import FindProfessionals from './Pages/FindProfessionals.tsx'
import Matching from './Pages/User/Matching.tsx';
import ClinicianRegistration from './Pages/Clinician/ClinicianRegistration.tsx'
import VideoCall from './Pages/VideoCall.tsx';


export const PrivateRoutes = new Map<String, any>(
[
    ['/Calendar', Calendar],
    ['/Contact', Contacts],
    ['/Notebook', Notebook],
    ['/Matching', Matching]
]);

export const ClinicianRoutes = new Map<String, any>([
    ['Clinician/Registration', ClinicianRegistration]
]);

export const VideocallRoutes = new Map<String, any>([
    ['VideoCall', VideoCall]
]);


createRoot(document.getElementById('root')!).render(
    <AuthProvider> <BrowserRouter> <Routes>
    <Route path='*' Component={Invalid} />
        <Route path='/' Component={App}>
            <Route index={true} Component={Landing} />
            <Route path='Registration' Component={Registration} />
            <Route path='Clinician/Registration' Component={ClinicianRegistration} />
            <Route path='Login' Component={Login} />
            
            <Route path="Dashboard" Component={Dashboard} />

            <Route path='Calendar' Component={Calendar} />
            <Route path='Contacts' Component={Contacts} />
            <Route path='Notebook' Component={Notebook} />
            <Route path='Matching' Component={Matching} />
            <Route path="Messages" Component={Messages} />
            <Route path='VideoCall' Component={VideoCall} />
        </Route>
    </Routes> </BrowserRouter> </AuthProvider>
)


// createRoot(document.getElementById('root')!).render(
//     <BrowserRouter>
//         <Routes>
//             <Route path="*" Component={Invalid} />
//             <Route path="/" Component={App}>
//                 <Route index={true} Component={Landing} />
//                 <Route path="Registration" Component={Registration} />
//                 <Route path="Login" Component={Login} />
                
//                 <Route path="Dashboard" Component={Dashboard} />
//                 <Route path="Calendar" Component={Calendar} />
//                 <Route path="Contacts" Component={Contacts} />
//                 <Route path="Notebook" Component={Notebook} />
//                 <Route path="Messages" Component={Messages} />
//                 <Route path="FindProfessionals" Component={FindProfessionals} />
//             </Route>
//         </Routes>
//     </BrowserRouter>
// )