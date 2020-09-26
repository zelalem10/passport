import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

function AvailableTimeSlot(props) {
  const { timeLists } = props;
  const { showAndHide } = props;
  if (showAndHide === true) {
    return (
      <div id="chooseAppointments">
        <MDBTable id="apptTable" className="table-responsive">
          <MDBTableHead>
            <tr>
              <th>
                {props.selectedDate}
                <br></br> Times shown in: Africa/Addis_Ababa-EAT
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                <MDBTable id="displayMorningAppts">
                  <MDBTableHead>
                    <tr>
                      <th>Morning</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {timeLists.map((time) => {
                      if (time.isMorning === true) {
                        return (
                          <tr>
                            <td>
                              <input
                                type="button"
                                id={time.id}
                                value={time.time}
                                onClick={props.handleTimeSelect}
                                className={
                                  props.activeTimeSlot.active &&
                                  props.activeTimeSlot.key == time.id
                                    ? 'btn_select active'
                                    : 'btn_select'
                                }
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </MDBTableBody>
                </MDBTable>
              </td>
              <td>
                <MDBTable id="displayAfternoonAppts">
                  <MDBTableHead>
                    <tr>
                      <th>Afternoon</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {timeLists.map((time) => {
                      if (time.isMorning === false) {
                        return (
                          <tr>
                            <td>
                              <input
                                type="button"
                                class="btn_select"
                                id={time.id}
                                value={time.time}
                                onClick={props.handleTimeSelect}
                                className={
                                  props.activeTimeSlot.active &&
                                  props.activeTimeSlot.key == time.id
                                    ? 'btn_select active'
                                    : 'btn_select drill'
                                }
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </MDBTableBody>
                </MDBTable>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  } else {
    return <p className="bg-info text">Please select a date</p>;
  }
}

export default AvailableTimeSlot;
