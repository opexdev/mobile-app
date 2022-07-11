import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./Secttions/Header/Header";
import SubHeader from "./Secttions/SubHeader/SubHeader";
import Content from "./Secttions/Content/Content";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import * as RoutesName from "../../Routes/routes";


const userPanel = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path={RoutesName.TechnicalRelative} element={""}/>
            </Route>
            <Route path="*" element={
                <div className={`height-100 column`}>
                    <Header/>
                    <SubHeader/>
                    <Content/>
                </div>
            }/>
        </Routes>
    );
};

export default userPanel;
