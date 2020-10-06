import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBRow, MDBTable, MDBTableBody,
    MDBTableHead, MDBBtn, MDBCollapse, MDBCollapseHeader,
    MDBIcon, MDBListGroup, MDBListGroupItem, MDBCol, MDBCard
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import API from '../Utils/API'
const accesstoken = localStorage.userToken;
const config = {
    headers: { Authorization: "Bearer " + accesstoken }
};

const BasicTable = () => {
  const [isOppened, setIsOppened] = useState(false);
  const [totalPriceList, setTotalPriceList] = useState([]);
  const [individualPrice, setIndividualPrice]=useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const counter = useSelector((state) => state);
  
  const toggleCollapse =() => {
    setIsOppened(!isOppened);
  }
  const requestInfo = counter.request[counter.request.length-1];
  let requestId=requestInfo?requestInfo.requestId:0;
  API.get("https://epassportservices.azurewebsites.net/Master/api/V1.0/ServicePrice/GetPriceForRequest?requestId="+requestId, config)
  .then((todo) => 
  {
      setTotalPriceList(todo.data.priceTotalDetail);
      setIndividualPrice(todo.data.individualPrice);
      setTotalPrice(todo.data.totalPrice);
  }
  )
  .catch((err) => {
      console.log("AXIOS ERROR: ", err.response);
  })
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
                                View Detail{isOppened===true?(<MDBIcon icon="angle-up" className='ml-5' />):(<MDBIcon icon="angle-down" className='ml-5' />)}
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

export default BasicTable;
















// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import InfoIcon from '@material-ui/icons/Info';
// import PaymentIcon from '@material-ui/icons/Payment';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// import {
//     MDBContainer, MDBRow, MDBTable, MDBTableBody,
//     MDBTableHead, MDBBtn, MDBCollapse, MDBCollapseHeader,
//     MDBIcon, MDBListGroup, MDBListGroupItem
// } from 'mdbreact';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`scrollable-force-tabpanel-${index}`}
//             aria-labelledby={`scrollable-force-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `scrollable-force-tab-${index}`,
//         'aria-controls': `scrollable-force-tabpanel-${index}`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// export default function ScrollableTabsButtonForce() {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <div className={classes.root}>
//             <AppBar position="static" color="default">
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     variant="scrollable"
//                     scrollButtons="on"
//                     indicatorColor="primary"
//                     textColor="primary"
//                     aria-label="scrollable force tabs example"
//                 >
//                     <Tab label="Total Price" icon={<PaymentIcon />} {...a11yProps(0)} />
//                     <Tab label="View Details" icon={<InfoIcon />} {...a11yProps(1)} />
//                 </Tabs>
//             </AppBar>
//             <TabPanel value={value} index={0}>
//                 <MDBContainer>

//                     <MDBTable hover>
//                         <MDBTableHead>
//                             {/* <tr>
// //           <th>First</th>
// //           <th>Last</th>
// //           <th>Handle</th>
// //         </tr> */}
//                         </MDBTableHead>
//                         <MDBTableBody>
//                             <tr>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  Base Price</h6></td>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  23</h6></td>
//                             </tr>
//                             <tr>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  Urgent Service fee</h6></td>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  344</h6></td>
//                             </tr>
//                             <tr>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  Expired Service Fee</h6></td>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  54</h6></td>
//                             </tr>
//                             <tr>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  Lost Penalty</h6></td>
//                                 <td><h6 className="font-weight-bolder text-muted text-uppercase">  656</h6></td>
//                             </tr>
//                             <tr>
//                                 <td><h6 className="font-weight-bold text-danger"> Total</h6> </td>
//                                 <td><h6 className="font-weight-bold text-danger"> $6000</h6> </td>
//                             </tr>
//                         </MDBTableBody>
//                     </MDBTable>

                    
//                 </MDBContainer>
//             </TabPanel>
//             <TabPanel value={value} index={1}>
//                 {/* <MDBRow>
//                     <MDBBtn
//                         color="primary"
//                         onClick={toggleCollapse}
//                         style={{ marginBottom: "1rem" }}
//                     >
//                         View Detail<MDBIcon icon="angle-down" />
//                     </MDBBtn>
//                 </MDBRow>
//                 <MDBCollapse id="basicCollapse" isOpen={isOppened}>
//                     <MDBListGroup>
//                         <MDBListGroupItem href="#" active>Applicant 1</MDBListGroupItem>
//                         <MDBTable hover>
//                             <MDBTableHead>
                                
                            
//                             </MDBTableHead>
//                             <MDBTableBody>
//                                 <tr>
//                                     <td><h6 className="font-weight-bolder text-muted text-uppercase">  Base Price</h6></td>
//                                     <td><h6 className="font-weight-bolder text-muted text-uppercase">  23</h6></td>
//                                 </tr>
//                                 <tr>
//                                     <td><h6 className="font-weight-bolder text-muted text-uppercase">  Urgent Service fee</h6></td>
//                                     <td><h6 className="font-weight-bolder text-muted text-uppercase">  344</h6></td>
//                                 </tr>
//                             </MDBTableBody>
//                         </MDBTable>
//                     </MDBListGroup>
//                     <MDBListGroup>
//                         <MDBListGroupItem href="#" active>Applicant 2</MDBListGroupItem>
//                         <MDBListGroupItem href="#" hover>
//                             <tr>
//                                 <td>Base Fare</td>
//                                 <td align="right">233</td>
//                             </tr>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem href="#" hover>
//                             <tr>
//                                 <td>Service Fare</td>
//                                 <td align="right">233</td>
//                             </tr>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem href="#" hover>
//                             <tr>
//                                 <td>Urgent Fare</td>
//                                 <td align="right">34</td>
//                             </tr>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem href="#" disabled>
//                             <tr>
//                                 <td>Total Fare</td>
//                                 <td align="right">456</td>
//                             </tr>
//                         </MDBListGroupItem>
//                     </MDBListGroup>
//                     <MDBListGroup>
//                         <MDBListGroupItem href="#" active>Applicant 3</MDBListGroupItem>
//                         <MDBListGroupItem href="#" hover>
//                             <tr>
//                                 <td>Base Fare</td>
//                                 <td align="right">233</td>
//                             </tr>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem href="#" hover>
//                             <tr>
//                                 <td>Service Fare</td>
//                                 <td align="right">233</td>
//                             </tr>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem href="#" hover>
//                             <tr>
//                                 <td>Urgent Fare</td>
//                                 <td align="right">34</td>
//                             </tr>
//                         </MDBListGroupItem>
//                         <MDBListGroupItem href="#" disabled>
//                             <tr>
//                                 <td>Total Fare</td>
//                                 <td align="right">456</td>
//                             </tr>
//                         </MDBListGroupItem>
//                     </MDBListGroup>

//                 </MDBCollapse> */}

//             </TabPanel>
//         </div>
//     );
// }
