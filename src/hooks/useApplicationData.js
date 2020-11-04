
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import "components/Appointment";





export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });
  
  function updateInterview(id, interview) {
    console.log("from update");
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
          appointments
          
        });
        

      })

  }
    
    

  function bookInterview(id, interview) {
    console.log("from bookinterview");
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
      
    };

    
    const foundDay = state.days.find((dayEntry) => {
      if(dayEntry.appointments.includes(id)) {
        // dayEntry.spots -= 1;
        return dayEntry;

      }
    })
    
    foundDay.spots -= 1;

    const days = state.days.map((dayEntry) => {
      if(dayEntry.id === foundDay.id) {
        return foundDay 
      } else {
        return dayEntry
      }
    })

    
    // updaing db with the new appointment
    let url = `/api/appointments/${id}`;
  
    return axios.put(url, { ...appointment })
      .then(res => {
        
        setState({
          ...state,
          appointments,
          days
        });
        
  
      })

  }
  
  
  

  function cancelInterview(id) {
  
  const appointment = {
    ...state.appointments[id],
      interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const foundDay = state.days.find((dayEntry) => {
    if(dayEntry.appointments.includes(id)) {
      // dayEntry.spots += 1;
      return dayEntry;

    }
  })
  foundDay.spots += 1;

  const days = state.days.map((dayEntry) => {
    if(dayEntry.id === foundDay.id) {
      return foundDay 
    } else {
      return dayEntry
    }
  })

  let url = `/api/appointments/${id}`;

  return  axios.delete(url,{...appointment})
  .then(res => {
    
    setState((prev) =>  ({
      ...prev,
      appointments,
      days
    }));
  
  })
    
  }
  
  const setDay = day => setState({ ...state, day });
  
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...

      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);



  return({
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateInterview


  })
  
}