import React, { useEffect } from 'react';
import IndividualandGroup from './IndividualandGroup';
import NumberOfApplicant from './NumberOfApplicants';
import AppointmetType from './appointmentType';
import RenewPassport from './RenewPassport';
import './requestAppointment.css';
import RequestStepper from '../RequestStepper/RequestStepper';

import * as serviceSelectionActions from '../../redux/actions/serviceActions';
import { useDispatch, useSelector } from 'react-redux';
import * as serviceActions from '../../redux/actions/serviceActions';
import PropTypes from 'prop-types';

let indentifier = false;
function identifyGroupVsIndividual(selected) {
  if (selected) {
    return true;
  }
  return false;
}
function HorizontalLinearStepper() {
 const counter = useSelector((state) => state);
  // console.log(counter.service[counter.service.length - 1]);
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    step: 1,
    isGroup: false,
    appointemntType: '',
    numberOfApplicants: 0,
  });

  const [state, setState] = React.useState({
    step: 1,
  });
  if (counter.service.length === 0) {
    dispatch(serviceActions.selectService({ ...data, step: 1 }));
  }
  const [group, setGroup] = React.useState(false);
  const [applicantsState, setApplicants] = React.useState(1);

  const individualNextStep = (type) => {
    const { step } = state;
    setState({
      step: step + 2,
    });

    dispatch(
      serviceActions.selectService({ ...data, step: step + 2, isGroup: false })
    );
    setGroup(false);
    if (type === 'individual') {
      indentifier = identifyGroupVsIndividual(type);
    } else {
      indentifier = false;
    }
  };

  const nextStep = (type) => {
    debugger;
    const { step } = state;

    setState({
      step: step + 1,
    });
    if (type === 'group') {
      indentifier = false;
      setGroup(true);
      setData({ ...data, isGroup: true });
      dispatch(
        serviceActions.selectService({ ...data, isGroup: true, step: step + 1})
      );
    } else {
      dispatch(serviceActions.selectService({ ...data, step: step + 1,numberOfApplicants:counter.service[counter.service.length - 1].numberOfApplicants }));
    }
  };

  const DoubleNextStep = () => {
    const { step } = state;

    setState({
      step: step + 2,
    });
  };

  const handleAppointmentType = (value) => {
    setState({
      step: step + 1,
    });
    dispatch(
      serviceActions.selectService({
        ...data,
        appointemntType: value,
        step: step + 1,
      })
    );
  };

  // Go back to prev step
  const prevStep = () => {
    const { step } = counter.service[counter.service.length - 1];
    if (indentifier === true && step === 3) {
      setState({
        step: step - 2,
      });
      dispatch(serviceActions.selectService({ ...data, step: step - 2 }));
    } else {
      setState({
        step: step - 1,
      });
      dispatch(serviceActions.selectService({ ...data, step: step - 1 }));
    }
  };

  const handleApplicants = (e) => {
    debugger;
    setApplicants(e.target.value);
    dispatch(
      serviceActions.selectService({ ...data, numberOfApplicants: e.target.value })
    );
  };

  const handleChange = (input) => (e) => {
    setApplicants({ [input]: e.target.value });
  };

  const { step } = state;
  const groupValue = group;
  switch (step) {
    case 1:
      return (
        <IndividualandGroup
          nextStep={nextStep}
          handleChange={handleChange}
          individualNextStep={individualNextStep}
          values={applicantsState}
        />
      );
    case 2:
      return (
        <NumberOfApplicant
          nextStep={nextStep}
          handleChange={handleApplicants}
          prevStep={prevStep}
          values={applicantsState}
          isItGroup={group}
        />
      );
    case 3:
      return (
        <AppointmetType
          nextStep={nextStep}
          handleChange={handleChange}
          prevStep={prevStep}
          isItGroup={group}
          values={applicantsState}
          handleAppointmentType={handleAppointmentType}
          DoubleNextStep={DoubleNextStep}
        />
      );
    case 4:
      return (
        <RenewPassport
          nextStep={nextStep}
          handleChange={handleChange}
          prevStep={prevStep}
          isItGroup={group}
          values={applicantsState}
        />
      );
      case 5:
      return (
        <RequestStepper
        />
      );
    default:
      console.log('This is a multi-step form built with React.');
  }
}

HorizontalLinearStepper.PropTypes = {
  actions: PropTypes.object.isRequired,
};

export default HorizontalLinearStepper;
