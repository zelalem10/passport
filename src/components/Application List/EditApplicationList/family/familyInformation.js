import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import FamilyForm from './familyForm';
import { useDispatch, useSelector } from 'react-redux';
import editAddFamilyData from '../../../../redux/actions/editAddFamilyAction';
import axiosInstance from '../../../Utils/axios';
const FamilyInformation = forwardRef((props, ref) => {
  const counter = useSelector((family) => family);
  const { familyInformation, personId } = props;

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
    personId: '',
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
    counter.editFamilyData.length > 1 &&
    counter.editFamilyData[0][0].hasOwnProperty('firstName')
  ) {
    setFamiliesInfo(counter.editFamilyData[counter.editFamilyData.length - 1]);
  }
  if (counter.editFamilyData.length === 0) {
    dispatch(editAddFamilyData(familyInformation));
  }
  const [familyType, setFamilyType] = useState([]);




  useEffect(() => {
    axiosInstance.get('/Person/api/V1.0/Person/GetAllFamilyType')
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
    let FamilyTypes = JSON.parse(localStorage.familyTypesResponse);
    for (let index = 0; index < FamilyTypes.length; index++) {
      if (FamilyTypes[index].id == id) {
        return FamilyTypes[index].type;
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
    axiosInstance.post('/Person/api/V1.0/Person/AddFamily',[
      {
        id: 0,
        personId: personId,
        familtyTypeId: parseInt(state.famType),
        firstName: state.fname,
        lastName: state.lname,
      },
    ])
      .then((response) => {
        debugger;
        console.log(response.data.message);
        setFamiliesInfo([
          ...familiesInfo,
          {
            id: response.data.families[0].id,
            personId: personId,
            firstName: state.fname,
            lastName: state.lname,
            familtyType: getFamilyType(state.famType),
            familtyTypeId:parseInt(state.famType),
          },
        ]);
      })
      .catch((error) => {
        debugger;
        console.log('error' + error);
      });
  };
  const removeFamilyMember = (ids, index) => {
    axiosInstance.delete(`/Person/api/V1.0/Person/DeleteFamily`,{params: { familyId: ids }})
      .then((response) => {
        var array = [...familiesInfo];
        array.splice(index, 1);
        setFamiliesInfo(array);
      })
      .catch((error) => {
        console.log('error' + error);
      });
  };
  const removeFamilyFromState = (index) => {
    var array = [...familiesInfo];
    array.splice(index, 1);
    setFamiliesInfo(array);
  };
  const editFamilyMember = (familyid, index) => {
    let editableFamilyInfo = getIndex(index);
    setEditdata((prevState) => ({
      ...prevState,
      fName: editableFamilyInfo.firstName,
      lName: editableFamilyInfo.lastName,
      idCardNum: familyid,
      familyType: editableFamilyInfo.familtyType,
      familtyTypeId: editableFamilyInfo.familtyTypeId,
      personId: editableFamilyInfo.personId,
    }));

    removeFamilyFromState(index);
    setMoreFamily(true);
    setIsEdit(true);
    setCheckFamily(true);
  };
  const saveEdited = async (id) => {
    setIsEdit(false);
    setMoreFamily(true);

    await setFamiliesInfo([
      ...familiesInfo,
      {
        id: editdata.idCardNum,
        personId: editdata.personId,
        firstName: editdata.fName,
        lastName: editdata.lName,
        familtyType: editdata.familyType,
        familtyTypeId: parseInt(editdata.familtyTypeId),
      },
    ]);
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
      getFamilyType={getFamilyType}
    />
  );
});
export default FamilyInformation;
