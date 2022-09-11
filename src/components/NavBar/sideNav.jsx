import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './sidebar.css'
import { connect } from 'react-redux';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

 function SideBar(props) {

    const archiveNotes = (data) => {
        console.log("clicked archive side nav" + data)
        // props.fetchArchiveList("ArchiveNotes")
        props.dispatch({type:'Clicked_On_Archive'})
    }

    const noteLists = (data) => {
        props.fetchNoteList("DefaultNotes")
    }

    const trashNotes = () => {
        props.trashNotes("TrashList")
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={props.isDrawer}>
                <Divider />
                <List>
                    <ListItem button key="Notes" onClick={noteLists}>
                        <ListItemIcon>
                            <LightbulbOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItem>
                    <ListItem button key="Reminder">
                        <ListItemIcon>
                            <NotificationsNoneOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reminder" />
                    </ListItem>
                    <ListItem button key="Archive" onClick={archiveNotes} >
                        <ListItemIcon>
                            <ArchiveOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    <ListItem button key="Trash" onClick={trashNotes}>
                        <ListItemIcon>
                            <DeleteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItem>
                </List>
            </Drawer>
            <DrawerHeader />
        </Box>
    );
}
export default connect()(SideBar)