
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
import MakeAppointment from './pages/MakeAppointment';
import Volunteer from './pages/Volunteer';
import DeleteAppointment from './pages/DeleteAppointment';
import AdminNavBar from './components/AdminNavBar';
import ViewVolunteers from './pages/ViewVolunteers';
import ViewAppointments from './pages/ViewAppointments';
import SendNotifications from './pages/SendNotifications';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      { localStorage.User ? <AdminNavBar/> : <NavBar/> }
        <Routes>
          <Route path="/login_as_admin" element={<AdminLogin/>} />
          <Route path="/make_appointment" element={<MakeAppointment/>} />
          <Route path="/delete_appointment" element={<DeleteAppointment/>} />
          <Route path="/volunteer" element={<Volunteer/>} />
          <Route path="/view_appointment" element={<ViewAppointments/>} />
          <Route path="/view_volunteers" element={<ViewVolunteers/>} />
          <Route path="/send_notifications" element={<SendNotifications/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;