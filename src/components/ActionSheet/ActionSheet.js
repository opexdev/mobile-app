import React, {useEffect, useState} from "react";
import classes from "./ActionSheet.module.css";
import {useLocation, useNavigate} from "react-router-dom";



const ActionSheet = ({children , show , onChangeShow}) => {

    const location = useLocation();


  /*  const [showAction, setShowAction] = useState(show);*/
    const [isFirst, setIsFirst] = useState(false);

   /* useEffect(() => {
        setShowAction(show)
    }, [show]);

    useEffect(() => {
        onChangeShow(showAction)
    }, [showAction]);
*/

    useEffect(() => {
        onChangeShow(false)
    },[location.pathname])

    const onClickHandler = ()=> {
        onChangeShow(false)
        setIsFirst(true)

    }
    const classHandler = ()=> {
       if (isFirst && !show){
           return classes.close
       }
       if (show){
           return classes.show
       }
    }

    return (
        <>
            <div className={`container ${classes.wrapper} ${ show ? classes.show : ""}`} onClick={onClickHandler}/>
            <div className={`container ${classes.container} column jc-end py-2  ${classHandler()}`}>
                <div className={`${classes.header} flex jc-center ai-center pb-1`} onClick={onClickHandler}><span/></div>
                {children}
            </div>
        </>
    );
};

export default ActionSheet;