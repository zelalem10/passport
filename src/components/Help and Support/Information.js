import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MDBContainer } from 'mdbreact';
import '../Help and Support/Faq.css'
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

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
    const { t, i18n } = useTranslation();
    const classes = useStyles();

    return (
        <MDBContainer className="container" >
            <div class="row passportaccordion" >
                <div class="col-lg-12 mr-5">
                <div class="u-center-text u-margin-bottom-big mt-5">
                    <h2 class="heading-secondary">  <Trans>howToApply.howtoApply</Trans></h2>
                </div>

                    <div className={classes.root} class='faq-accordion'>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.newPassport</Trans>
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                  <Trans>requirments.new.title</Trans>  
                                    </p>

                                    <br></br>
                                    <ol>
                                        <li><Trans>requirments.common.itemOne</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.new.itemOneL1</Trans> </li>

                                        </ul>

                                        <li><Trans>requirments.common.itemTwo</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>
                                        </ul>
                                        <li><Trans>requirments.common.itemThree</Trans></li>
                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>

                                                    <th scope="col"><Trans>requirments.common.passportType</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Trans>requirments.common.64page</Trans></td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans></td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>

                                </Typography>
                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.expiredPassport</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                    <Trans>requirments.expiredPassport.title</Trans>  
                                    </p>

                                    <br></br>
                                    <ol>
                                        <li>  <Trans>requirments.common.itemOne</Trans> </li>
                                        <ul class='my-1'>
                                            <li> <Trans>requirments.expiredPassport.itemOneL1</Trans></li>

                                        </ul>

                                        <li><Trans>requirments.common.itemTwo</Trans> </li>
                                        <ul class='my-1'>
                                        <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>
                                        <li><Trans>requirments.common.itemThree</Trans></li>
                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>

                                                    <th scope="col"><Trans>requirments.common.passportType</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Trans>requirments.common.64page</Trans></td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans></td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>

                                </Typography>


                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.passportRunout</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                    <Trans>requirments.passportRunout.title</Trans>  

                                    </p>

                                    <br></br>
                                    <ol>
                                        <li><Trans>requirments.common.itemOne</Trans>  </li>
                                        <ul class='my-1'>
                                            <li> <Trans>requirments.passportRunout.itemOneL1</Trans>   </li>

                                        </ul>

                                        <li><Trans>requirments.common.itemTwo</Trans> </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>
                                        <li><Trans>requirments.common.itemThree</Trans></li>
                                        <p><Trans>requirments.common.itemThreeParagraph</Trans></p>

                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>

                                                    <th scope="col"><Trans>requirments.common.passportType</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Trans>requirments.passportRunout.64pageRunout</Trans></td>
                                                    <td>2186 + 100% =4372</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.passportRunout.32pageRunout</Trans></td>
                                                    <td scope="col">600+ 100% =1200</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                             
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>
                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.damagedPassport</Trans>
          </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                    <Trans>requirments.damagedPassport.title</Trans>  
                                    </p>

                                    <br></br>
                                    <ol>
                                        <li> <Trans>requirments.common.itemOne</Trans>  </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.damagedPassport.itemOneL1</Trans> </li>

                                        </ul>

                                        <li><Trans>requirments.common.itemTwo</Trans> </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>
                                        <li><Trans>requirments.common.itemThree</Trans> </li>
                                        <p><Trans>requirments.common.itemThreeParagraph</Trans> </p>

                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col"><Trans>requirments.common.passportStatus</Trans> </th>
                                                    <th scope="col"><Trans>requirments.common.passportType</Trans> </th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2">   <Trans>requirments.damagedPassport.expired</Trans>   </td>
                                                    <td ><Trans>requirments.common.64page</Trans> </td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans> </td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="2">   <Trans>requirments.damagedPassport.notExpired</Trans>  </td>
                                                    <td ><Trans>requirments.common.64page</Trans></td>
                                                    <td>2186+ 100% =4372</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans></td>
                                                    <td scope="col">600+ 100% =1200</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>

                                </Typography>


                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.lostPassport</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                    <Trans>requirments.lostPassport.title</Trans>  
                                </p>

                                    <br></br>
                                    <ol>
                                        <li><Trans>requirments.common.itemOne</Trans>  </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.lostPassport.itemOneL1</Trans>  </li>
                                            <li><Trans>requirments.lostPassport.itemOneL2</Trans>  </li>
                                            <li><Trans>requirments.lostPassport.itemOneL3</Trans>  </li>


                                        </ul>

                                        <li><Trans>requirments.common.itemTwo</Trans> </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>
                                        <li><Trans>requirments.common.itemThree</Trans> </li>
                                        <p><Trans>requirments.common.itemThreeParagraph</Trans> </p>

                                        <table class="table w-75 my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col"><Trans>requirments.common.passportStatus</Trans> </th>
                                                    <th scope="col"><Trans>requirments.common.passportDescription</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.passportType</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2"><Trans>requirments.lostPassport.lostpassport</Trans></td>
                                                    <td rowspan="2"><Trans>requirments.lostPassport.replacementOfLostPassport</Trans></td>
                                                    <td ><Trans>requirments.common.64page</Trans></td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans></td>
                                                    <td scope="col">600+ 100% =1200</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>

                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.changeofPassportData</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                    <Trans>requirments.changeofPassportData.title</Trans>  

                                </p>

                                    <br></br>
                                    <ol>
                                        <li>    <Trans>requirments.common.itemOne</Trans>  </li>
                                        <ul class='my-1'>
                                            <li>        <Trans>requirments.changeofPassportData.itemOneL1</Trans>   </li>
                                            <li>        <Trans>requirments.changeofPassportData.itemOneL2</Trans>  </li>

                                        </ul>

                                        <li>    <Trans>requirments.common.itemTwo</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>
                                        <li>    <Trans>requirments.common.itemThree</Trans></li>
                                        <p> <Trans>requirments.common.itemThreeParagraph</Trans></p>

                                        <table class="table  my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                <th scope="col"><Trans>requirments.common.passportStatus</Trans> </th>
                                                    <th scope="col"><Trans>requirments.common.passportDescription</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.passportType</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2"><Trans>requirments.changeofPassportData.correction</Trans></td>
                                                    <td rowspan="2"><Trans>requirments.changeofPassportData.requestsForCorrection</Trans></td>
                                                    <td ><Trans>requirments.common.64page</Trans></td>
                                                    <td>2186</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans> </td>
                                                    <td scope="col">600+100%=1200                                                                                           </td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="2"><Trans>requirments.changeofPassportData.correction</Trans></td>
                                                    <td rowspan="2"><Trans>requirments.changeofPassportData.requestsForCorrection</Trans></td>
                                                    <td ><Trans>requirments.common.64page</Trans> </td>
                                                    <td>2186+ 100% =4372</td>

                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans> </td>
                                                    <td scope="col">600</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>

                                </Typography>
                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>
                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                              <Trans>howToApply.validPassport</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p class='font-weight-bold'>
                                    <Trans>requirments.validPassport.title</Trans>  
                                </p>

                                    <br></br>
                                    <ol>
                                        <li> <Trans>requirments.common.itemOne</Trans> </li>
                                        <ul class='my-1'>
                                            <li>  <Trans>requirments.validPassport.itemOneL1</Trans>  </li>


                                        </ul>

                                        <li> <Trans>requirments.common.itemTwo</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>
                                        <li><Trans>requirments.common.itemThree</Trans></li>
                                        <p><Trans>requirments.common.itemThreeParagraph</Trans></p>

                                        <table class="table  my-1">
                                            <thead class="thead-lightt">
                                                <tr>
                                                    <th scope="col"><Trans>requirments.common.passportStatus</Trans> </th>
                                                    <th scope="col"><Trans>requirments.common.passportType</Trans></th>
                                                    <th scope="col"><Trans>requirments.common.price</Trans></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="2"><Trans>requirments.validPassport.validPassport</Trans></td>
                                                    <td ><Trans>requirments.common.64page</Trans> </td>
                                                    <td>2186+ 100% = 4372</td>
                                                </tr>
                                                <tr>

                                                    <td scope="col"><Trans>requirments.common.32page</Trans> </td>
                                                    <td scope="col">600+100% = 1200                                                                                           </td>
                                                </tr>


                                                <tr>
                                                    <td colspan="2" class='font-weight-bold'><Trans>requirments.common.forUrgent</Trans></td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <li><Trans>requirments.common.itemFour</Trans></li>
                                        <li><Trans>requirments.common.itemFive</Trans></li>
                                        <li><Trans>requirments.common.itemSix</Trans></li>
                                        <li><Trans>requirments.common.itemSeven</Trans></li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemSeven1</Trans></li>
                                            <li><Trans>requirments.common.itemSeven2</Trans></li>
                                            <li><Trans>requirments.common.itemSeven3</Trans></li>
                                        </ul>
                                    </ol>

                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans></Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.applicantUnder18</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                    <Trans>requirments.applicantUnder18.title</Trans>                                  </p>

                                    <br></br>
                                    <ol>
                                        <li> <Trans>requirments.common.itemOne</Trans>      </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.applicantUnder18.itemOneL1</Trans>     </li>
                                            <li><Trans>requirments.applicantUnder18.itemOneL2</Trans>     </li>
                                            <li><Trans>requirments.applicantUnder18.itemOneL3</Trans>     </li>
                                        </ul>

                                    </ol>

                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"><Trans>requirments.common.applynow</Trans> </Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.urgentService</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                    <Trans>requirments.urgentService.title</Trans>      
                                </p>

                                    <br></br>
                                    <ol>

                                        <li>  <Trans>requirments.common.itemTwo</Trans>      </li>
                                        <ul class='my-1'>
                                            <li><Trans>requirments.common.itemTwoL1</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL2</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL3</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL4</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL5</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL6</Trans></li>
                                            <li><Trans>requirments.common.itemTwoL7</Trans></li>

                                        </ul>

                                    </ol>
                                </Typography>

                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu"> <Trans>requirments.common.applynow</Trans></Link></div>

                        </Accordion>
                        <Accordion className='accordion-item'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className='accordion-title'>
                                <Trans>howToApply.emergency</Trans>
      </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                    <p class='font-weight-bold'>
                                    <Trans>requirments.emergency.title</Trans>
                                </p>
                                </Typography>


                            </AccordionDetails>
                            <div class="col-12 medium text-center my-3"><Link to="/request-appointment" class="btn btnBlu">    <Trans>requirments.common.applynow</Trans></Link></div>
                        </Accordion>

                    </div>
                </div>
                {/* <div class="col-lg-3">
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
                </div> */}
            </div>



        </MDBContainer>
    );
}
