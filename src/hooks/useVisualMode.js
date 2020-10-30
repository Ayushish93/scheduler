import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setmode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if(replace) {
      history[history.length-1] = history[history.length-2];
    }
    setmode(newMode);
    history.push(newMode);
    setHistory(history);
    
  }
  function back() {
    history.pop();
    if(history.length >= 1) 
      setmode(history[history.length - 1]);
  }
  
  return { mode, transition, back };
 
};

