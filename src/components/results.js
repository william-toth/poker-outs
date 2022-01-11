import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import '../style.scss';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import Button from 'react-bootstrap/Button';


const Results = (props) => (
    <div className="results">
        {props.pair != null && <div className="result">
          Pair: {props.pair}%
        </div>}
        {props.trips != null && <div className="result">
          Trips: {props.trips}%
        </div>}
        {props.quads != null && <div className="result">
          Quads: {props.quads}%
        </div>}
        {props.twopair != null && <div className="result">
          Two Pair: {props.twopair}%
        </div>}
        {props.fullhouse != null && <div className="result">
          Full House: {props.fullhouse}%
        </div>}
        {props.flush != null && <div className="result">
          Flush: {props.flush}%
        </div>}
        {props.straight != null && <div className="result">
          Straight: {props.straight}%
        </div>}
        {props.straight != null && props.flush != null && <div className="result">
          Straight Flush: {Math.round(props.straight*props.flush/100)}%
        </div>}
        <div className="button-div">
            <Button className="submit" onClick={() => {props.goBack()}}>Back to Select</Button>
        </div>
    </div>
)

export default Results;
