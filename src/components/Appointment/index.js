import React, { useState, useEffect } from "react";
import "components/Appointment/styles.scss";
import "components/Appointment/Header";
import Show from  "components/Appointment/Show";
import "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import { create } from "react-test-renderer";
import Form from "./Form";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  

  return(
    
    
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview?< Show student={props.interview.student} interviewer= {props.interview.interviewer}/>:<Empty/>} */}
      {mode === EMPTY && <Empty onAdd={()  => transition(CREATE) } />}

      {mode === SHOW && ( 
        <Show 
          student={props.interview.student} 
          interviewer= {props.interview.interviewer}
        />
      )}
      
      {console.log("here are interviewers, " ,props.interviewers)}
      {mode === CREATE && (
        <Form
          name = ""
          interviewer = ""
          interviewers = {props.interviewers}
          onCancel = {() => back(EMPTY)}

        />
      )}

    </article>
  );
}