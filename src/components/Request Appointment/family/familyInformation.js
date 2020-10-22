import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import FamilyForm from './familyForm';
import { useDispatch, useSelector } from 'react-redux';
import addFamily from '../../../redux/actions/addFamilyAction';
import familyType from '../../../redux/actions/familyTypeAction';

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
    id: '',
    fName: '',
    lName: '',
    idCardNum: '',
    famType: 0,
    personId: 0,
  });
  const [familyType, setFamilyType] = useState([]);
  const baseUrl = 'https://epassportservicesaddt.azurewebsites.net/';
  const tokenValue = () => {
    const UserToken = localStorage.userToken;

    if (UserToken) {
      return UserToken;
    } else {
      const SystemToken = localStorage.systemToken;
      return SystemToken;
    }
  };
  const accesstoken = tokenValue();
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
        dispatch(familyType(response.data.familyTypesResponse));
      })
      .catch((error) => {
        console.log('error' + error);
      });
  }, []);
  if (isOnLoad && counter.familyReducer.length !== 0) {
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
        familtyTypeId: parseInt(state.famType),
        personId: 0,
      },
    ]);
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
  const removeFamilyFromState = (index) => {
    var array = [...familiesInfo];
    array.splice(index, 1);
    setFamiliesInfo(array);
  };

  const editFamilyMember = (familyid, index) => {
    let editableFamilyInfo = getIndex(familyid);
    setEditdata((prevState) => ({
      ...prevState,
      id: editableFamilyInfo.id,
      fName: editableFamilyInfo.firstName,
      lName: editableFamilyInfo.lastName,
      idCardNum: editableFamilyInfo.id,
      famType: parseInt(editableFamilyInfo.familtyTypeId),
      personId: editableFamilyInfo.personId,
    }));
    removeFamilyFromState(index);
    setMoreFamily(true);
    setIsEdit(true);
  };
  const saveEdited = async (id) => {
    setIsEdit(false);

    await setFamiliesInfo([
      ...familiesInfo,
      {
        id: editdata.id,
        firstName: editdata.fName,
        lastName: editdata.lName,
        familtyTypeId: parseInt(editdata.famType),
        personId: editdata.personId,
      },
    ]);
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
