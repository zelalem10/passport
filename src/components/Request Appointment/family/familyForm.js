import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AddFamily from './addAdditionalFam';
import EditFamily from './editFamily';
import AddMoreFamily from './addMoreFamily';
import AddFirstFamily from './startAddingFamily';

function FamilyForm(props) {
  const { data } = props;
  const { addAdditionalFamily } = props;
  const { handleInput } = props;
  const { editThisFamily } = props;
  const { deleteThisFamily } = props;
  const { addFamilyHandle } = props;
  const { editFamilyData } = props;
  const { saveEditedData } = props;
  const { handleEditInput } = props;

  if (props.doWeHaveFamily === true && addAdditionalFamily === false) {
    return (
      <AddFamily
        handleInputAdd={handleInput}
        addAdditionalFamilyHandlerAdd={props.addAdditionalFamilyHandler}
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
      />
    );
  } else {
    return <AddFirstFamily addFamilyHandle={addFamilyHandle} />;
  }
}
export default FamilyForm;
