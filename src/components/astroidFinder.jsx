import React, { useState } from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { GET_RANDOM_ASTROID } from "../api/api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import LinearProgress from '@material-ui/core/LinearProgress';

const AstroidFinder = (props) => {
  const [astroidName, setAstroidName] = useState("");
  const [astroidList, setAstroidList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {classes} = props;
  const getAstroidDetail = (event) => {
    event.preventDefault();
    const { history } = props;
    history.push({
      pathname: "/astroidDetail",
      state: {
        astroidId: astroidName,
      },
    });
  };
  const selectRandomAstroid = (astroid) => {
    const { history } = props;
    history.push({
      pathname: "/astroidDetail",
      state: {
        astroidId: astroid.id,
      },
    });
  };
  const getRandomAstroid = async (event) => {
    event.preventDefault();
    const randomAstroidUrl = GET_RANDOM_ASTROID;
    try {
      setLoading(true);
      const response = await fetch(randomAstroidUrl);
      const astroidListData = await response.json();
      const astroidList = astroidListData?.near_earth_objects;
      setLoading(false);
      setAstroidList(astroidList);
    } catch (error) {
      setLoading(false);
      setAstroidList([]);
    }
  };
  return (
    <div>
      <TextField
        name="astroidName"
        placeholder="Enter Asteroid ID"
        value={astroidName}
        variant="standard"
        onChange={(event) => {
          setAstroidName(event.target.value);
        }}
      ></TextField>
      <div style={{marginTop: '2em'}}>
       <Button
        color="primary"
        variant="contained"
        onClick={getAstroidDetail}
        disabled={!(astroidName.length > 0)}
        style={{marginLeft: '2em'}}
      >
        Submit
      </Button>
      <Button style={{marginLeft: '2em'}} color="primary" variant="contained" onClick={getRandomAstroid}>
        Random Astroid
      </Button>
      </div>
      {loading ? (
        <div><LinearProgress color="primary" /></div>
      ) : (
        astroidList &&
        astroidList.length > 0 && (
          <>
            <Typography variant="h6" className={classes.title}>
              Select a Random Astroid
            </Typography>
            <div className={classes.demo}>
              <List>
                {astroidList.map((astroid) => {
                  return (
                    <ListItem key={astroid.id}>
                      <ListItemAvatar>
                        <Avatar>
                          {/* <FolderIcon /> */}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={astroid.name}
                      />
                       <ListItemSecondaryAction>
                    <Button onClick={()=>{selectRandomAstroid(astroid)}} size="small" variant="outlined" color="primary">
                        Select
                    </Button>
                  </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </>
        )
      )}
    </div>
  );
};

const AstroidFinderWithStyle = withStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 300,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }))(AstroidFinder);
export default withRouter(AstroidFinderWithStyle);
