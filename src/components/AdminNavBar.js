import { useNavigate } from "react-router-dom";
import classes from "./styles/NavBar.module.css";



const AdminNavBar = () => {

    const navigate = useNavigate();

    const navigatePage = (path) => {
        navigate(path);
    }

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }


    return (
        <div className={classes.NavBar}>

            <div className={classes.NavBarHeader} onClick={()=> navigatePage('/')}>
                Food for all
            </div>

            <div className={classes.NavBarItems}>
                <div onClick={()=> navigatePage('/view_appointment')}>
                    View appointment
                </div>
                <div onClick={()=> navigatePage('/view_volunteers')}>
                    View Volunteers
                </div>
                <div onClick={()=> navigatePage('/send_notifications')}>
                    Send Notifications
                </div>
                <div onClick={()=> logout()}>
                    Logout
                </div>

            </div>
        </div>
    );
}

export default AdminNavBar;