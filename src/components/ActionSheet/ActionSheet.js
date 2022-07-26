import React, {useEffect, useState} from "react";
import classes from "./ActionSheet.module.css";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Menu from "../../main/Mobile/Pages/UserPanel/Secttions/Menu/Menu";
import SubMenu from "../../main/Mobile/Pages/UserPanel/Secttions/SubMenu/SubMenu";
import {activeActionSheet} from "../../store/actions/global";


const ActionSheet = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const active = useSelector((state) => state.global.activeActionSheet)

    const [isFirst, setIsFirst] = useState(false);

    useEffect(() => {
        dispatch(activeActionSheet({
            menu: false,
            subMenu: false,
        }))
    }, [location.pathname])

    const onClickHandler = () => {
        dispatch(activeActionSheet({
            menu: false,
            subMenu: false,
        }))
        setIsFirst(true)
    }
    const classHandler = () => {
        if (isFirst && (!active.menu && !active.subMenu)) {
            return classes.close
        }
        if (active.menu || active.subMenu) {
            return classes.show
        }
    }

    return (
        <>
            <div className={`container ${classes.wrapper} ${(active.menu || active.subMenu) && classes.show}`}
                 onClick={onClickHandler}/>
            <div className={`container ${classes.container} column jc-end  ${classHandler()}`}>
                <div className={`${classes.header} flex jc-center ai-center py-2`} onClick={onClickHandler}><span/>
                </div>
                {active.menu && <Menu/>}
                {active.subMenu && <SubMenu/>}
            </div>
        </>
    );
};

export default ActionSheet;