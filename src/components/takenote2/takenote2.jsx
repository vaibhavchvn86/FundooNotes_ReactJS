import React from 'react'
import '../takenote2/takenote2.css'
import { Input, Checkbox, Button, Image } from 'antd';
import "antd/dist/antd.css";
import { GrImage, GrPaint, GrPin, GrRedo, GrRevert } from 'react-icons/gr';
import { BiArchiveIn, BiBellPlus, BiDotsVerticalRounded } from 'react-icons/bi';
import { IoIosColorPalette } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { addNote } from '../../services/dataservice';
import ColorPopper from '../ColorPopper/colorPopper';


function Takenote2(props) {
    let notesUserID = localStorage.getItem("UserID")
    const [noteObj, setNoteObj] = React.useState({ UserID: notesUserID, Title: "", Description: "", archive: false, color: "" })

    const handleClickAway = () => {
        props.listentotakenote1(false)
    }
    const takeTitle = (e) => {
        setNoteObj({ ...noteObj, Title: e.target.value })
    }
    const takeDescription = (e) => {
        setNoteObj({ ...noteObj, Description: e.target.value })
    }

    const archive = () => {
        console.log("archive")
        setNoteObj({ ...noteObj, archive: !noteObj.archive })

    }

    const submit = () => {
        addNote(noteObj).then((resp) => {
            console.log(resp)
            props.listentotakenote1(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="takenote2" style={{ backgroundColor: noteObj.color }}>
                <div className="Note">
                    <input onChange={takeTitle} className="Note1" type="text" placeholder='Title' />
                    <GrPin style={{ fontSize: "20px" }} />
                </div>
                <div className="note">
                    <input onChange={takeDescription} className="note11" type="text" placeholder="Take a Note..." />
                </div>
                <div className="Button">
                    <div className="button">
                        <BiBellPlus style={{ fontSize: "20px" }} />
                        <FaUserPlus style={{ fontSize: "20px" }} />
                        {/* <IoIosColorPalette style={{fontSize:"20px"}} /> */}
                        <ColorPopper action='Create' noteObj={noteObj} setNoteObj={setNoteObj} />
                        <GrImage style={{ fontSize: "20px" }} />
                        <BiArchiveIn onClick={archive} style={{ fontSize: "20px" }} />
                        <BiDotsVerticalRounded style={{ fontSize: "20px" }} />
                        <GrRevert style={{ fontSize: "20px" }} />
                        <GrRedo style={{ fontSize: "20px" }} />
                    </div>
                    <div className="button1">
                        <Button onClick={submit} type="text">Close</Button>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default Takenote2
