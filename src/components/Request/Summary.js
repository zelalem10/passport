import React, {
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { MDBContainer, MDBTypography, MDBBox } from 'mdbreact';
import { useSelector } from 'react-redux';
import ViewGroupAppointment from './GroupSummary';
import { useHistory } from 'react-router-dom';





const ViewAppointment = forwardRef((props, ref) => {


    const history = useHistory();
    const [expanded, setExpanded] = React.useState('panel1');
    const [formCompleted, setFormCompleted] = useState(false);
    const [dataSaved, setDataSaved] = useState(false);
    const data = useSelector((state) => state);

    const serviceData = data.service[data.service.length - 1];
    const requestMode = serviceData.isUrgent;
    let requests = data.request;

    const dateFormatter = (date) => {
        if(date && typeof(date)!=='undefined'){
        let selectDays = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(selectDays);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(selectDays);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(selectDays);
        return (`${mo} ${da}, ${ye}`);
        }
    }


    let attachementResponse = data.attachement[data.attachement.length - 1];

    const confirmInformation = (e) => {
        setFormCompleted(e.target.checked);
    };
    useImperativeHandle(ref, () => ({
        saveData() {
            setDataSaved(true);
            if (formCompleted && requestMode) {
                history.push('/Confirmation');
            }
        },
        isCompleted() {
            return formCompleted;
        },
    }));
    const getOccupation = (id) => {
        let occupations = JSON.parse(localStorage.occupations);
        for (let index = 0; index < occupations.length; index++) {
            if (occupations[index].id == id) {
                return occupations[index].title;
            }
        }
    };
    const getFamilyType = (id) => {
        let FamilyTypes = JSON.parse(localStorage.familyTypesResponse);
        for (let index = 0; index < FamilyTypes.length; index++) {
            if (FamilyTypes[index].id == id) {
                return FamilyTypes[index].type;
            }
        }
    };
    const getNationalitys = (id) => {
        let Nationalitys = JSON.parse(localStorage.nationalitys);
        for (let index = 0; index < Nationalitys.length; index++) {
            if (Nationalitys[index].id == id) {
                return Nationalitys[index].name;
            }
        }
    };
    if (requests) {
        if (!data.service[data.service.length - 1].isGroup) {
            const personalInfo = requests[requests.length - 1]
                ? requests[requests.length - 1].personResponses
                : null;
            if (personalInfo) {
                const appointmentResponse = requests[requests.length-1].appointmentResponse;
                const personalInformation = requests[requests.length-1].personResponses;
                const addressInformation = personalInformation.address;
                const familyInformation = personalInformation.familyResponses;
                console.log(personalInformation.passportRes.birthCertificateId)
                const handleChange = (panel) => (event, newExpanded) => {
                    setExpanded(newExpanded ? panel : false);
                };

                return (
                    <MDBContainer className="passport-container pt-5" fluid>
                        <div class="div-title text-center mywizardcss pt-3 pb-3">
                            <div className="header-display">
                                <div class="form-group form-inline passport-display">
                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                        Request Type:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                        <label class="font-weight-bold">
                                            {requests[requests.length-1].type}
                                        </label>
                                    </b>
                                </div>
                                <div class="form-group form-inline passport-display">
                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                        Request Status:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                        <label class="font-weight-bold">
                                            {requests[requests.length-1].requestStatus}
                                        </label>
                                    </b>
                                </div>
                                <div class="form-group form-inline passport-display">
                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                        Request Date:{' '}
                                    </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                        <label class="font-weight-bold">

                                            {dateFormatter(requests[requests.length-1].requestDate)}
                                        </label>
                                    </b>
                                </div>
                                <div class="form-group form-inline passport-display">
                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                        {requests[requests.length-1].type === 'New' ? 'Appointment' : 'Delivery'} Date:{' '}
                                    </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                        <label class="font-weight-bold">
                                            {appointmentResponse ? dateFormatter(appointmentResponse.date) : personalInformation ? dateFormatter(personalInformation.deliveryAppointment) : null}
                                        </label>
                                    </b>
                                </div>
                                {appointmentResponse ? appointmentResponse.duration ? (
                                    <div class="form-group form-inline passport-display">
                                        <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                            {requests[requests.length-1].type === 'New' ? 'Appointment' : 'Delivery'} Time:{' '}
                                        </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                                        <b>
                                            <label class="font-weight-bold">
                                                {appointmentResponse
                                                    ? appointmentResponse.duration.startTime
                                                    : null}
                                                {'-'}
                                                {appointmentResponse
                                                    ? appointmentResponse.duration.endTime
                                                    : null}
                                                {appointmentResponse
                                                    ? appointmentResponse.duration.isMorning
                                                        ? 'AM'
                                                        : 'PM'
                                                    : null}
                                            </label>
                                        </b>
                                    </div>
                                ) : null : null}
                                <div class="form-group form-inline passport-display">
                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                        Application Number
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                        <label class="font-weight-bold">
                                            {personalInformation.applicationNumber}
                                        </label>
                                    </b>
                                </div>
                                <div class="form-group form-inline passport-display">
                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                        Office
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                        <label class="font-weight-bold">
                                            {requests[requests.length-1].office}
                                        </label>
                                    </b>
                                </div>
                                {requests[requests.length-1].type === 'New' ?
                                    <div class="form-group form-inline passport-display">
                                        <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                            Delivery Site
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                                            <label class="font-weight-bold">
                                                {requests[requests.length-1].deliverySite}
                                            </label>
                                        </b>
                                    </div> : null}
                            </div>
                        </div>
                        <div
                            class="wizard-display setup-content"
                            id="step-5"
                            style={{ display: 'block' }}
                        >
                            <div class="row pt-4">
                                <div class="col-md-6">
                                    <fieldset>
                                        <legend class="text-primary">Personal Information</legend>
                                        <hr class="text-primary" />
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                First Name
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.firstName}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Father Name
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.middleName}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Grand Father Name
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.lastName}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                ??????
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.geezFirstName}
                                                </label>
                                            </b>
                                        </div>

                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                ???????????? ??????
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.geezMiddleName}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                ???????????? ??????
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.geezLastName}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Date of Birth
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {dateFormatter(personalInformation.dateOfBirth)}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Gender
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.gender == 1 ? 'Male' : 'Female'}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Nationality
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {getNationalitys(personalInformation.nationalityId)}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Height
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.height}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Eye Color
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.eyeColor}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Hair Color
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.hairColor}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Occupation
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {getOccupation(personalInformation.occupationId)}
                                                </label>
                                            </b>
                                        </div>


                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Phone Number
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.phoneNumber}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Email
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.email}
                                                </label>
                                            </b>
                                        </div>

                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                            Birth Certificate Id
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.passportRes.birthCertificateId}
                                                </label>
                                            </b>
                                        </div>



                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Is Adoption
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.isAdoption ? 'YES' : 'NO'}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Is Under18
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {personalInformation.isUnder18 ? 'YES' : 'NO'}
                                                </label>
                                            </b>
                                        </div>
                                    </fieldset>
                                    {familyInformation.length !== 0 ? (
                                        <fieldset>
                                            <legend class="text-primary">Family Information</legend>
                                            <hr class="text-primary" />
                                            {familyInformation.map((family) => (
                                                <div class="form-group form-inline">
                                                    <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                        {getFamilyType(family.familtyTypeId)}
                                                    </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <b>
                                                        <label
                                                            class="font-weight-bold"
                                                            id="AccommodationTyppe"
                                                        >
                                                            {family.firstName + ' ' + family.lastName}
                                                        </label>
                                                    </b>
                                                </div>
                                            ))}
                                        </fieldset>
                                    ) : null}
                                </div>

                                <div className="col-md-6">
                                    <fieldset>
                                        <legend class="text-primary">Address Information</legend>
                                        <hr class="text-primary" />
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Region
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.region}
                                                </label>
                                            </b>
                                        </div>

                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                City
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.city}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                State
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.state}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Zone
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.zone}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Wereda
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.wereda}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Street
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.street}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                HouseNo
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.houseNo}
                                                </label>
                                            </b>
                                        </div>
                                        <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                PoBox
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.poBox}
                                                </label>
                                            </b>
                                        </div>

                                        {/* <div class="form-group form-inline">
                                            <label class="control-label col-sm-4 p-0 pr-2 justify-content-end">
                                                Request Place
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <b>
                                                <label class="font-weight-bold">
                                                    {addressInformation.requestPlace}
                                                </label>
                                            </b>
                                        </div> */}
                                    </fieldset>

                                    <fieldset>
                                        <ul class="list-group mb-3">
                                            <li class="list-group-item ePassprt-color">
                                                <h5>Attachment Information</h5>
                                            </li>
                                            {
                                                attachementResponse ?
                                                    attachementResponse.length ? (
                                                        attachementResponse.map((attachmentitem) => (
                                                            <li class="list-group-item d-flex justify-content-between">
                                                                <span>{attachmentitem.attachmentType} </span>
                                                                <strong>
                                                                    <a href={attachmentitem.attachmentPath}>
                                                                        View File
                              </a>
                                                                </strong>
                                                            </li>
                                                        ))

                                                    ) : (
                                                            <h6 class="my-3">
                                                                <div class="alert alert-danger" role="alert">
                                                                    You Don't Have Attachment Information
                          </div>
                                                            </h6>
                                                        )
                                                    : (
                                                        <h6 class="my-3">
                                                            <div class="alert alert-danger" role="alert">
                                                                You Don't Have Attachment Information
                        </div>
                                                        </h6>
                                                    )
                                            }
                                        </ul>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <MDBTypography blockquote bqColor="primary">
                            <MDBBox tag="p" mb={0} className="bq-title">
                                Please review your application details.
              </MDBBox>
                            <p>
                                Please make sure these details exactly match the identity
                                document.
              </p>
                            <div class="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="defaultUnchecked"
                                    onClick={(e) => confirmInformation(e)}
                                />
                                <label class="custom-control-label" for="defaultUnchecked">
                                    Confirm Applicant Details
                </label>
                            </div>
                            {formCompleted === false && dataSaved === true ? (
                                <div className="text-monospace">
                                    <p className="check-agree">
                                        Please check this box if you want to proceed
                  </p>
                                </div>
                            ) : null}
                        </MDBTypography>
                    </MDBContainer>
                );
            } else {
                return <div>Before request made</div>;
            }
        } else {
            return (<ViewGroupAppointment confirmInformation={confirmInformation} formCompleted={formCompleted} dataSaved={dataSaved} getOccupation={getOccupation} getNationalitys={getNationalitys} getFamilyType={getFamilyType} />);
        }
    } else {
        return <div>Before request made</div>;
    }
});

export default ViewAppointment;
