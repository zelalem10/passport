import React from 'react';
import { MDBIcon, MDBContainer, MDBBtn, MDBInput } from 'mdbreact';
import { useTranslation, Trans } from 'react-i18next';
const About = () => {
    const { t, i18n } = useTranslation();
    return (

        <MDBContainer className="container my-5" fluid>
            <div id="about" class="py-3">

                <div class="row my-5">
                    <div class="col-md-6">
                        <h1><Trans>about.title</Trans></h1>
                        <p><Trans>about.paragraphOne</Trans></p>
                        <p><Trans>about.paragraphTwo</Trans></p>

                    </div>
                    <div class="col-md-6">
                        <img src={require('../../images/Information/aboutEnvea.jpg')} alt="" class="img-fluid rounded-circle about-img w-75">
                        </img>
                    </div>
                </div>
                <div class="row my-5">
                    {/* <div class="col-md-6">
                    <img src="https://source.unsplash.com/random/701x700/?technology" alt="" class="img-fluid rounded-circle about-img w-75">
                        </img>
                    </div> */}
                    <div class="col-md-12">
                     <p class="text-justify"> <p><Trans>about.paragraphThree</Trans></p>
</p>
                    </div>
                </div>




                <div class="row mt-5 equalcard">
                    <div class="col-md-4 equalcard">
                        <div class="card">
                            {/* <img src="https://source.unsplash.com/random/300x200" alt="" class="img-fluid card-img-top"></img> */}
                            <div class="card-body">
                                <h4 class="card-title"><Trans>about.vision</Trans></h4>
                                           <hr></hr>
                                <p class="card-text"><Trans>about.visionDetail</Trans> 
                </p>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-4 equalcard">
                        <div class="card ">
                            {/* <img src="https://source.unsplash.com/random/300x200" alt="" class="img-fluid card-img-top"></img> */}
                            <div class="card-body">
                                <h4 class="card-title"><Trans>about.mission</Trans> </h4>
     
                                <hr></hr>
                                <p class="card-text">
                                    <ul>
                                    <li><Trans>about.missionFirstList</Trans> </li>
                                    <li><Trans>about.missionSecondList</Trans> </li>
                                    <li><Trans>about.missionThirdList</Trans></li>
                                </ul>
                </p>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-4 equalcard">
                        <div class="card ">
                            {/* <img src="https://source.unsplash.com/random/300x200" alt="" class="img-fluid card-img-top"></img> */}
                            <div class="card-body">
                                <h4 class="card-title"><Trans>about.values</Trans> </h4>
                      
                                <hr></hr>
                                <p class="card-text">
                                    <ul>
                                    <li><Trans>about.valuesListOne</Trans> </li>
                                    <li><Trans>about.valuesListTwo</Trans></li>
                                    <li><Trans>about.valuesListThree</Trans> </li>
                                    <li><Trans>about.valuesListFour</Trans></li>
                                    <li><Trans>about.valuesListFive</Trans></li>
                                    <li><Trans>about.valuesListSix</Trans> </li>
                                    <li><Trans>about.valuesListSeven</Trans> </li>
                                </ul>
                </p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* <div id="icon-boxes">

                    <div class="row mb-4 equalcard">
                        <div class="col-md-3 equalcard">
                            <div class="card bg-passport text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-building fa-3x"></i>
                                    <h3>Municipalities </h3>
              One of the long times experienced organization is Addis Ababa city municipality.
            </div>
                            </div>
                        </div>
                        <div class="col-md-3 equalcard">
                            <div class="card bg-dark text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-bullhorn fa-3x"></i>
                                    <h3>Central Statistics Agency </h3>
              Established as one governmental organization with name general statistics...
            </div>
                            </div>
                        </div>
                        <div class="col-md-3 equalcard">
                            <div class="card bg-passport text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-comments fa-3x"></i>
                                    <h3>Health institutions </h3>
              Health Institution issue birth and death certificate while they are serving.
            </div>
                            </div>
                        </div>
                        <div class="col-md-3 equalcard">
                            <div class="card bg-dark text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-building fa-3x"></i>
                                    <h3>Justice and Law Process Research Institute  </h3>
              Justice and Law Process Research Institute prepared drafted laws
            </div>
                            </div>
                        </div>

                    </div>

                    <div class="row mb-4 equalcard">
                        <div class="col-md-3 equalcard">
                            <div class="card bg-dark text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-box fa-3x"></i>
                                    <h3>Religious Organizations </h3>
              They were serving by following governmental or religious institution since before several years.
            </div>
                            </div>
                        </div>
                        <div class="col-md-3 equalcard">
                            <div class="card bg-passport text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-credit-card fa-3x"></i>
                                    <h3>Plan Ethiopia and Children of Africa Policy </h3>
              One of the organization that play a great role for establishment of proper..
            </div>
                            </div>
                        </div>
                        <div class="col-md-3 equalcard">
                            <div class="card bg-dark text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-coffee fa-3x"></i>
                                    <h3>Ethiopian Human Right Commission </h3>
              Ethiopian human rights commission works on creating awareness on vital events registration by conducting meeting.
            </div>
                            </div>
                        </div>
                        <div class="col-md-3 equalcard">
                            <div class="card bg-passport text-white text-center">
                                <div class="card-body">
                                    <i class="fas fa-bullhorn fa-3x"></i>
                                    <h3>Ethiopian Public Policy </h3>
              Ethiopian Public Policy issued enforcement for implementation of vital events.
            </div>
                            </div>
                        </div>

                    </div>



                </div> */}
            </div>

        </MDBContainer>

    );
};

export default About;