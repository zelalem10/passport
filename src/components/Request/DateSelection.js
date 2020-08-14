import 'date-fns';
import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

export default function DateSelection() {

    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <ReactBootstrap.Card>
            <ReactBootstrap.Card.Header>Date and time</ReactBootstrap.Card.Header>
            <ReactBootstrap.Card.Body>
                <blockquote className="blockquote mb-0">

                  </blockquote>
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
    );
}