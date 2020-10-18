import React from 'react';
import { MDBIcon, MDBContainer, MDBBtn, MDBInput } from 'mdbreact';

const About = () => {
    return (

        <MDBContainer className="container my-5" fluid>
            <div id="about" class="py-3">

                <div class="row my-5">
                    <div class="col-md-6">
                        <h1>What We Do</h1>
                        <p>This is institution established again by coordinating the prosperity reform works in Ethiopia. It is called FDRE Immigration, Nationality and vital events agency. </p>
                        <p>What history says?
                        On vital events registration from Emperor Minilik to foreign citizens birth and death documents were given and this is clearly stated on historical documents. It starts working by following legal outlines on 1942. Based on by state government declaration seventy fourth city officials were assigned to register residence of the city and the title was stated at letter “D” writing on civil status means/birth, marriage and death/.
</p>
                        <p>The other thing concerning the ministry authority on order number 1/1935 and number 36 letter “D” by the power of ministry of state for counting public authority for marriage and birth registration on civil status given to it by law by giving power of attorney to the municipality of the city for implementation of better work necessary internal laws and regulations given to it. </p>

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
                                           <p class="text-justify">Based on 1951 law notification number 150/43 to assign the place for cemetery, controlling cemetery and it is counted as one of activities issued to the municipality by the civil code law drafted on 1960 to implement vital events registration many articles included on this law number 3361 /1/ for implementing those articles concerning with civil status till unique regulation drafted the aim of vital events the process and implementation when it is compared with the modern and proper registration work manner even though it is tried to include some points reserving the gaps concerning vital events registration and collecting information works conducted in different governmental organizations (i.e Municipality, city administration offices, central statistics agency and health center. On this hand, the processes of registration of vital events were conducted in religious organizations.  
                   So, in 1943 marriage, in 1954 birth, in 1968 death registration started. This registration done for legal and administrational affairs and by the persons who are willing to register the events certificate is issued.
Participants of vital events registration 
</p>
                    </div>
                </div>




                <div class="row my-5 equalcard">
                    <div class="col-md-4 equalcard">
                        <div class="card">
                            {/* <img src="https://source.unsplash.com/random/300x200" alt="" class="img-fluid card-img-top"></img> */}
                            <div class="card-body">
                                <h4 class="card-title">Vision</h4>
                                           <hr></hr>
                                <p class="card-text">Our vision being one of the 10 best agencies in Africa in 2022 through supporting the information and service provision with technology, making the quality fits with international standards and ensuring its security. 
                </p>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-4 equalcard">
                        <div class="card ">
                            {/* <img src="https://source.unsplash.com/random/300x200" alt="" class="img-fluid card-img-top"></img> */}
                            <div class="card-body">
                                <h4 class="card-title">Mission</h4>
     
                                <hr></hr>
                                <p class="card-text">
                                    <ul>
                                    <li>Ensuring the legal movement of people and granting foreign national with citizenship by ensuring reliable, quality and secured documents accessible to users.  </li>
                                    <li>Compiling, organizing and making accessible secured complete and quality information and documents to users through utilizing a system supported by research and study, and equipped with technology.  </li>
                                    <li>Ensuring the provision of swift and effective service through creating awareness to the public and stakeholders about the importance of the agency service.  </li>
                                </ul>
                </p>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-4 equalcard">
                        <div class="card ">
                            {/* <img src="https://source.unsplash.com/random/300x200" alt="" class="img-fluid card-img-top"></img> */}
                            <div class="card-body">
                                <h4 class="card-title">Values </h4>
                      
                                <hr></hr>
                                <p class="card-text">
                                    <ul>
                                    <li>Nationalism </li>
                                    <li>Complete personality/ Autonomy</li>
                                    <li>Accountability </li>
                                    <li>Team work </li>
                                    <li>Trusted provider </li>
                                    <li>Confidentiality </li>
                                    <li>Fairness </li>
                                </ul>
                </p>
                            </div>
                        </div>

                    </div>
                </div>


                <div id="icon-boxes">

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



                </div>
            </div>

        </MDBContainer>

    );
};

export default About;