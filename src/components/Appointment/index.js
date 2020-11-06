import React from "react";
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
const ERROR_EDIT ="ERROR_EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    // cancel function to cancel  appointment and change state
   function cancel() {
    
    transition(DELETE, true);
     props.cancelInterview(props.id)
    .then(res => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
    
    
  }  
  
    // save function to save appointment and change state
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

    // update function to update appointment and change state
  function update(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
    .catch(err => transition(ERROR_EDIT, true))
  }

  return (


    <article className="appointment" data-testid="appointment">
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
          onSave={update}

        />
      )}

      {mode === ERROR_SAVE && <Error message={"could not save the appointment"} onClose={() => transition(EMPTY)}/>}
      {mode === ERROR_DELETE && <Error message={"could not delete the appointment"} onClose={() => transition(SHOW)}/>}
      {mode === ERROR_EDIT && <Error message={"could not update the appointment"} onClose={() => transition(SHOW)}/>}  
    </article>
  );
}