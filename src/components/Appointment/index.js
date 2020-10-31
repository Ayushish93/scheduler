import React, { useState, useEffect } from "react";
import "components/Appointment/styles.scss";
import "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import InterviewerList from "components/InterviewerList";
import { create } from "react-test-renderer";
import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE ="ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

   function cancel() {
    
    transition(DELETE, true);
     props.cancelInterview(props.id)
    .then(res => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
    
    
  }  

   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
     props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true))
  }

  return (


    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview?< Show student={props.interview.student} interviewer= {props.interview.interviewer}/>:<Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === DELETE && <Status message={"Deleting"}/>}
      {mode === CONFIRM && 
        <Confirm 
          message="Are you sure you want to delete"
          onCancel={() => transition(SHOW)}
          onConfirm={cancel}
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}


      {mode === CREATE && (
        <Form
          name=""
          interviewer=""
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
          

        />
      )}
       
      
      {mode === EDIT && (
       
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}

          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}

        />
      )}

      {mode === ERROR_SAVE && <Error message={"could not save the appointment"} onClose={() => transition(EMPTY)}/>}
      {mode === ERROR_DELETE && <Error message={"could not delete the appointment"} onClose={() => transition(SHOW)}/>}  
    </article>
  );
}