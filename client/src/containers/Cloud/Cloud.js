import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserImages from './UserImages/UserImages';
import NavbarCloud from '../../components/UI/NavBar/NavbarCloud';
import ClassesInput from './Cloud.module.css';

const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        width: '500px',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      progess: {
        position: 'absolute'
    }
});

class Cloud extends Component {
    constructor(props) {
        super(props);
        // this.wrapper = React.createRef();
        this.state = {
            selectedFiles: null,
            open: false,
            loading: false,
            incomingFiles: null,
            incomingLoading: true
        }
        /*
        WE BIND THE HANDLER FUNCTIONS IN CONSTRUCTOR
        SO THAT THEY DO NOT LOSE THEIR CONTEXT
        */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     const token = localStorage.getItem("token");
    //     const userId = localStorage.getItem("userId");
    //     axios.get(`http://localhost:4000/cloud/${userId}`,{
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     })
    //     .then((result) => {
    //         this.setState({
    //             incomingFiles: result,
    //             incomingLoading: false
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    handleClose = () => {
        console.log("handleclose");
        this.setState({open: false});
    };

    handleOpen = () => {
        console.log("handletoggle");
        const open = true;
        // console.log(open)
        // console.log(`state ${this.state.open}`)
        this.setState({open: open});
    };

    handleChange = (event) => {
        console.log(event.target.files)
        this.setState({
            selectedFiles: event.target.files
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        this.setState({
            loading: true
        });
        console.log(this.state.selectedFiles);
        let data = new FormData();
        /*
        WE NEED TO APPEND THE NAME OF FILES - OR YOU COULD
        SAY value of 'name' KEY FROM SELECTED FILES ATTRIBUTES
        */
        for (const key of Object.keys(this.state.selectedFiles)) {
            data.append('file', this.state.selectedFiles[key])
        }
        
        data.append('userId',userId);
        console.log(...data);


        axios.post('http://localhost:4000/cloud',data,{
            // headers: {
            //     // 'Content-Type': 'multipart/form-data',
            //     Authorization: 'Bearer ' + token
            // }
        })
        .then((res) => {
            console.log(res);
            this.setState({
                loading: false
            })
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                loading: false
            })
        })
    };

    render() {
        const { classes } = this.props;
        const { loading } = this.state;
        return (
            <div /*ref={this.wrapper}*/>
                <NavbarCloud clicked={this.handleOpen}/>
                {/* {this.state.incomingLoading ? <CircularProgress size={70} /> :
                    this.state.incomingFiles.map((incomingFile) => {
                        // if(dateOld!==dateNew)
                        return <UserImages data={incomingFile}/>
                        // else
                        // white space
                    }) 
                } */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }} >
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">UPLOAD</h2>
                            <p id="transition-modal-description">Please Select Files...</p>
                            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                {/* <input type="file" name="file" multiple/> */}
                                <input
                                    type="file"
                                    name="file"
                                    accept="image/*"   
                                    style={{ marginTop: "10px" }} 
                                    multiple className={ClassesInput.Input} onChange={this.handleChange}/>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={ClassesInput.Button} 
                                    disabled={loading}>
                                    UPLOAD 
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progress} />
                                    )}   
                                </Button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
                {/* {userImage} */}
            </div>
        )
    }
}

export default withStyles(styles)(Cloud);
