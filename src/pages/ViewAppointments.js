import React, { useCallback, useEffect, useState } from 'react'
import './styles/Table.css'
import axios from 'axios';
import * as constantsClass from '../components/apiCalling';

const ViewAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const apiUrl = constantsClass.apiUrl;

  const fetchAppointments = useCallback( async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl + '/viewappointments',
      headers: {}
    };

    try {
      var response = await axios(config);
      setAppointments(response.data.Items)
    } catch (error) {
      console.log(error);
    }
  },[apiUrl])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments]);


  return (
    <div className="table" id="results">
      <div className='theader'>
        <div className='table_header'>Name</div>
        <div className='table_header'>Banner ID</div>
        <div className='table_header'>Appointment Date</div>
      </div>
      {appointments.map(obj => {
        return (
          <div className='table_row' key = {obj.id}>
            <div className='table_small'>
              <div className='table_cell'>Header One</div>
              <div className='table_cell'>{obj.name}</div>
            </div>
            <div className='table_small'>
              <div className='table_cell'>Header Two</div>
              <div className='table_cell'>{obj.bannerID}</div>
            </div>
            <div className='table_small'>
              <div className='table_cell'>Header Three</div>
              <div className='table_cell'>{obj.date}</div>
            </div>
          </div>)
      })}
      {appointments.length===0? <h2><center>No records found</center></h2> : <div></div>}

    </div>
  )
}

export default ViewAppointments