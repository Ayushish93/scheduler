import React, { useState, useEffect } from "react";
import "components/Appointment/styles.scss";
import "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import { create } from "react-test-renderer";
import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function cancel() {
    
    transition(DELETE);
    await props.cancelInterview(props.id);
    transition(EMPTY);
    
  }  

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
     await props.bookInterview(props.id, interview)
    
    transition(SHOW);
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

    </article>
  );
}