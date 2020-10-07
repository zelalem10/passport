import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBRow, MDBTable, MDBTableBody,
    MDBTableHead, MDBBtn, MDBCollapse, MDBCollapseHeader,
    MDBIcon, MDBListGroup, MDBListGroupItem, MDBCol, MDBCard
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import API from '../Utils/API'
import addPriceInfo from '../../redux/actions/priceInfoAction';

const accesstoken = localStorage.userToken;
const config = {
    headers: { Authorization: "Bearer " + accesstoken }
};

const PricingDetail = () => {
    const [isOppened, setIsOppened] = useState(false);
    const [totalPriceList, setTotalPriceList] = useState([]);
    const [individualPrice, setIndividualPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const counter = useSelector((state) => state);
    const dispatch = useDispatch();

    const toggleCollapse = () => {
        setIsOppened(!isOppened);
    }

    useEffect(() => {
        const requestInfo = counter.request[counter.request.length - 1];
        let requestId = 52;//requestInfo?requestInfo.requestId:0;
        API.get("https://epassportservices.azurewebsites.net/Master/api/V1.0/ServicePrice/GetPriceForRequest?requestId=" + requestId, config)
            .then((todo) => {
                setTotalPriceList(todo.data.priceTotalDetail);
                setIndividualPrice(todo.data.individualPrice);
                setTotalPrice(todo.data.totalPrice);
                dispatch(addPriceInfo({totalAmount: todo.data.totalPrice}));
            }
            )
            .catch((err) => {
                console.log("AXIOS ERROR: ", err.response);
            })
    }, []);
    return (
        <MDBContainer>
            <MDBTable hover>
                <MDBTableBody>
                    {totalPriceList.map((totalPrice) =>
                        <tr>
                            <td><h6 className="font-weight-bolder text-muted text-uppercase"> {totalPrice.lable}</h6></td>
                            <td><h6 className="font-weight-bolder text-muted text-uppercase"></h6></td>
                            <td><h6 className="font-weight-bolder text-muted text-uppercase"> {totalPrice.amount}</h6></td>
                        </tr>
                    )}
                    <tr>
                        <td><h6 className="font-weight-bold text-danger"> Total</h6> </td>
                        <td><h6 className="font-weight-bold text-danger"> {totalPrice}</h6> </td>
                        <td><h6 className="font-weight-bold text-danger"> ETB</h6> </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
            {individualPrice.length > 0 ? (
                <MDBCard>
                    <MDBRow>
                        <MDBCol md="2"></MDBCol>
                        <MDBCol md="10">
                            <MDBBtn
                                color="primary"
                                onClick={toggleCollapse}
                                style={{ marginBottom: "1rem" }}
                                className='px-3'
                            >
                                View Detail{isOppened === true ? (<MDBIcon icon="angle-up" className='ml-5' />) : (<MDBIcon icon="angle-down" className='ml-5' />)}
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBCollapse id="basicCollapse" isOpen={isOppened}>
                        {individualPrice.map((prices) =>
                            <MDBListGroup>
                                <MDBListGroupItem href="#" active>{prices.personFullName}</MDBListGroupItem>
                                <MDBTable hover>
                                    <MDBTableHead>
                                    </MDBTableHead>
                                    {prices.priceDetail.map((detail) =>
                                        <MDBTableBody>
                                            <tr>
                                                <td><p className="font-weight-bolder text-muted text-uppercase"> {detail.lable}</p></td>
                                                <td><p className="font-weight-bolder text-muted text-uppercase"> {detail.amount}</p></td>
                                            </tr>
                                        </MDBTableBody>
                                    )}
                                </MDBTable>
                            </MDBListGroup>

                        )}
                    </MDBCollapse>
                </MDBCard>
            ) : (null)}
        </MDBContainer>
    );
}
export default PricingDetail;
