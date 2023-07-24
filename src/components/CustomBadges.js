import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Badge } from "react-bootstrap";
import { createGlobalStyle, styled } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #FFFFFF;
    --red: #FF0000;
    --green: #0A7029;
    --yellow: #FEDE00;
  }
`;

const HighBadge = styled(Badge)`
    margin-left: 10px;
    margin-right: 10px;
    padding: 12px 30px;
    font-weight: bold;
    border-radius: 10px;
    border: 1px solid var(--red);
    color: ${props => props.active || props.selected ? `var(--white) !important` : `var(--red) !important`};
    background-color: ${props => props.active || props.selected ? `var(--red) !important` : `var(--white) !important`};
    &:hover {
        background-color: var(--red) !important;
        color: var(--white) !important;
        cursor: pointer;
    }
`;

const MediumBadge = styled(Badge)`
    margin-left: 10px;
    margin-right: 10px;
    padding: 12px 30px;
    font-weight: bold;
    border-radius: 10px;
    border: 1px solid var(--yellow);
    color: ${props => props.active || props.selected ? `var(--white) !important` : `var(--yellow) !important`};
    background-color: ${props => props.active || props.selected ? `var(--yellow) !important` : `var(--white) !important`};
    &:hover {
        background-color: var(--yellow) !important;
        color: var(--white) !important;
        cursor: pointer;
    }
`;

const LowBadge = styled(Badge)`
    margin-left: 10px;
    margin-right: 10px;
    padding: 12px 30px;
    font-weight: bold;
    border-radius: 10px;
    border: 1px solid var(--green);
    color: ${props => props.active || props.selected ? `var(--white) !important` : `var(--green) !important`};
    background-color: ${props => props.active || props.selected ? `var(--green) !important` : `var(--white) !important`};
    &:hover {
        background-color: var(--green) !important;
        color: var(--white) !important;
        cursor: pointer;
    }
`;

const CustomBadges = (props) => {
    const[high, setActiveHigh] = useState(false);
    const[medium, setActiveMedium] = useState(false);
    const[low, setActiveLow] = useState(false);

    const changeActive = (active) => {
        if(active === "low"){
            setActiveLow(true);
            setActiveMedium(false);
            setActiveHigh(false);
            props.handleInput("Low");
        }else if(active === "medium"){
            setActiveMedium(true);
            setActiveLow(false);
            setActiveHigh(false);
            props.handleInput("Medium");
        }else{
            setActiveHigh(true);
            setActiveLow(false);
            setActiveMedium(false);
            props.handleInput("High");
        }
    }

    return (
        <div>
            <GlobalStyle/>
            <HighBadge active={high ? 1 : 0} selected={props.value === "High" ? 1 : 0} onClick={() => changeActive("high")}>High</HighBadge>
            <MediumBadge active={medium ? 1 : 0} selected={props.value === "Medium" ? 1 : 0} onClick={() => changeActive("medium")}>Medium</MediumBadge>
            <LowBadge active={low ? 1 : 0} selected={props.value === "Low" ? 1 : 0} onClick={() => changeActive("low")}>Low</LowBadge>
        </div>
    )
};

export default CustomBadges;
