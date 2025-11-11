import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./components/Home.jsx"; // Verifique se o nome está Maiúsculo
import IdPage from "./components/IdPage.jsx"; // Verifique se o nome está Maiúsculo
import Cadastro from "./components/Cadastro.js";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/home'} element={<Home />}/>
                <Route path={'/produto/:id'} element={<IdPage />}/>
                <Route path={'/cadastro'} element={<Cadastro />}/>

                <Route path='*' element={<Navigate to={'/home'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}