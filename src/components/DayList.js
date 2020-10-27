import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){

  const days = props.days;
  
  const dayList = days.map(day => {
    return (
      <li>
        <DayListItem 
          key = {day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </li>
     ) });
  

  return (
    <ul>
      {dayList}
    </ul>
  );
}