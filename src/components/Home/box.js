import React from 'react';
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const BoxPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <MDBContainer className="box-container my-5 passport-container" fluid>
        <div class="row my-5">
          <div class="col-md-6">
            <img
              src={require('../../images/default-source/shared/How to apply.jpg')}
              class="img-fluid my-3"
              alt=""
            ></img>
          </div>
          <div class="col-md-6 Informationforicon">
          <div class="u-center-text my-3">
                    <h3 class="heading-secondary">
                      <Trans>beforYouApplyList.title</Trans>
                     </h3>
                </div>
               
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemOne</Trans>
              </div>
            </div>

            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemTwo</Trans>
              </div>
            </div>

            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemThree</Trans>
              </div>
            </div>
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemFour</Trans>
               </div>
            </div>
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemFive</Trans>        
               </div>
            </div>
            <div class="d-flex">
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemSix</Trans>         
                    </div>
            </div>
            <div class="d-flex" >
              <div class="p-2 align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="p-2 align-self-end">
              <Trans>beforYouApplyList.itemSeven</Trans>    
                          </div>
            </div>
  


                      {/* <div class="col-12 medium text-center my-3">
                        <Link to="/Information" class="btn btnBlu">   
                      <Trans>beforYouApplyList.readMore</Trans>   
                       </Link></div> */}
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default BoxPage;
