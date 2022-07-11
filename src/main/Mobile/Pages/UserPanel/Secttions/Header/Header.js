import React, {useState , Fragment} from "react";
import classes from "./Header.module.css";
import {setThemeInitiate} from "../../../../../../store/actions";
import {connect} from "react-redux";
import Icon from "../../../../../../components/Icon/Icon";
import Menu from "../Menu/Menu";
import ActionSheet from "../../../../../../components/ActionSheet/ActionSheet";


const Header = (props) => {

    const [showAction, setShowAction] = useState(false);


    return (
        <Fragment>
            <div className={`container row ai-center jc-between ${classes.container} px-5`}>
                <div className={`row ai-center`}>
                    <Icon iconName="icon-th font-size-md flex" customClass={`${classes.thisIcon}`}
                          onClick={() => setShowAction((prevState) => !prevState)}
                    />
                    <h3 className={`mr-2`}>بیتکوین/تومان</h3>
                </div>

                <span>آخرین قیمت: <span className={`text-green`}>1,651,999,900</span> تومان</span>
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