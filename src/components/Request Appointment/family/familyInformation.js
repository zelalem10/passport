import React, { useState } from 'react';
import FamilyForm from './familyForm';

function FamilyInformation() {
  const [state, setState] = useState({
    fname: '',
    lname: '',
  });
  const [familiesInfo, setFamiliesInfo] = useState([]);
  const [checkFamily, setCheckFamily] = useState(false);
  const [moreFamily, setMoreFamily] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editdata, setEditdata] = useState({
    fName: '',
    lName: '',
    idCardNum: '',
  });
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUserEditInput = (e) => {
    const { name, value } = e.target;
    setEditdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        id: familiesInfo.length,
        firstName: state.fname,
        lastName: state.lname,
      },
    ]);
  };
  const removeFamilyMember = (ids) => {
    var array = [...familiesInfo];
    array.splice(ids, 1);
    setFamiliesInfo(array);
  };
  const editFamilyMember = (familyid) => {
    let editableFamilyInfo = getIndex(familyid);
    setEditdata((prevState) => ({
      ...prevState,
      fName: editableFamilyInfo.firstName,
      lName: editableFamilyInfo.lastName,
      idCardNum: editableFamilyInfo.id,
    }));
    setMoreFamily(true);
    setIsEdit(true);
  };
  const saveEdited = (id) => {
    setIsEdit(false);
    const newfamiliesInfo = [...familiesInfo];
    for (var i = 0; i < newfamiliesInfo.length; i++) {
      if (newfamiliesInfo[i]['id'] === id) {
        newfamiliesInfo[i].firstName = editdata.fName;
        newfamiliesInfo[i].lastName = editdata.lName;
      }
    }
    setFamiliesInfo(newfamiliesInfo);
  };
  function getIndex(idNo) {
    for (var i = 0; i < familiesInfo.length; i++) {
      if (familiesInfo[i]['id'] === idNo) {
        return familiesInfo[i];
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }
  return (
    <FamilyForm
      handleInput={handleUserInput}
      validateForm={isFormValid}
      doWeHaveFamily={checkFamily}
      addFamilyHandle={addFamilyClicked}
      data={familiesInfo}
      addAdditionalFamily={moreFamily}
      addAdditionalFamilyHandler={addMoreFamily}
      deleteThisFamily={removeFamilyMember}
      editThisFamily={editFamilyMember}
      editable={isEdit}
      editFamilyData={editdata}
      saveEditedData={saveEdited}
      handleEditInput={handleUserEditInput}
    />
  );
}
export default FamilyInformation;
