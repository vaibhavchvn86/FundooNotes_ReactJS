import React from 'react'
import Header from '../../components/header/header'
import Takenote1 from '../../components/takenote1/takenote1'
import Takenote2 from '../../components/takenote2/takenote2'
import NoteComponenet from '../../components/noteComponenet/notecomponent'
import '../dashboard/dash.css'
import { getNote, getArchive, getTrash } from '../../services/dataservice'
import SideBar from '../../components/NavBar/sideNav'
import ColorPopper from '../../components/ColorPopper/colorPopper'


function Dashboard() {
    const [switchNotesContainers, setSwitchNotesContainers] = React.useState(false)

    const [listNote, setListNote] = React.useState([])

    const [dashboardState, setDashboardState] = React.useState("")

    const allNote = (() => {
        getNote().then(response => {
            setListNote(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    })
    React.useEffect(() => {
        allNote()
    }, [switchNotesContainers])


    const listentotakenote1 = (data) => {
        console.log(data)
        if (data === true) {
            setSwitchNotesContainers(true)
        }
        if (data === false) {
            setSwitchNotesContainers(false)
        }
    }

    const [switchDrawer, setSwitchDrawer] = React.useState(false)

    const listentoHeader = (data) => {
        console.log(data)
        if (data === true) {
            setSwitchDrawer(true)
        }
        else {
            setSwitchDrawer(false)
        }
    }

    const getArchiveNotes = () => {
        getArchive().then(resp => {
            console.log("func call")
            setListNote(resp.data.data)
        }).catch(err => {
            console.log(err)
        })
        console.log("archive state data", dashboardState)
    }

    React.useEffect(() => {
        console.log(dashboardState)
        if (dashboardState === "ArchiveNotes") {
            console.log("in dashboard archive")
            getArchiveNotes();
        }
        else if (dashboardState === "TrashList") {
            console.log("trashlist display")
            getTrashNotes()
        }
        else {
            allNote()
            console.log("moved to else")
        }
    }, [dashboardState])

    const fetchArchiveList = (data) => {
        console.log("FetchArchiveList " + data)
        setDashboardState(data)
    }

    const fetchNoteList = (data) => {
        console.log("list note")
        setDashboardState(data)
    }

    const trashNotes = ((data) => {
        setDashboardState(data)
    })

    const getTrashNotes = (() => {
        getTrash().then(response => {
            setListNote(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    })

    const listenToClickEvent=(data)=>{
        if (data === true){
            allNote()
        }
    }

    return (
        <div>
            <Header isDrawer={switchDrawer} listentoHeader={listentoHeader} />
            <div className="takenotecontainers">
                {
                    switchNotesContainers ? <Takenote2 listentotakenote1={listentotakenote1} /> : <Takenote1 listentotakenote1={listentotakenote1} />
                }
            </div>
            <SideBar isDrawer={switchDrawer} fetchArchiveList={fetchArchiveList} fetchNoteList={fetchNoteList} trashNotes={trashNotes} />
            <div className="notesContainer">
                {
                    listNote.map((oneNoteataTime) => <NoteComponenet reason="allNotes" listenToClickEvent={listenToClickEvent} 
                    noteProps={oneNoteataTime} noteId={oneNoteataTime.NoteID}/>)
                }
            </div>
        </div>
    )
}

export default Dashboard