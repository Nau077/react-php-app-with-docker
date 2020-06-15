import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import red from "@material-ui/core/colors/red";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    icon: {
        margin: theme.spacing(2)
    },
    iconHover: {
        margin: theme.spacing(2),
        "&:hover": {
            color: red[800]
        }
    },
    cardHeader: {
        textalign: "center",
        align: "center",
        backgroundColor: "white"
    },
    input: {
        display: "none"
    },
    title: {
        color: blue[800],
        fontWeight: "bold",
        fontFamily: "Montserrat",
        align: "center"
    },
    button: {
        color: blue[900],
        margin: 10
    },
    secondaryButton: {
        color: "gray",
        margin: 10
    },
    typography: {
        margin: theme.spacing(2),
        backgroundColor: "default"
    },

});

class Delivery__Form_Upload extends React.Component {

  state = {
      mainState: "initial",
      imageUploaded: 0,
      selectedFile: null,
      type: null,
      name: null
  };

  handleUploadClick = event => {
      let file = event.target.files[0];
      const reader = new FileReader();
      // проверка типа загружаемого документа
      if (reader && file && (file.type.match('image.*') || file.type.match('application/pdf'))) {
          reader.readAsDataURL(file);
      } else {
          return;
      }
      // прокидываем файл наверх родителю
      this.props.handleUploadFile(file); 

      const name = event.target.files[0].name;
      const lastDot = name.lastIndexOf('.');
      const ext = name.substring(lastDot + 1);

      reader.onloadend = function(e) {
          this.setState({
              selectedFile: [reader.result]
          });
      }.bind(this);

      this.setState({
          mainState: "uploaded",
          selectedFile: event.target.files[0],
          imageUploaded: 1,
          type: ext,
          name: name
      });
    
  };

  renderInitialState() {
      const { classes } = this.props;

      return (
          <React.Fragment>
              <CardContent>
                  <Grid container justify="center" alignItems="center">
                      <input
                          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={this.handleUploadClick}
                      />
                      <label htmlFor="contained-button-file">
                          <Fab component="span" className={classes.button}>
                              <CloudUploadIcon/>
                          </Fab>
                      </label>
                  </Grid>
              </CardContent>
          </React.Fragment>
      );
  }

  renderUploadedState() {
      const { classes } = this.props;

      return (
          <React.Fragment>
              <CardActionArea>
                  {
                      this.state.type !== 'pdf' ?
                          <img
                              width="70%"
                              className={classes.media}
                              src={this.state.selectedFile}
                          /> :
                          <p>{this.state.name}</p>
                  }
              </CardActionArea>
          </React.Fragment>
      );
  }
 

  render() {
      const { classes } = this.props;

      return (
          <React.Fragment>
              <div className={classes.root}>
                  <div className="upload-card__wrapper">
                      <div className="upload-card__signature">
                          <p>Загрузите доверенность на водителя</p>
                          <p>(изображение или pdf)</p>
                      </div>
                      {(this.renderInitialState())}
                      {  (this.state.mainState == "uploaded" &&
                this.renderUploadedState())
                      }
                  </div>
              </div>
          </React.Fragment>
      );
  }
}

export default withStyles(styles, { withTheme: true })(Delivery__Form_Upload);
