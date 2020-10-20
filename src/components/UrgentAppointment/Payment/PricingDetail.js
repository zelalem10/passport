import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBCollapse,
  MDBCollapseHeader,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBCol,
  MDBCard,
} from 'mdbreact';

import API from '../../Utils/API';
import addPriceInfo from '../../../redux/actions/priceInfoAction';
import { useDispatch, useSelector } from 'react-redux';
const accesstoken = localStorage.userToken;
const config = {
  headers: { Authorization: 'Bearer ' + accesstoken },
};

const BasicTable = (props) => {
  const { handlePaymentId, firstName, lastName } = props;
  const [isOppened, setIsOppened] = useState(false);
  const [totalPriceList, setTotalPriceList] = useState([]);
  const [individualPrice, setIndividualPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [counter, setCounter] = useState(1);

  const toggleCollapse = () => {
    setIsOppened(!isOppened);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    API.get(
      `https://epassportservices.azurewebsites.net/Master/api/V1.0/ServicePrice/GetPriceForRequest?requestId=${handlePaymentId}`,
      config
    )
      .then((todo) => {
        setTotalPriceList(todo.data.priceTotalDetail);
        setIndividualPrice(todo.data.individualPrice);
        setTotalPrice(todo.data.totalPrice);
        dispatch(addPriceInfo({ totalAmount: todo.data.totalPrice }));
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err.response);
      });
  }, []);
  return (
    <MDBContainer>
      <MDBTable hover>
        <MDBTableHead></MDBTableHead>
        <MDBTableBody>
          {totalPriceList.map((totalPrice) => (
            <tr>
              <td>
                <h6 className="font-weight-bolder text-muted text-uppercase">
                  {' '}
                  {totalPrice.lable}
                </h6>
              </td>
              <td>
                <h6 className="font-weight-bolder text-muted text-uppercase">
                  {' '}
                  {totalPrice.amount}
                </h6>
              </td>
            </tr>
          ))}

          <tr>
            <td>
              <h6 className="font-weight-bold text-danger"> Total</h6>{' '}
            </td>
            <td>
              <h6 className="font-weight-bold text-danger">
                {' '}
                {totalPrice} ETB
              </h6>{' '}
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      {individualPrice.length > 0 ? (
        <MDBCard>
          <MDBRow>
            <MDBCol md="8"></MDBCol>
            <MDBCol md="8">
              <MDBBtn
                color="primary"
                onClick={toggleCollapse}
                style={{ marginBottom: '1rem' }}
              >
                View Detail
                <MDBIcon icon="angle-down" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBCollapse id="basicCollapse" isOpen={isOppened}>
            {individualPrice.map((prices) => (
              <MDBListGroup>
                <MDBListGroupItem href="#" active>
                  {firstName} {lastName}
                </MDBListGroupItem>
                <MDBTable hover>
                  <MDBTableHead></MDBTableHead>
                  {prices.priceDetail.map((detail) => (
                    <MDBTableBody>
                      <tr>
                        <td>
                          <h6 className="font-weight-bolder text-muted text-uppercase">
                            {' '}
                            {detail.lable}
                          </h6>
                        </td>
                        <td>
                          <h6 className="font-weight-bolder text-muted text-uppercase">
                            {' '}
                            {detail.amount}
                          </h6>
                        </td>
                      </tr>
                    </MDBTableBody>
                  ))}
                </MDBTable>
              </MDBListGroup>
            ))}
          </MDBCollapse>
        </MDBCard>
      ) : null}
    </MDBContainer>
  );
};

export default BasicTable;
