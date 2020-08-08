import React from 'react';
import IndividualandGroup from './IndividualandGroup';
import NumberOfApplicant from './NumberOfApplicants'
import AppointmetType from './appointmentType';
import RenewPassport from './RenewPassport';



let indentifier=false;
function identifyGroupVsIndividual(selected){
  if(selected){
    return true;
  }
  return false;
}
export default function HorizontalLinearStepper() {
  const [state,setState]=React.useState({
      step:1
    });
    const [group,setGroup]=React.useState(false);
    const [applicants,setApplicants]=React.useState(2);

  const individualNextStep=(type)=>{
    const {step}=state;
    setState({
      step:step+2
    });
    debugger;
    if(type==='individual'){
    indentifier = identifyGroupVsIndividual(type);
    }else{
      indentifier=false;
    }
    
    
  };
  

  const nextStep = (type) => {
    debugger;
    const { step } =state;

    if(type==='group'){
      indentifier=false;
      setGroup(true);
    }
    setState({
      step: step + 1
    });
  };

  // Go back to prev step
  const prevStep = () => {
    const { step } =state;
    if(indentifier===true  && step ===3){
      setState({
        step: step - 2
      });
    }else{
    setState({
      step: step - 1
    });
  }
  };

  const handleApplicants=input=>e=>{
    setApplicants(e.target.value);
  }

  const handleChange = input => e => {
    setState({ [input]: e.target.value });
  };
console.log(state,group ,applicants);

  const {step}=state;
  
  switch (step) {
    case 1:
      return (<IndividualandGroup 
        nextStep={nextStep}
        handleChange={handleChange}
        individualNextStep={individualNextStep}
        values={applicants}
      />);
      case 2:
          return (<NumberOfApplicant
            nextStep={nextStep}
        handleChange={handleApplicants}
        prevStep={prevStep}
            />);
          case 3:
             return (<AppointmetType 
                nextStep={nextStep}
                handleChange={handleChange}
                prevStep={prevStep}
             />);
             case 4:
             return (<RenewPassport 
                nextStep={nextStep}
                handleChange={handleChange}
                prevStep={prevStep}
             />);
              default:
                (console.log('This is a multi-step form built with React.'))
  }

}
