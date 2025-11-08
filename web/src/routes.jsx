import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./pages/home.jsx"; // Verifique se o nome está Maiúsculo
import IdPage from "./pages/idPage.jsx"; // Verifique se o nome está Maiúsculo

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/home'} element={<Home />}/>
                <Route path={'/produto/:id'} element={<IdPage />}/>

                <Route path='*' element={<Navigate to={'/home'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}