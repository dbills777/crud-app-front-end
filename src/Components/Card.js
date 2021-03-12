import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Container,
  IconButton,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';
import './Card.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    minWidth: 200,
    height: '100%',
    margin: '10px',
    borderRight: '3px solid #999',
    borderBottom: '3px solid #999',
    padding: '3em',
    borderRadius: '1rem',
    position: 'relative',
    zIndex: '1',
    backdropFilter: 'blur(40px)',
    backgroundColor: 'rgba(195, 195, 195, 0.621)',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // color: 'white',
  },
  media: {
    width: '100%',
    height: '150px',
    paddingTop: '56.25%',
    backdropFilter: 'blur(40px)',
    borderRadius: '1rem',
    position: 'relative',
  },
  clicked: {
    color: 'red',
  },

  expand: {
    maxWidth: 200,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    color: 'white',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: '100%',
    padding: '2px',
    margin: '5px',
    borderRadius: '50%',
  },
}));

const ListCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [newName, setNewName] = useState('');

  const url = 'http://localhost:5000/character';
  const getCharacters = async () => {
    try {
      const response = await axios.get(url);
      // sort to re add characters in order while developing.
      const sorted = response.data.sort((a, b) => a.char_id - b.char_id);
      setCharacters(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const handleClickDeleteOpen = async (item) => {
    await setCurrentCharacter(item.item);
    // console.log("mongoID to delete from db", item.item._id)
    setOpenDialog(!openDialog);
  };
  const handleClickEditOpen = async (item) => {
    await setCurrentCharacter(item.item);
    // console.log("mongoID to delete from db", item.item._id)
    setOpenEditDialog(!openEditDialog);
  };
  const closeDialog = () => {
    setOpenDialog(!openDialog);
  };
  const closeEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
  };
  const deleteFromDB = async () => {
    setOpenDialog(!openDialog);
    // console.log(currentCharacter._id)
    try {
      await axios.delete(`http://localhost:5000/character/`, {
        data: {
          productID: currentCharacter._id,
        },
      });
      getCharacters();
    } catch (error) {
      console.error(error);
    }
  };
  const editInfoInDB = async () => {
    closeEditDialog();
    console.log(newName)
    console.log(currentCharacter)
    try {
      await axios.put(`http://localhost:5000/character/updateone`, {
          productID: currentCharacter._id,
          name: newName,
      });
      setNewName('')
      getCharacters();
    } catch (error) {
      console.error(error);
    }
  };
  const handleExpandClick = (id) => {
    setExpanded({ ...expanded, [id]: !expanded[id] });
  };

  return (
    <>
      {characters.map((item) => {
        return (
          <Card key={item._id} className={classes.root}>
            <CardHeader
              action={
                <IconButton aria-label='settings' color={'white'}>
                  <MoreVertIcon />
                </IconButton>
              }
              title={classes.title}
              subheader={item.name}
            />
            <CardMedia color='white' className={classes.media} image={item.image} title={item.name} />
            <CardContent>
              <Typography variant='body2' color='white' component='p'>
                <strong>Nick Name: </strong>
                {item.nickname}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({ item })}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label='Edit' onClick={() => handleClickEditOpen({ item })}>
                <EditIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand[item.char_id], {
                  [classes.expandOpen]: expanded[item.char_id],
                })}
                onClick={() => handleExpandClick(item.char_id)}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded[item.char_id]} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  <strong>INFO:</strong>
                </Typography>

                <Typography paragraph>
                  <strong>Occupation: </strong>
                  {item.occupation.join(', ')}
                </Typography>
                <Typography paragraph>
                  <strong>Portrayed by : </strong>
                  {item.portrayed}
                </Typography>
                <Typography paragraph>
                  <strong>Living Status: </strong>
                  {item.status}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContentText>Are you sure you want to delete {currentCharacter.nickname}?</DialogContentText>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={deleteFromDB}>Delete Character</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={closeEditDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit: {currentCharacter.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Current Name: {currentCharacter.name}</DialogContentText>
          <DialogContentText>Current Nick-Name: {currentCharacter.nickname}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='New Name'
            type='text'
            fullWidth
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <TextField autoFocus margin='dense' id='nick-name' label='New Nick Name' type='text' fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={editInfoInDB} color='primary'>
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListCard;
