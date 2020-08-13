import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
  } from 'mdbreact';
function RenewPassport(props){
    const backTo = e => {
        props.prevStep(e);
      };

    return(
<MDBContainer className="passport-container pt-3" id="request-an-appointment"  fluid>
<MDBRow>
    <MDBCol sm="12" lg="7">
    <app-doctor-type-step  class="ng-trigger ng-trigger-stepTransitions ng-tns-c1-0 ng-star-inserted" >
   <div class="multistep-form__step renew-passport-multistep">
      <h2 className="h1">Which type of issue are you facing?</h2>
      <div class="card card--small-gutters card--shadow vertical-margin-2">
      <a class="small-12 column row card--link">
   <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
      <strong>Expired</strong>
      <div class="text-center vertical-margin-half"><i class="fas fa-arrow-circle-right fa-lg"></i></div>
   </div>
   <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
      <p>If your child will be a new patient with a given department at Nationwide Children’s, please select this type of appointment.</p>
      <p> We welcome patients who have a diagnosis and have recently moved and need help with their transfer of care. </p>
   </div>
</a>
<a class="small-12 column row card--link vertical-margin-1">
   <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
      <strong>Page Left</strong>
      <div class="text-center vertical-margin-half"><i class="fas fa-arrow-circle-right fa-lg"></i></div>
   </div>
   <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
      <p>If your child has been seen by this department in the past, please select this type of appointment.</p>
   </div>
</a>

<a class="small-12 column row card--link vertical-margin-1">
   <div class="small-12 medium-4 column card card--small-gutters card--teal flex flex--column align-center text-center">
      <strong>Damaged</strong>
      <div class="text-center vertical-margin-half"><i class="fas fa-arrow-circle-right fa-lg"></i></div>
   </div>
   <div class="small-12 medium-8 column card card--small-gutters card--gray rtf rtf--small bold">
      <p>If your child has been seen by this department in the past, please select this type of appointment.</p>
   </div>
</a>
      </div>
      <div class="clear clearfix vertical-margin-2"><a class="button hollow gray ng-star-inserted" onClick={backTo}><i class="fas fa-arrow-left" ></i> Previous Screen </a>
      </div>
   </div>
</app-doctor-type-step>
            </MDBCol>
            <app-right-content class="small-12 medium-4 large-offset-1 large-4 column sticky-container" data-sticky-container="" _nghost-kxs-c3="" >
   <aside class="sidebar small sticky is-anchored is-at-top" data-btm-anchor="request-an-appointment:bottom" data-margin-top="2" data-sticky="s2eunn-sticky" data-sticky-on="medium" data-top-anchor="180" id="raa-sidebar" data-resize="raa-sidebar" data-mutate="raa-sidebar" data-events="mutate">
      
      <div  class="sidebar__box sidebar__box--border ng-star-inserted">
         <h4 >Talk to an Appointment Scheduler</h4>
         <ul class="vertical-margin-0">
            <li >
               <ul class="list--no-bullets list--single-line list--border">
                  <li ><a  href="tel:8008817385"><span  class="show-for-sr">Call us at:</span><i  aria-hidden="true" class="icon icon--phone orange"></i> 800-881-7385 </a></li>
                  <li ><a  href="tel:6147226200"><span  class="show-for-sr">Call us at:</span><i  aria-hidden="true" class="icon icon--phone orange"></i> 614-722-6200 </a></li>
                  <li > 7:30am – 5:30pm; Monday – Friday Eastern Time (ET). </li>
               </ul>
            </li>
         </ul>
      </div>
   </aside>
   <div  class="multistep-form__details sidebar__box sidebar__box--border sidebar__box--teal ng-star-inserted">
   <h4 ><span  class="ng-star-inserted">Appointment Request</span>
   </h4>
   <ul  class="list--no-indent list--no-bullets ng-star-inserted">
      <li >
    <strong >Requestor:</strong> 
      </li>
   </ul>
</div>
</app-right-content>

            </MDBRow>
            </MDBContainer>
    )
}
export default RenewPassport;