import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadConfig} from "../../store/actions";
import "./Mobille.css";
import {Navigate, Route, Routes} from "react-router-dom";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import Header from "./Secttions/Header/Header";
import {Overview} from "../../routes/routes";
import SubHeader from "./Secttions/SubHeader/SubHeader";
import i18n from "i18next";
import Content from "./Secttions/Content/Content";


const Mobile = () => {

    const isLoading = useSelector((state) => state.global.isLoading)
    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch();

    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    useEffect(() => {
        dispatch(loadConfig())
        i18n.language !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        });
    }, []);

    if (isLoading) {
        return <FullWidthLoading/>
    }

    return (
        <Routes>
            {/*<Route path="/login" element={<Login/>}/>*/}

            <Route exact path="/" element={<Navigate to={Overview} replace/>}/>

            <Route  path="/*" element={

                <>
                    <ReactTooltip data-html={true} data-effect="float"/>
                    <div className={`mobile-container column`}>
                        <Header/>
                        <SubHeader/>
                        <Content/>
                    </div>
                </>

            }/>

        </Routes>
    );
};

export default Mobile;
