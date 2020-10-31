import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";







// export default function Application(props) {
//   // const [days, setDays] = useState([]);
//   // const [day, setDay] = useState("Monday");



//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],

//     appointments: {}
//   });

//    function bookInterview(id, interview) {

//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
    
//     // updaing db with the new appointment
//     let url = `/api/appointments/${id}`;
  
//     return axios.put(url, { ...appointment })
//     .then(res => {
      
//       setState({
//         ...state,
//         appointments
//       });
      

//     })

//   }

//    function cancelInterview(id) {
    
//     const appointment = {
//       ...state.appointments[id],
//        interview: null
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     let url = `/api/appointments/${id}`;
  
//     return  axios.delete(url,{...appointment})
//     .then(res => {
      
//       setState({
//         ...state,
//         appointments
//       });
    
//     })
     
//   }



//   let dailyAppointments = [];

//   const setDay = day => setState({ ...state, day });


//   useEffect(() => {
//     Promise.all([
//       axios.get('/api/days'),
//       axios.get('/api/appointments'),
//       axios.get('/api/interviewers')
//     ]).then((all) => {
//       // set your states here with the correct values...

//       setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
//     })
//   }, []);

//   dailyAppointments = getAppointmentsForDay(state, state.day);



//   return (
//     <main className="layout">
//       <section className="sidebar">
//         {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">

//           <DayList
//             days={state.days}
//             day={state.day}
//             setDay={setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />

//       </section>
//       <section className="schedule">
//         {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
//         {dailyAppointments.map((appointment) => {


//           const interview = getInterview(state, appointment.interview);
//           const interviewers = getInterviewersForDay(state, state.day);

//           return <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview} />

//         })}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}