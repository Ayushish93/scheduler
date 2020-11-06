import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
    // function to transition between states
  function transition(newMode, replace = false) {
    
    if(replace) {
      
      setHistory(prev => ([...prev.slice(0,prev.length-1), newMode]))
      setMode(newMode);
     
    } else {
      setMode(newMode);
      
      setHistory(prev => ([...prev, newMode]));
     
    }
    
  }
    // function to go back to previous state 
  function back() {
     
    if(history.length < 2) { 
      return;
    } 
    
    
    setHistory(prev => (prev.slice(0,prev.length-1)))
    const lastMode = history.slice(0, history.length-1)[history.length-2];
    setMode(lastMode);
    
  }
  
  return { mode, transition, back };
 
};

