import React, { useState } from 'react';
import FamilyForm from './familyForm';
import { ListItemSecondaryAction } from '@material-ui/core';

function FamilyInformation() {
  const [state, setState] = useState({
    fname: '',
    lname: '',
  });
  const [familiesInfo, setFamiliesInfo] = useState([]);
  const [checkFamily, setCheckFamily] = useState(false);
  const [moreFamily, setMoreFamily] = useState(false);
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ [name]: value });
  };
  const isFormValid = () => {
    const { fname, lname } = state;

    return fname && lname;
  };
  const addFamilyClicked = () => {
    setCheckFamily(true);
  };
  const addMoreFamily = () => {
    setMoreFamily(true);
    addFamilyInformationToArray();
  };
  const addFamilyInformationToArray = () => {
    setFamiliesInfo([
      ...familiesInfo,
      {
        firstName: state.fname,
        lastName: state.lname,
      },
    ]);
  };
  return (
    <FamilyForm
      handleInput={handleUserInput}
      validateForm={isFormValid}
      doWeHaveFamily={checkFamily}
      addFamilyHandle={addFamilyClicked}
      data={familiesInfo}
      addAdditionalFamily={moreFamily}
      addAdditionalFamilyHandler={addMoreFamily}
    />
  );
}
export default FamilyInformation;
