import React, { useCallback, useEffect, useState } from 'react'
import './styles/Table.css'
import axios from 'axios';
import * as constantsClass from '../components/apiCalling';

const ViewVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const apiUrl = constantsClass.apiUrl;

  const fetchVolunteers= useCallback(async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl + '/viewvolunteers',
      headers: {}
    };

    try {
      var response = await axios(config);
      setVolunteers(response.data.Items)
    } catch (error) {
      console.log(error);
    }
  },[apiUrl])

  useEffect(() => {
    fetchVolunteers()
  }, [fetchVolunteers]);


  return (
    <div className="table" id="results">
      <div className='theader'>
        <div className='table_header'>Name</div>
        <div className='table_header'>Email</div>
        <div className='table_header'>Date</div>
        <div className='table_header'>Hours</div>
      </div>

      {volunteers.map(obj => {
        return (
          <div className='table_row' key = {obj.id}>
            <div className='table_small'>
              <div className='table_cell'>Header One</div>
              <div className='table_cell'>{obj.name}</div>
            </div>
            <div className='table_small'>
              <div className='table_cell'>Header Two</div>
              <div className='table_cell'>{obj.email}</div>
            </div>
            <div className='table_small'>
              <div className='table_cell'>Header Three</div>
              <div className='table_cell'>{obj.date}</div>
            </div>
            <div className='table_small'>
              <div className='table_cell'>Header Three</div>
              <div className='table_cell'>{obj.hours}</div>
            </div>
          </div>)
      })}
      {volunteers.length===0? <h2><center>No records found</center></h2> : <div></div>}
    </div>
  )
}

export default ViewVolunteers