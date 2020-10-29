// import { NULL } from "node-sass";

export  function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const arrOfAppointmentsOfTheDay = function() {

    for(let ele of state.days) {
        if(ele.name === day ) {
          return ele.appointments;
        }
    }
  }
  
  let appointmentsOfTheDay = arrOfAppointmentsOfTheDay();
 
  
  if(appointmentsOfTheDay) {
    let appointmentsArr = [];
    for(let appointment of appointmentsOfTheDay) {
      if(state.appointments[appointment]) {
        appointmentsArr.push(state.appointments[appointment])
      }
    }
    return appointmentsArr;
  }
  else {
    return [];
  }
};


export function getInterview(state, interview) {

  let resultObj = {};
  let interviewerObj = state.interviewer;
  let interviewerInfoObj = {}; 

  
  
  if(interview) {
    console.log("interviw , ", interview);
    resultObj['student'] = interview['student'];
   
    if(interviewerObj[interview['interviewer']]) {
      for(let obj in interviewerObj) {
        if(interview['interviewer'] === interviewerObj[obj]['id']) {

          interviewerInfoObj['id'] = interviewerObj[obj]['id'];
          interviewerInfoObj['name'] = interviewerObj[obj]['name'];
          interviewerInfoObj['avatar'] = interviewerObj[obj]['avatar'];

        }
      }
      resultObj['interviewer']= interviewerInfoObj;
      return resultObj;
    } else {
      return null;
    }
    
    
  } else {
    return null;
  }
}





// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }