import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import FamilyForm from './familyForm';
import { useDispatch, useSelector } from 'react-redux';
import editAddFamilyData from '../../../../../redux/actions/editAddFamilyAction';
import axios from 'axios';
const FamilyInformation = forwardRef((props, ref) => {
  const counter = useSelector((family) => family);
  const { familyInformation, personId, applicants } = props;

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
  let familiesInformation = [];
  if (counter.editFamilyData.length === 0) {
    for (let i = 0; i < applicants.length; i++) {
      let familyData = applicants[i].familyResponses;
      if (familyData.length !== 0) {
        familyData.forEach((fam) => {
          familiesInformation.push(fam);
        });
      }
    }

    setFamiliesInfo(familiesInformation);
    console.log(familiesInfo);
    dispatch(editAddFamilyData(familiesInformation));
  }
  if (isOnLoad === true && counter.editFamilyData.length === 0) {
    setFamiliesInfo(familiesInformation);
    setIsOnLoad(false);
  } else if (isOnLoad === true && counter.editFamilyData.length === 1) {
    debugger;
    let thisFamilyInfo = counter.editFamilyData[0].filter(
      (family) => family.personId == props.applicantNumber
    );
    setFamiliesInfo(thisFamilyInfo);
    setIsOnLoad(false);
  } else if (isOnLoad === true && counter.editFamilyData.length > 1) {
    debugger;

    const resultLength = counter.editFamilyData.filter(function (items) {
      for (let item in items) {
        if (items[item].personId == props.applicantNumber) {
          return items;
        }
      }
    }).length;
    //   (item) => item.personId == props.applicantNumber
    // );
    if (resultLength) {
      let prevInfo = counter.editFamilyData.filter(function (items) {
        for (let item in items) {
          if (items[item].personId == props.applicantNumber) {
            return items;
          }
        }
      })[resultLength - 1];
      setFamiliesInfo(prevInfo);
      setIsOnLoad(false);
    } else {
      let thisFamilyInfo = counter.editFamilyData[0].filter(
        (family) => family.personId == props.applicantNumber
      );
      setFamiliesInfo(thisFamilyInfo);
      setIsOnLoad(false);
    }
  }

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
    axios({
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
      method: 'post',
      url: baseUrl + '/Person/api/V1.0/Person/AddFamily',
      data: [
        {
          id: 0,
          personId: props.applicantNumber,
          familtyTypeId: parseInt(state.famType),
          firstName: state.fname,
          lastName: state.lname,
        },
      ],
    })
      .then((response) => {
        setFamiliesInfo([
          ...familiesInfo,
          {
            id: response.data.families[0].id,
            personId: props.applicantNumber,
            firstName: state.fname,
            lastName: state.lname,
            familtyType: getFamilyType(state.famType),
            familtyTypeId: parseInt(state.famType),
          },
        ]);
      })
      .catch((error) => {
        console.log('error' + error);
      });
  };
  const removeFamilyMember = (ids, index) => {
    axios({
      headers: {
        Authorization: 'Bearer ' + accesstoken,
      },
      method: 'delete',
      url: baseUrl + '/Person/api/V1.0/Person/DeleteFamily',
      params: { familyId: ids },
    })
      .then((response) => {
        debugger;
        var array = [...familiesInfo];
        array.splice(index, 1);
        setFamiliesInfo(array);
        console.log(familiesInfo);
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
    />
  );
});
export default FamilyInformation;
