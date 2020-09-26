import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MDBContainer } from 'mdbreact';
import '../Help and Support/Faq.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Faq() {
  const classes = useStyles();

  return (

            <MDBContainer className="faq-accordion my-5" >
<div class="u-center-text u-margin-bottom-big my-5"><h2 class="heading-secondary">    PASSPORT APPOINTMENT (FAQ)</h2>
</div>

<div class="row">
  <div class='col-lg-1'></div>
<div class="col-lg-10 pl-5">
<div className={classes.root}>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className='accordion-title'>
      When will slots be opened? / Why are there no available appointment slots?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      If you do not see available online appointment slots, it does not necessarily mean that they have been completely taken up. Please refresh the page as online appointments become available from time to time.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel4a-content"
      id="panel4a-header"
    >
      <Typography className='accordion-title'>
      I lost my passport, what should I do?
          </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      An appointment is necessary for all lost passports and applicants will need to submit documents required of first time applicants. In case of lost or stolen VALID passport, you will be required further to submit a Police Report and Confirmation (evidence) of Loss. There will be a 15-day clearing period prior to the processing of application for the replacement of a lost valid passport. In case of lost EXPIRED passport, you will be required further to submit Confirmation of Loss.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      How can I set an appointment? / Do I still need to set an appointment for renewal?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      You need to set an online appointment via http://www.epassport.gov, Passport appointments cannot be made on Facebook or any other social media platform. Appointments not made through http://epassport are not legitimate appointments.

If you are not able to show up at schedule date, you shall cancel your appointment by sending SMS (Cancel to 8611)

      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      I made a mistake in filling out my application form. Will this affect my application?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      The application form may be corrected based on your documents on the day of your appointment. Please inform the passport processor about it. Please be reminded that any incorrect information that is inputted in the application form may result in delay in your application. Any misrepresentation on your part may be considered grounds for refusal or cancellation of your appointment.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      Where can I find my appointment code?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      The appointment code / reference number would be sent to the email / phone number you used in the application process. Please also check for the appointment code / reference number in the spam folder or trash folder in your email, as your email provider may direct it to these folders. For SMS please check your message box. If you have not received it, you may contact the Appointment Hotline for assistance at (251) xxx-xxxx.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      Who is eligible to apply for a Ethiopian passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        
      Only Ethiopian citizen is eligible to acquire Ethiopian passport.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className='accordion-title'>
      How do I apply for a Ethiopian passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      Set an appointment at epassport site. Appear on the actual date of appointment and bring the complete set of requirements appropriate to your application.

EXCEPTIONAL AND EMERGENCY 
ONLY EXCEPTIONAL AND EMERGENCY CASES are allowed to process passport request without appointment. 

Non-emergency applicants must secure an online appointment at Ethiopian passport. To see if you are qualified, please Appointment page

      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      What are the requirements for a passport application?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      For the list of requirements, please visit the Passport homepage.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      Where is the nearest consular office / passport capturing site in my location?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      You may view the complete list of consular office / passport capturing site at the Directory page / information.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel4a-content"
      id="panel4a-header"
    >
      <Typography className='accordion-title'>
      What is the validity of Ethiopian passport?
          </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      The Ethiopian passport has a 5-years validity period.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      How much is the passport fee?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      For passports applied for in the Ethiopian:
New / Renewal
Regular – ETB 600
Expedite – ETB 1200
Penalty for Lost and Mutilated-xxxxxxx

For passports applied for foreign, please refer to the consular fees as stated in the Ethiopian Embassy or Consulate websites (Refer).

      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      Where can I claim my passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        
      You may claim your passport at the consular office / passport capturing site or (Postal office) where you originally submitted your application.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className='accordion-title'>
      What if I lost my valid passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      In case of lost or stolen valid passport, you may file / attach and report your lost valid passport application at the Consular Office of your choice / immigration office. You will be required to submit a Police Report. There will be a [15-day] clearing period prior to the processing of application for the replacement of a lost valid passport.
      </Typography>
    </AccordionDetails>
  </Accordion>
   <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      What if I lost my expired passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      In case of lost expired passport, you will be required to submit Confirmation of Loss. Your application will be considered as first-time passport application.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      What if my passport is damaged?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      In case of mutilated or damaged passports, you are required to submit Confirmation of Mutilation along with your passport application requirements.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      Can additional pages be inserted in the passport if it has run out of pages?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      No. The Ethiopian passport has a standard booklet containing thirty-two (32) or sixty four (64) pages. Should the passport run out of pages, you may require to renew your passport.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      What should I bring along when I claim my passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      You should bring your original appointment receipt letter 
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      What if I do not claim my passport after applying for one?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      The Department will cancel your passport if you do not claim it within [one hundred and eighty (180) ] days from the application date.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      I applied for a passport before but never claimed it. Do I need to declare it?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      Yes. You may request for a Certificate of Unclaimed Passport from immigration office or the concerned Consular Office, and submit this certification together with your application.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      My passport’s validity is less than 6 months, can I still use it to travel outside the country?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      No. Your passport must be at least six-months valid for you to be able to travel abroad
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      I have an urgent travel. How can I qualify for an early accommodation?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      Request for early accommodation may be considered if the purpose of travel is for medical or legal emergency purposes, death in the family, etc
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      I have valid foreign visas on my old passport. Should I have it transferred to my new one?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      No. Expired and Renewed passports do not affect the validity of the Visas. However, you must bring your old passport with valid visas along with your new passport when travelling. When in doubt, consult the Foreign Embassy that issued your visa.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      Can I renew my passport even though it is still valid for more than one (1) year?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      Yes. You will need an online passport appointment.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      Is it mandatory to renew my expired passport even though I have no plans to travel anytime soon?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      No. You may renew your expired passport any time you wish. However, we strongly recommend that you should have a valid passport with at least seven to eight (7-8) months validity prior to making any travel plans.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      Are there any penalties for the replacement of my expired passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      No. There are no penalties for the replacement of your expired passport.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      Do I need to bring a passport-sized photo for my application?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      No. You do not need to bring a passport-sized photo for your passport application. The Immigration / or Consular Office will digitally capture your biometrics.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      What is the consular service hotline I can contact?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      (+251) xxxx-xxxx / (+251) xxxx-xxxx (Passport Appointment Concerns)
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className='accordion-title'>
      I applied for express processing for my passport; will I be able to get my passport exactly after seven working days?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      The dates indicated are tentative dates of release. Unless the application will not encounter any hits in the system, the passport will be ready on the indicated date of release.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
    >
      <Typography className='accordion-title'>
      Can I apply with friend or family as group for a passport?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
      Yes, group passport appointment five [5], individual payment and individual document is required to submit.
      </Typography>
    </AccordionDetails>
  </Accordion>

</div>
    </div>
    <div class='col-lg-1'></div>
</div>


</MDBContainer>

);
}
