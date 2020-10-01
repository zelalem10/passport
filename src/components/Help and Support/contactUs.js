import React from 'react';
import { MDBIcon, MDBContainer, MDBBtn, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (


        <MDBContainer className="passport-card-deck passport-container my-3" fluid>

            <div class="row">
                <div class="col-md-3 my-5">
                    <div class="card p-2">
                        <div class="card-body">
                            <h4>Get In Touch</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio!</p>
                            <h4>Address</h4>
                            <p>test street</p>
                            <h4>Email</h4>
                            <p>test@test.com</p>
                            <h4>Phone</h4>
                            <p>8133 FREE CALL</p>
                            <h4>Social Media Link</h4>
                            <div class="d-inline">
                                <Link to="#!" className="fb-ic ePassprt-text-color">
                                    <MDBIcon fab icon="facebook-f" className='mr-2' />
                                    <p class='d-inline ePassprt-text-color'>FDRE Immigration Nationality and Vital Events Agency</p>

                                </Link></div>
                            <br></br>
                            <div class="d-inline">
                                <Link to="#!" className="tw-ic ePassprt-text-color">
                                    <MDBIcon fab icon="twitter" className='mr-2' />
                                    <p class='d-inline ePassprt-text-color'>Immigration Nationality and Vital Event Agency</p>

                                </Link></div>




                        </div>
                    </div>
                </div>
                <div class="col-md-6 my-5">
                    <div class='card p-4'>
                        <h3 class="text-center my-4">Please fill out this form to contact us</h3>
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <MDBInput type="text" label="Firs Name" outline />
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">

                                    <MDBInput type="text" label="Last Name" outline />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className="form-group">

                                    <MDBInput type="text" label="Phone Number" outline />
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">

                                    <MDBInput type="text" label="Your e-mail" outline />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div className="form-group">
                                    <MDBInput type="textarea" label="Please Write Your Message Here" outline />
                                </div>
                            </div>
                            <div class="col-12 medium text-center">
                                <Link to="/Information" class="btn btnBlu">Submit</Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-3 my-5">
                    <MDBTable>
                        <thead class="thead-lightt">
                            <tr>
                                <th>Brach Office name</th>
                                <th>Phone number </th>
                                <th>FAX Number</th>
                            </tr>
                        </thead>
                        <MDBTableBody>
                            <tr>
                                <td>Bahrdar</td>
                                <td>0582263730</td>
                                <td>0582264022</td>
                            </tr>
                            <tr>
                                <td>Mekelle </td>
                                <td>0344416772</td>
                                <td>0344409291</td>
                            </tr>
                            <tr>
                                <td>Dessie</td>
                                <td>0331122581</td>
                                <td>0331123837</td>
                            </tr>
                            <tr>
                                <td>Semera</td>
                                <td>0333662077</td>
                                <td>0336660282</td>
                            </tr>
                            <tr>
                                <td>Diredawa</td>
                                <td>0251112497</td>
                                <td>0251117880</td>
                            </tr>
                            <tr>
                                <td>Adama</td>
                                <td>0222126637</td>
                                <td>0222128463</td>
                            </tr>
                            <tr>
                                <td>Jigjiga</td>
                                <td>----------</td>
                                <td>0252782038</td>
                            </tr>
                            <tr>
                                <td>Hawasa</td>
                                <td>0462214223</td>
                                <td>0462213143</td>
                            </tr>
                            <tr>
                                <td>Jimma</td>
                                <td>0471116745</td>
                                <td>0471121228</td>
                            </tr>

                        </MDBTableBody>
                    </MDBTable>
                </div>

            </div>


        </MDBContainer>
    );
};

export default ContactUs;