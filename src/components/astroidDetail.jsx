import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router";
import { GET_ASTROID_DETAIL } from "../api/api";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const AstroidDetail = (props) => {
  const { location } = props;
  const [astroidId, setAstroidId] = useState(location.state.astroidId);
  const [astroidDetails, setAstroidDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = useCallback(() => {
    setError(null);
    props.history.push("/");
  }, [props.history]);
  useEffect(() => {
    async function getDetail(){
        let url = GET_ASTROID_DETAIL;
        url = url.replace("astroidId", astroidId);
        try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setLoading(false);
        setAstroidDetails(data);
        } catch (error) {
        setLoading(false);
        setError(true);
        setAstroidDetails(null);
        }
    }  
    getDetail();
  }, [astroidId]);
  const { classes } = props;
  return (
    <div>
      Details <div style={{flexDirection:'row','justifyContent':'flex-start',display:'flex'}} onClick={()=>{props.history.push("/")}}> <span style={{textDecoration : 'underline' }}>Go Back</span></div>
      {loading ? (
        <div>
          {" "}
          <LinearProgress color="primary"></LinearProgress>{" "}
        </div>
      ) : astroidDetails ? (
        <Paper variant="outlined" className={classes.root}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography variant="h5">Name : </Typography>
              <Typography variant="subtitle1">{astroidDetails?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Nasa JPL URL : </Typography>
              <Typography variant="subtitle1">
                <span style={{ wordBreak: "break-all" }}>
                  {astroidDetails?.nasa_jpl_url}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                Potentially Hazardous Asteroid :
              </Typography>
              <Typography variant="subtitle1">
              {astroidDetails?.is_potentially_hazardous_asteroid
                  ? "Yes"
                  : "No"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Dialog
          open={error}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Error</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              No Record Found.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
const AstroidDetailWithStyle = withStyles((theme) => ({
  root: {
    display: "flex",
    width: "50%",
    margin: "auto",
  },
}))(AstroidDetail);
export default withRouter(AstroidDetailWithStyle);
