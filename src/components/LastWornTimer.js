import React, { useState, useEffect } from "react";

function LastWornTimer() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const days = Math.floor((1000 * 60 * 60 * 24));
  
  useEffect(() => {
    let lastWorn;
  
    if(isActive) {
      lastWorn = setInterval(() => {
        setTimer(timerState => timerState + 1)
      }, days);
    }
  
      return () => {
        clearInterval(lastWorn);
      };
    }, [isActive, days]);

    return [isActive, timer, setIsActive];
  }
  
  export default LastWornTimer;