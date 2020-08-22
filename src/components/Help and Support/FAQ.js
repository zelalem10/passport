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

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <MDBContainer> 
            <MDBContainer className="faq-accordion my-5">

    <h2 className="my-md-4 mx-md-5">
    FAQs
    </h2>
    <p className='my-md-4 mx-md-5'>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
<div className={classes.root}>
  <Accordion className='accordion-item'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className='accordion-title'>
        First
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
        eget.
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
        Second
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
        eget.
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
        Third
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
        eget.
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
          Forth
          </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
        eget.
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
        Fifth
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
        eget.
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
        Six
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
        eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
</div>
</MDBContainer>

    </MDBContainer>
);
}
