import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import FamilyForm from './familyForm';
import { useDispatch, useSelector } from 'react-redux';
import addFamily from '../../../redux/actions/addFamilyAction';

import axios from 'axios';
const FamilyInformation = forwardRef((props, ref) => {
  const counter = useSelector((family) => family);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    fname: '',
    lname: '',
    famType: '',
  });
  const [familiesInfo, setFamiliesInfo] = useState([]);
  const [checkFamily, setCheckFamily] = useState(false);
  const [moreFamily, setMoreFamily] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
    const [isOnLoad, setIsOnLoad] = useState(true);
  const [editdata, setEditdata] = useState({
    fName: '',
    lName: '',
    idCardNum: '',
    famType: '',
  });
  const [familyType, setFamilyType] = useState([]);
  const baseUrl = 'https://epassportservices.azurewebsites.net/';
  const accesstoken = localStorage.systemToken;
  useEffect(() => {
    axios({
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
      method: 'get',
      url: baseUrl + '/Person/api/V1.0/Person/GetAllFamilyType',
    })
      .then(async (response) => {
        setFamilyType(response.data.familyTypesResponse);
      })
      .catch((error) => {
        console.log('error' + error);
      });
  }, []);
 if(isOnLoad && counter.familyReducer.length!==0){
   
   setFamiliesInfo(counter.familyReducer[counter.familyReducer.length - 1]);
   setMoreFamily(true);
   setCheckFamily(true);
   setIsOnLoad(false);
   console.log(familiesInfo);
 }
  useImperativeHandle(ref, () => ({
    saveData() {
      dispatch(addFamily(familiesInfo));
    },
    Validate() {
      //alert("Validation")
    },
  }));
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUserEditInput = (e) => {
    debugger;
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
        familtyTypeId: state.famType,
        personId:0,
      },
    ]);
    // dispatch(
    //   familyActions.addFamily({
    //     ...familiesInfo,
    //     id: familiesInfo.length,
    //     firstName: state.fname,
    //     lastName: state.lname,
    //     familyRelationType: state.famType,
    //   })
    // );
  };
  const removeFamilyMember = (ids) => {
    var array = [...familiesInfo];
    let pos = familiesInfo
      .map(function (e) {
        return e.id;
      })
      .indexOf(ids);
    array.splice(pos, 1);
    setFamiliesInfo(array);
    // dispatch(deletefamilyActions.deleteFamily(pos));
  };
  const editFamilyMember = (familyid) => {
    let editableFamilyInfo = getIndex(familyid);
    setEditdata((prevState) => ({
      ...prevState,
      fName: editableFamilyInfo.firstName,
      lName: editableFamilyInfo.lastName,
      idCardNum: editableFamilyInfo.id,
      famType: editableFamilyInfo.familtyTypeId,
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
        newfamiliesInfo[i].familtyTypeId = editdata.famType;
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
      familyType={familyType}
    />
  );
});
export default FamilyInformation;
