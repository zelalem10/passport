import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AddFamily from './addAdditionalFam';
import EditFamily from './editFamily';
import AddMoreFamily from './addMoreFamily';
import AddFirstFamily from './startAddingFamily';

function FamilyForm(props) {
  const {
    data,
    familyType,
    addAdditionalFamily,
    handleInput,
    editThisFamily,
    deleteThisFamily,
    addFamilyHandle,
    editFamilyData,
    saveEditedData,
    handleEditInput,
  } = props;
 debugger;

  if (props.doWeHaveFamily === true && addAdditionalFamily === false) {
    return (
      <AddFamily
        handleInputAdd={handleInput}
        addAdditionalFamilyHandlerAdd={props.addAdditionalFamilyHandler}
        familyType={familyType}
      />
    );
  } else if (
    props.doWeHaveFamily === true &&
    addAdditionalFamily === true &&
    props.editable === false
  ) {
    return (
      <AddMoreFamily
        data={data}
        handleInput={handleInput}
        addAdditionalFamilyHandler={props.addAdditionalFamilyHandler}
        deleteThisFamily={deleteThisFamily}
        editThisFamily={editThisFamily}
        familyType={familyType}
      />
    );
  } else if (
    props.doWeHaveFamily === true &&
    addAdditionalFamily === true &&
    props.editable === true
  ) {
    return (
      <EditFamily
        data={data}
        handleInput={handleInput}
        editThisFamily={editThisFamily}
        editFamilyData={editFamilyData}
        saveEditedData={saveEditedData}
        handleEditInput={handleEditInput}
        familyType={familyType}
      />
    );
  } else {
    return <AddFirstFamily addFamilyHandle={addFamilyHandle} />;
  }
}
export default FamilyForm;
