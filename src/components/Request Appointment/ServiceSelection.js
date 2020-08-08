import React, { useState } from "react";
import HorizontalLinearStepper from './demo'

const ServiceSelection=()=> {
   debugger;
   const [state,setState]=useState({showHideDemo1:true,showHideDemo2:false,showHideDemo3:false});
   function hideComponent(name){
      
    switch (name) {
        case "showHideDemo1":
          setState({showHideDemo1:true});
          break;
        case "showHideDemo2":
         setState({showHideDemo2:true});
          break;
        case "showHideDemo3":
         setState({showHideDemo3:true});
          break;
        default:
         setState({showHideDemo1:true});
      }
    }
  

  return (
    <HorizontalLinearStepper />
  );
}

export default ServiceSelection;
