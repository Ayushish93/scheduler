
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import "components/Appointment";

import { filter } from "lodash/fp";



export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  // function to get spots remaining
  function getSpotsForDay(state, day) {
    const foundDay = state.days.find(d => d.name === day);
  
    if (!foundDay) throw new Error(`No Day Found: ${day}`);
  
    return filter(id => state.appointments[id].interview === null)(
      foundDay.appointments
    ).length;
  }
  
  
    
  // function to book and update appoinment
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
      
    };

    
    // updaing db with the new appointment
    let url = `/api/appointments/${id}`;
  
    return axios.put(url, { ...appointment })
      .then(res => {

        setState({
          ...state,
          days: state.days.map(day => ({
            ...day,
            spots: getSpotsForDay({ ...state, appointments }, day.name)
          })),
          appointments
          
        });
  
      })

  }
  
  
  
  // function to cancel appoinment
  function cancelInterview(id) {
  
    const appointment = {
      ...state.appointments[id],
        interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let url = `/api/appointments/${id}`;

    return  axios.delete(url,{...appointment})
    .then(res => {
      
      setState((prev) =>  ({
        ...prev,
        days: state.days.map(day => ({
          ...day,
          spots: getSpotsForDay({ ...state, appointments }, day.name)
        })),
        appointments
      }));
    
    })
    
  }
  
  const setDay = day => setState({ ...state, day });
  
  // making api request using axios
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // set  states  with the correct values...

      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  

  return({
    state,
    setDay,
    bookInterview,
    cancelInterview


  })
  
}