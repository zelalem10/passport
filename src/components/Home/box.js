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
          <div class="col-md-6 beforeYouApply active">
            <img
              src={require('../../images/default-source/shared/INVEA_How_to_apply.jpg')}
              class="img-fluid"
              alt=""
            ></img>
          </div>
          <div class="col-md-6 Informationforicon">
          <div class="u-center-text">
                    <h3 class="heading-secondary text-dark">
                      <Trans>beforYouApplyList.title</Trans>
                     </h3>
                </div>
               
            <div class="d-flex">
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemOne</Trans>
              </div>
            </div>

            <div class="d-flex">
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemTwo</Trans>
              </div>
            </div>

            <div class="d-flex">
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemThree</Trans>
              </div>
            </div>
            <div class="d-flex">
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemFour</Trans>
               </div>
            </div>
            <div class="d-flex">
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemFive</Trans>        
               </div>
            </div>
            <div class="d-flex">
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemSix</Trans>         
                    </div>
            </div>
            <div class="d-flex" >
              <div class="pr-2 pl-2 pb-2  align-self-start">
                <i class="fas fa-check fa-1x"></i>
              </div>
              <div class="pr-2 pl-2 pb-2  align-self-end">
              <Trans>beforYouApplyList.itemSeven</Trans>    
                          </div>
            </div>
  


                      {/* <div class="col-12 medium text-center my-3"><Link to="/Information" class="btn btnBlu">Read More</Link></div> */}
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

export default BoxPage;
