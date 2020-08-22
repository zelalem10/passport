import React, { useEffect, useState } from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBLink, MDBContainer, MDBRow,
  MDBCol
} from "mdbreact";
import "mdbreact/dist/css/mdb.css";

export default function ServiceList() {
  const [list, setList] = useState([]);
  const mockAdapter = new MockAdapter(axios);
  mockAdapter.onGet("/RequestTypes").reply(200, {
    requestTypes: [
      { id: 1, name: "New Request" }
      , { id: 1, name: "Renewal" }
      , { id: 1, name: "Lost Passport" }
      , { id: 1, name: "Damaged" }
      , { id: 1, name: "Correction" }],
  });

  useEffect(() => {
    axios.get("/RequestTypes")
      .then((todo) => setList(todo.data.requestTypes))
  }, [])

  return (
    <MDBContainer size="md">
      <MDBCardHeader backgraound="transparent-color" tag="h4">Ethiopian e-Passport service</MDBCardHeader>
      <p className="text-justify">
        Please read all information thoroughly before sending in your application, incomplete or missing documentation can result in a longer processing time.
        It is highly recommended that all applications that are sent by post use registered post, please keep your tracking numbers to check when your application is received.
        </p>
      <MDBRow>
        {list.map((requestType) =>
          <MDBCol md="4">
            <MDBCard>
              <MDBCardHeader backgraound="transparent-color" tag="h5">
                {requestType.name}
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                   </MDBCardText>
                <MDBLink to='/' link>
                  Apply now
                    </MDBLink>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )
        }
      </MDBRow>
    </MDBContainer>

  )
}
