import { useNavigate } from "react-router-dom";
import classes from "./styles/NavBar.module.css";



const NavBar = () => {

    const navigate = useNavigate();

    const navigatePage = (path) => {
        navigate(path);
    }


    return (
        <div className={classes.NavBar}>

            <div className={classes.NavBarHeader} onClick={()=> navigatePage('/')}>
                Food for all
            </div>

            <div className={classes.NavBarItems}>
                <div onClick={()=> navigatePage('/login_as_admin')}>
                    Login as Admin
                </div>
                <div onClick={()=> navigatePage('/make_appointment')}>
                    Make appointment
                </div>
                <div onClick={()=> navigatePage('/delete_appointment')}>
                    Delete appointment
                </div>
                <div onClick={()=> navigatePage('/volunteer')}>
                    Volunteer
                </div>

            </div>
        </div>
    );
}

export default NavBar;