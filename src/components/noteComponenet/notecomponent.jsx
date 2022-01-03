import React from 'react'
import '../noteComponenet/notecomponent.css'
import { Input, Checkbox, Image, Button } from 'antd';
import "antd/dist/antd.css";
import { GrImage, GrPin } from 'react-icons/gr';
import { BiArchiveIn, BiBellPlus, BiDotsVerticalRounded } from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import ColorPopper from '../ColorPopper/colorPopper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { editArchive, updateNote, editTrash } from '../../services/dataservice';
import Title from 'antd/lib/skeleton/Title';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #525A59',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

function NoteComponenet({ noteProps, noteId, listenToClickEvent}) {
   
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[editNotes, setEditNotes]= React.useState({NoteID: noteProps.noteID, title: noteProps.title, description: noteProps.description})

    const clickedArchive = () => {
        console.log("get archived notes")
        editArchive(noteProps.noteID).then(() => {
            listenToClickEvent(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const clickedTrash = () => {
        console.log("get trash notes")
        editTrash(noteProps.noteID).then(() => {
            listenToClickEvent(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const editTitle=(e)=>{
        console.log(e, Title)
        setEditNotes({...editNotes, title: e.target.value})
    }

    const editDescription=(e)=>{
        setEditNotes({...editNotes, description: e.target.value})
    }

    const closeEvent=()=>{
        console.log("resp of note")
        updateNote(editNotes).then(response=>{
            listenToClickEvent(true)
            console.log("Edited notes"+response)
        }).catch(err=>{
            console.log(err)
        })
        handleClose()
    }

const listentocolor=(data)=>{
    if (data === true){
        listenToClickEvent(true)
    }
}

    return (
        <div className="notecomp" style={{ backgroundColor: noteProps.color }}>
            <div className="Notec" onClick={handleOpen}>
                <div className="adjust">{noteProps.title}</div>
                <GrPin className="hovpin" style={{ fontSize: "20px" }} />
            </div>
            <div className="note123" onClick={handleOpen}>
                <div className="adjust1">{noteProps.description} </div>
            </div>
            <div className="Button111">
                <div className="hovbutton">
                    <BiBellPlus style={{ fontSize: "20px" }} />
                    <FaUserPlus style={{ fontSize: "20px" }} />
                    {/* <IoIosColorPalette style={{ fontSize: "15px" }} /> */}
                    <ColorPopper action='Update' noteId={noteProps.noteID} listentocolor={listentocolor}/>
                    <GrImage style={{ fontSize: "20px" }} />
                    <BiArchiveIn style={{ fontSize: "20px" }} onClick={clickedArchive} />
                    <MdOutlineDeleteForever style={{ fontSize: "20px" }} onClick={clickedTrash} />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} style={{ backgroundColor: noteProps.color }}>
                <div className="modal">
                    <div className="Editnote" onClick={handleOpen}>
                        <div> <input onChange={editTitle} className="input1" type="text" defaultValue={noteProps.title} /></div>
                        <GrPin className="pin12" style={{ fontSize: "20px" }} />
                    </div>
                    <div className="editnote1" onClick={handleOpen}>
                        <div><input onChange={editDescription} className="input2" type="text" defaultValue={noteProps.description} /></div>
                    </div>
                    <div className="Buttonpop">
                        <div className="buttonpop">
                            <BiBellPlus style={{ fontSize: "20px" }} />
                            <FaUserPlus style={{ fontSize: "20px" }} />
                            {/* <IoIosColorPalette style={{ fontSize: "15px" }} /> */}
                            <ColorPopper action='Update' noteId={noteId} />
                            <GrImage style={{ fontSize: "20px" }} />
                            <BiArchiveIn style={{ fontSize: "20px" }} onClick={clickedArchive} />
                            <BiDotsVerticalRounded style={{ fontSize: "20px" }} />
                        </div>
                        <div className="close">
                            <Button type="text" onClick={closeEvent}>Close</Button>
                        </div>
                    </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default NoteComponenet