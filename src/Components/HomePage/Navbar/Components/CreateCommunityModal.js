import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(0.7),
            width: "35ch",
        },
    },
    paper: {
        margin: 'auto',
        marginTop: '150px',
        textAlign: "center",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    h6: {
        marginTop: '20px',
        marginBottom: '5px',
        color: "white"
    },
}));
function CreateCommunityModal({handleClose}) {
  const classes = useStyles();
    return (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Create a new community.</h2>
            <p id="simple-modal-description"></p>
            <Button onClick={handleClose} className={classes.h6} variant="contained" color="primary"><Typography>Create</Typography></Button>
        </div>

    )
}

export default CreateCommunityModal
