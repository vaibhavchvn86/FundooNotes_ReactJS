import React from 'react'
import '../header/header.css'
import { Input, Checkbox, Button, Image } from 'antd';
import "antd/dist/antd.css";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { SiGooglekeep } from "react-icons/si";
import { GrApps, GrFlows, GrPerformance, GrRefresh, GrSearch } from "react-icons/gr"
import {connect} from 'react-redux'
function Header(props) {

    const onClickEvent = () => {
        console.log(props.isDrawer)
        props.isDrawer ? props.listentoHeader(false) : props.listentoHeader(true)
    }
    console.log(props)

    return (
        <div className='header'>
            <div className='keeplogo'>
                <FaBars onClick={onClickEvent} style={{ fontSize: "20px" }} />
                <SiGooglekeep style={{ fontSize: "20px" }} />
                <span className="title">{props.title}</span>
            </div>
            <div className="Search">
                <GrSearch style={{ fontSize: "20px" }} />
                <input className="SearchIP" type="search" placeholder='Search' />
            </div>
            <div className="icon1">
                <GrRefresh style={{ fontSize: "20px" }} />
                <GrFlows style={{ fontSize: "20px" }} />
                <GrPerformance style={{ fontSize: "20px" }} />
            </div>
            <div className="icon11">
                <GrApps style={{ fontSize: "20px" }} />
                <FaUserCircle style={{ fontSize: "20px" }} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        title  : state.navReducer.currentTitle
    }
}

export default connect(mapStateToProps)(Header)
