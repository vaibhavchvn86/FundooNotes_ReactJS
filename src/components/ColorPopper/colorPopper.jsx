import * as React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import './colorPopper.css'
import { editColor } from '../../services/dataservice';

export default function ColorPopper({ noteId, noteObj, setNoteObj, action, listentocolor }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const colorChange = (e) => {
    if (action === "Create") {
      console.log(e.target.id)
      let a = e.target.id
      a = a.replace("/#/g", "%23")
      setNoteObj({ ...noteObj, color: a })
    }
    else if (action === "Update") {
      let a = e.target.id
      a = a.replace("/#/g", "%23")
      console.log(a,noteId)
      let colorObj = {
        noteID: noteId,
        color: a
      }

      editColor(colorObj).then((resp) => {
        console.log(resp)
        setOpen(false)
        listentocolor(true)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  
  const colorArr = ["#FFFFFF", "#66ddaa", "#FAF0DD", "#DCD0FF", "#D291BC", "#f984ef", "#FEA3AA", "#00FFFF",
    "#FFCBA4", "#ff6347", "#52ff52", "#ffff66"]

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <ColorLensIcon style={{ fontSize: "20px" }} aria-describedby={id} type="button" onClick={handleClick} />
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350} >
            <div className='colorbox'>
              {
                colorArr.map(oneColor => <div key={oneColor} id={oneColor} className='color1'
                  style={{ backgroundColor: oneColor }} onClick={colorChange}></div>)
              }
            </div>

            {/* <div className='color1'>
                <div className='colorround' onClick={colorChange} id='red' >red</div>
                <div className='colorround' onClick={colorChange} id='blue'>blue</div>
                <div className='colorround' onClick={colorChange} id='green'>green</div>
                <div className='colorround' onClick={colorChange} id='yellow'>yellow</div>
              </div>
              <div className='color2'>
                <div className='colorround' onClick={colorChange} id='red' >red</div>
                <div className='colorround' onClick={colorChange} id='blue'>blue</div>
                <div className='colorround' onClick={colorChange} id='green'>green</div>
                <div className='colorround' onClick={colorChange} id='yellow'>yellow</div>
              </div>
              <div className='color3'>
                <div className='colorround' onClick={colorChange} id='red' >red</div>
                <div className='colorround' onClick={colorChange} id='blue'>blue</div>
                <div className='colorround' onClick={colorChange} id='green'>green</div>
                <div className='colorround' onClick={colorChange} id='yellow'>yellow</div>
              </div> */}
          </Fade>
        )}
      </Popper>
    </div>
  );
}
