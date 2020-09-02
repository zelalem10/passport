import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import FamilyForm from './familyForm';
import { useDispatch, useSelector } from 'react-redux';
import editAddFamilyData from '../../../../redux/actions/editAddFamilyAction';
import editDeleteFamilyData from '../../../../redux/actions/editDeleteFamilyAction';
import axios from 'axios';
const FamilyInformation = forwardRef((props, ref) => {
  const counter = useSelector((family) => family);
  const { familyInformation } = props;

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
    familyType: '',
    familtyTypeId: '',
  });
  debugger;

  if (
    familiesInfo.length === 0 &&
    isOnLoad === true &&
    counter.editFamilyData.length === 1
  ) {
    setFamiliesInfo(familyInformation);
    setIsOnLoad(false);
  } else if (
    familiesInfo.length === 0 &&
    isOnLoad === true &&
    counter.editFamilyData.length > 1
  ) {
    setFamiliesInfo(counter.editFamilyData[counter.editFamilyData.length - 1]);
  }
  console.log(counter.editFamilyData.length);
  if (counter.editFamilyData.length === 0) {
    dispatch(editAddFamilyData(familyInformation));
  }
  const [familyType, setFamilyType] = useState([]);
  const baseUrl = 'https://epassportservices.azurewebsites.net/';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKV1RfQ1VSUkVOVF9VU0VSIjoiQWRtaW4iLCJuYmYiOjE1OTg5NzI1MDMsImV4cCI6MTU5ODk4NjkwMywiaWF0IjoxNTk4OTcyNTAzfQ.F5wFUs08M2Yf8ZMQp-prE3MYe0xnGZ77PKfwPIghE0o';

  useEffect(() => {
    axios({
      headers: {
        Authorization: 'Bearer ' + token,
      },
      method: 'get',
      url: baseUrl + '/Person/api/V1.0/Person/GetAllFamilyType',
    })
      .then((response) => {
        setFamilyType(response.data.familyTypesResponse);
      })
      .catch((error) => {
        console.log('error' + error);
      });
  }, []);

  useImperativeHandle(ref, () => ({
    saveData() {
      dispatch(editAddFamilyData(familiesInfo));
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
  const getFamilyType = (id) => {
    for (let index = 0; index < familyType.length; index++) {
      if (familyType[index].id == id) {
        return familyType[index].type;
      }
    }
  };
  const handleUserEditInput = (e) => {
    const { name, value } = e.target;
    if (name == 'familtyTypeId') {
      setEditdata((prevState) => ({
        ...prevState,
        familyType: getFamilyType(value),
      }));
    }
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
        familtyType: getFamilyType(state.famType),
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
      idCardNum: familyid,
      familyType: editableFamilyInfo.familtyType,
      familtyTypeId: editableFamilyInfo.familtyTypeId,
    }));
    setMoreFamily(true);
    setIsEdit(true);
    setCheckFamily(true);
  };
  const saveEdited = (id) => {
    setIsEdit(false);
    setMoreFamily(true);
    const newfamiliesInfo = [...familiesInfo];

    for (var i = 0; i < newfamiliesInfo.length; i++) {
      if (i == id) {
        newfamiliesInfo[i].firstName = editdata.fName;
        newfamiliesInfo[i].lastName = editdata.lName;
        newfamiliesInfo[i].familtyType = editdata.familyType;
        newfamiliesInfo[i].familtyTypeId = editdata.familtyTypeId;
      }
    }
    setFamiliesInfo(newfamiliesInfo);
  };
  function getIndex(idNo) {
    for (var i = 0; i < familiesInfo.length; i++) {
      if (i === idNo) {
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
