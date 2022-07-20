import React, {useState , Fragment} from "react";
import classes from "./Header.module.css";
import {setThemeInitiate} from "../../../../../../store/actions";
import {connect, useDispatch} from "react-redux";
import Icon from "../../../../../../components/Icon/Icon";
import Menu from "../Menu/Menu";
import ActionSheet from "../../../../../../components/ActionSheet/ActionSheet";
import SideMenu from "../../../../../../components/SideMenu/SideMenu";
import {showSideMenu} from "../../../../../../store/actions/global";


const Header = (props) => {

    const [showAction, setShowAction] = useState(false);
    const dispatch = useDispatch();


    return (
        <Fragment>
            <div className={`container row ai-center jc-between ${classes.container} px-5`}>
                <div className={`row ai-center`}>
                    <Icon iconName="icon-menu_vertical font-size-md-plus-plus flex" onClick={()=>dispatch(showSideMenu(true))}/>

                    <h3 className={`mr-2`}>بیتکوین/تومان</h3>
                </div>

                <Icon iconName="icon-th font-size-md flex" customClass={`${classes.thisIcon}`}
                      onClick={() => setShowAction((prevState) => !prevState)}
                />


            </div>

                <ActionSheet show={showAction} onChangeShow={(state)=>setShowAction(state)}>
                    <Menu/>
                </ActionSheet>

                {/*<ActionSheet show={!showAction} onChangeShow={(state)=>setShowAction(state)}>
                    <span>new action</span>
                </ActionSheet>*/}



        </Fragment>

    );
};

const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);