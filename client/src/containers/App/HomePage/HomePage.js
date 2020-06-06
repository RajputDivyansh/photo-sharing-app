import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import NavbarApp from '../../../components/UI/NavBar/NavbarApp';
import classesHomepage from './HomePage.module.css';


const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: '600px',
        height: '600px',
        boxShadow: theme.shadows[5],
    },
    progess: {
        position: 'absolute'
	}	
});


class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            home: '',
            open: false,
            caption: '',
            selectedFiles: null,
            displayImage: null,
            loading: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fileUploadAction = this.fileUploadAction.bind(this);
        this.inputReference = React.createRef();
        this.showImage = this.showImage.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        console.log(token);
        axios.get('http://localhost:4000/homepage', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(this.props);
                console.log("inside then");
                console.log(res);
                this.setState({
                    home: res.data.home
                });
                // this.props.history.push("/");
            })
            .catch((err) => {
                console.log("not valid")
                localStorage.clear();
                this.props.history.push("/");
                console.log(err);
                // this.setState({
                    // errors: err.response.data
                    // loading: false
                // })
            })
    }

    fileUploadAction = () => {
        this.inputReference.current.click();
    }

    showImage = (event) => {
        this.setState({
            selectedFiles: event.target.files[0],
            displayImage: URL.createObjectURL(event.target.files[0])
        })
        this.handleOpen();
    }

    handleOpen = () => {
        console.log("handletoggle");
        const open = true;
        this.setState({open: open});
    };

    handleClose = () => {
        console.log("handleclose");
        this.setState({open: false});
    };

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            caption: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        this.setState({
            loading: true
        });
		// console.log(this.state.selectedFiles);
		
        let data = new FormData();
        data.append('file',this.state.selectedFiles)
		data.append('userId',userId);
		data.append('caption',this.state.caption);
        console.log(...data);

        axios.post('http://localhost:4000/addpost',data,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((result) => {
            console.log(result);
            this.setState({
                loading: false,
                selectedFiles: null,
                caption: ''
            })
            this.handleClose();
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                loading: false,
                selectedFiles: null,
                caption: ''
            })
            // localStorage.clear();
            // this.props.history.push("/");
        })
	};

    render() {
        const { classes } = this.props;
        const { loading } = this.state;
        return (
            <div>
                <NavbarApp clicked={this.fileUploadAction}/>
                <input id="input" type="file" accept="image/*" ref={this.inputReference} onChange={this.showImage} style={{display: 'none'}}/>
                <div className={classesHomepage.container}>
                <h1>HomePage</h1>
                <h1>{this.state.home}</h1>
                </div>
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
                            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                {/* <input type="file" name="file" multiple/> */}
                                <img src={this.state.displayImage} alt="postImage" className={classesHomepage.image}/>
                                <div className={classesHomepage.divTextField}>
                                    <TextField
                                        id="caption"
                                        name="caption"
                                        type="text"
                                        className={classesHomepage.textField}
                                        placeholder="Caption..."
                                        autoComplete="off"
                                        value={this.state.oldPassword}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth />
                                </div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classesHomepage.Button} 
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
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);
