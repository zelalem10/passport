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

export default function Information() {
    const classes = useStyles();

    return (
        <MDBContainer className="passport-container"  fluid>
            <div class="row passportaccordion" >
                <div class="col-lg-8 mr-5">
                <div class="u-center-text u-margin-bottom-big mt-5">
                    <h2 class="heading-secondary">How to Apply</h2>
                </div>

                    <div className={classes.root} class='faq-accordion'>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='accordion-title'>
                                    New Passport
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                        New Passport applicants must fulfil the following requirements.
                                    </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li> Valid Kebele Identity card and authenticated Birth certificate.</li>

                                        </ul>

                                        <li>If you are applying for Urgent Services, you must At least have one of the following</li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>
                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>

                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>64 page passport</td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page passport </td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>

                                </Typography>
                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className='accordion-title'>
                                    Expired Passport
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                        Expired Passport applicants must fulfil the following requirements.
                                    </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>Copy  of the expired Passport’s information page.</li>

                                        </ul>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>

                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>64 page passport</td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page passport </td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>

                                </Typography>


                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                    Passport Page RunOut
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                        For applicants of passport page run out must fulfil the following requirements.
    If your passport is With 3 or {'<'} 3 pages left

                                    </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>Copy of the Passport’s information page </li>

                                        </ul>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <p>If your passport has more than 6 month’s validity, the payment will have additional 50% of the requested passport.</p>

                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>

                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>64 page passport page run out</td>
                                                    <td>2186 + 50% =3279</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page passport page run out </td>
                                                    <td scope="col">600+ 50% =900</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>
                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                            >
                                <Typography className='accordion-title'>
                                    Damaged Passport
          </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                        For applicants of damaged passport must fulfil the following requirements.
                                        If your passport is damaged through different reasons


                                    </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>Copy  of the  Passport’s information page or any page of the passport which have the passport number and valid Kebele Identity card  </li>

                                        </ul>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <p>If your passport has more than 6 month’s validity, the payment will have additional 50% of the requested passport.</p>

                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col">Passport status</th>
                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2">If the damaged passport is Expired </td>
                                                    <td >64 page  </td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page </td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="2">If the damaged passport is Expired </td>
                                                    <td >64 page  </td>
                                                    <td>2186+ 50% =3279</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page </td>
                                                    <td scope="col">600+ 50% =900</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>

                                </Typography>


                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className='accordion-title'>
                                    Lost/Stolen Passport
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                        For applicants of Lost/Stolen passport must fulfil the following requirements.
                                </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>Valid Kebele identity card </li>
                                            <li>Police evidence letter</li>
                                            <li>Copy of passport or information about the passport if you have.</li>


                                        </ul>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <p>If your passport has more than 6 month’s validity, the payment will have additional 50% of the requested passport.</p>

                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col">Passport status</th>
                                                    <th scope="col">Passport description</th>
                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2">Lost passport</td>
                                                    <td rowspan="2">Replacement of lost passport for both valid and expired passport</td>
                                                    <td >64 page  </td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page </td>
                                                    <td scope="col">600+ 50% =900</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>

                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                    Change of Passport Data
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                        Applicants for change of passport data must fulfil the following requirements.
                                        If you need to change the passport information like name change, birth place and birth date

                                </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>Copy of passport information page </li>
                                            <li>Court evidence letter</li>

                                        </ul>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <p>If your passport has more than 6 month’s validity, the payment will have additional 50% of the requested passport.</p>

                                        <table class="table  my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col">Passport status</th>
                                                    <th scope="col">Passport description</th>
                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2">Correction</td>
                                                    <td rowspan="2">requests for correction for expired passports</td>
                                                    <td >64 page  </td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page </td>
                                                    <td scope="col">600+50%=900                                                                                           </td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="2">Correction</td>
                                                    <td rowspan="2">Replacement of passport for correction for valid passport</td>
                                                    <td >64 page </td>
                                                    <td>2186+ 50% =3279</td>

                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page </td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>

                                </Typography>
                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                    Not Expired Passport
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                        Applicants for change of passport data must fulfil the following requirements.
If your passport is With 2 or {'<'} 2 years of valid date, you should have to put the reason like DV, scholarship, foreign residence permit, and embassy appointment.


                                </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>Copy of passport information page </li>


                                        </ul>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>
                                        <li>Check the service fee for new Passport</li>
                                        <p>If your passport has more than 6 month’s validity, the payment will have additional 50% of the requested passport.</p>

                                        <table class="table  my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col">Passport status</th>
                                                    <th scope="col">Passport type</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2">not expired/ valid passport</td>
                                                    <td >64 page  </td>
                                                    <td>2186+ 50% = 3279</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col">32 page </td>
                                                    <td scope="col">600+50% = 900                                                                                           </td>
                                                </tr>


                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'>For Urgent : Additional 50% Payment of the requested document</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li>Scan all the required documents and resize them according to the guidelines.</li>
                                        <li>Payment will be through online and banks using the payment code generated after the application form submitted.</li>
                                        <li>After you apply for the service, you must print the last page which has your appointment and delivery date and time. Take the paper with you to your appointment.</li>
                                        <li>When you come to the office on the appointment date, you need to make sure that:</li>
                                        <ul class='my-1'>
                                            <li>You have the appointment paper with you</li>
                                            <li>You have all the original required documents with you. These should be the same documents that you uploaded with the Online Application.</li>
                                            <li>If you are applying as an applicant, you should come yourself. Proxy Applications are not allowed and acceptable. If you are applying as a guardian or parent, you have to accompany the child/toddler.</li>
                                        </ul>
                                    </ol>

                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                    Applicant Under 18
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                        If the applicant is under 18, parents or guardians are required to attach the following document
                                </p>

                                    <br></br>
                                    <ol>
                                        <li>Prepare all the required documents for this service.</li>
                                        <ul class='my-1'>
                                            <li>If Parent, Valid Kebele ID of his/her mother/father or copy of passport information page</li>
                                            <li>If Guardian , legal document from court  </li>
                                            <li>Authenticated Birth Certificate of the Applicant.</li>
                                        </ul>

                                    </ol>

                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                    Urgent Service
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                        If you are applying for Urgent Services, you must have reason or evidence like:
                                </p>

                                    <br></br>
                                    <ol>

                                        <li>If you are applying for Urgent Services, you must have: </li>
                                        <ul class='my-1'>
                                            <li>Medical letter</li>
                                            <li>Scholarship and DV</li>
                                            <li>Letter from authorized organization</li>
                                            <li>Foreign residence permit</li>
                                            <li>invitation paper</li>
                                            <li>Urgent travel for Work</li>
                                            <li>Travel for compassionate reason</li>

                                        </ul>

                                    </ol>
                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                   Emergency
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                        Emergency requests are handled in INVEA main office or branch offices in person.
                                </p>
                                </Typography>


                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">Apply Now</Link></div>
                        </Accordion>

                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="evisalist mt-5">
                        <ul class="list-group">
                            <li class="list-group-item ePassprt-color">RELATED LINKS</li>
                            <li class="list-group-item"><Link class="text-dark" to="/FAQ">FAQ</Link></li>
                            <li class="list-group-item"><Link class="text-dark" to="/Oridnary Passport">Oridnary Passport</Link></li>
                            <li class="list-group-item"><Link class="text-dark" to="/Diplomatic Passport">Diplomatic Passport</Link></li>
                            <li class="list-group-item"><Link class="text-dark" to="/Replacment Passport 32 Pages">Replacment Passport 32 Pages</Link></li>
                            <li class="list-group-item"><Link class="text-dark" to="/Replacment of Stolen Passport">Replacment of Stolen Passport</Link></li>
                            <li class="list-group-item"><Link class="text-dark" to="/Terms and Conditions">Terms and Conditions</Link></li>

                        </ul>
                    </div>
                </div>
            </div>



        </MDBContainer>
    );
}
