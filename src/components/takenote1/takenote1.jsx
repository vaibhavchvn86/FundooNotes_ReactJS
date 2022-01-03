import React from 'react'
import '../takenote1/takenote1.css'
import { Input, Checkbox, Button, Image } from 'antd';
import "antd/dist/antd.css";
import Img from '../../asset/image.png'
import { GrCheckboxSelected, GrImage } from "react-icons/gr";
import { BsBrush } from "react-icons/bs";

function Takenote1(props) {
    const takeclick = () => {
        console.log(props)
        props.listentotakenote1(true)
    }
    return (
        <div className="align">
            <div className="takenote1" onClick={takeclick}>
                <input className="text" type="text" placeholder="Take a Note..." />
                <div className="alignicon">
                    <GrCheckboxSelected style={{ fontSize: "20px" }} />
                    <BsBrush style={{ fontSize: "20px" }} />
                    <GrImage style={{ fontSize: "20px" }} />
                </div>
            </div>
        </div>
    )
}

export default Takenote1
