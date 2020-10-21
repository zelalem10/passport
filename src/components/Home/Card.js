import React, {useState} from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardBody,
  MDBContainer,
} from 'mdbreact';
import newApplication from '../../images/icons/new passport-01.svg';
import alreadyHavePassport from '../../images/icons/register -01.svg';
import checkStatusImage from '../../images/icons/passport status .svg';
import alreadyHavePassportWhite from '../../images/icons/register 1 .svg';
import checkStatusImageWhite from '../../images/icons/passport status 1-01.svg';
import { Link } from 'react-router-dom';
import { faPassport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation, Trans } from 'react-i18next';

const CardExample = () => {
  const { t, i18n } = useTranslation();
  const [images,setImages]=useState ({
    img1:newApplication,
    img2:alreadyHavePassport,
    img3:checkStatusImage,
  });
const hoverHandler=(e)=>{
  let {id}=e.currentTarget;
if(id=='new'){
  setImages({...images,img1:newApplication})
 
}else if(id=='already'){
 setImages({...images,img2:alreadyHavePassportWhite})
}else if(id=='status'){
  setImages({...images,img3:checkStatusImageWhite})
}

}
const mouseLeaveHandler=(e)=>{
  let {id}=e.currentTarget;
  if(id=='new'){
    setImages({...images,img1:newApplication})
   
  }else if(id=='already'){
   setImages({...images,img2:alreadyHavePassport})
  }else if(id=='status'){
    setImages({...images,img3:checkStatusImage})
  }

}
  return (
    <MDBContainer className="passport-card-deck passport-container"  fluid>
      <MDBCardGroup className="passport-card">
        <MDBCard className="mr-4 default-active " id="new" onMouseEnter={(e)=>hoverHandler(e)} onMouseLeave={(e)=>mouseLeaveHandler(e)}>
          <MDBCardBody>
            {/* <FontAwesomeIcon icon={faPassport} size="lg" /> */}
            <img
            className="w-10 mb-2"
            src={images.img1}
          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-Dark" to="/request-appointment"><Trans>homeCard.startNewApplication</Trans> </Link>
              </MDBCardTitle>
            <MDBCardText>
          <Trans>homeCard.startNewApplicationDescription</Trans>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4 already-have-passport " id="already" onMouseEnter={(e)=>hoverHandler(e)} onMouseLeave={(e)=>mouseLeaveHandler(e)}>
          <MDBCardBody >
          <img
            className="w-10 mb-2"
            src={images.img2}

          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-Dark" to="/SignUp"><Trans>homeCard.register</Trans></Link>

              </MDBCardTitle>
            <MDBCardText>
            <Trans>homeCard.registerDescription</Trans>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mr-4 " id="status" onMouseEnter={(e)=>hoverHandler(e)} onMouseLeave={(e)=>mouseLeaveHandler(e)}>
          <MDBCardBody >
          <img
            className="w-10 mb-2"
            src={images.img3}

          ></img>
            <MDBCardTitle tag="h5">
            <Link class="card-title text-Dark" to="/Status"><Trans>homeCard.checkStatus</Trans></Link>

              </MDBCardTitle>
            <MDBCardText>
            <Trans>homeCard.checkStatusDescription</Trans>

            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
};

export default CardExample;
