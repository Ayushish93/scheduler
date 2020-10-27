import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props){
  
  let InterviewerClass = classNames("interviewers__item", {

    "interviewers__item--selected": props.selected,  
    
  });

  return(
    <li className="interviewers__item" onClick={props.setInterviewer} className={InterviewerClass}>

      <img
        className="interviewers__item-image" 
        src= {props.avatar}
        alt= {props.name}
      />
      
      {/* checking if props.selected is true then display name */}
      {props.selected && props.name}  
    </li>
  );
}