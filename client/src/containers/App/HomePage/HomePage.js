import React, { Component } from 'react'
import axios from 'axios';
// import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
// import TextField from '@material-ui/core/TextField';

import HomepagePost from './HomepagePost/HomepagePost';
import NavbarApp from '../../../components/UI/NavBar/NavbarApp';
import classesHomepage from './HomePage.module.css';
import { Grid } from '@material-ui/core';


const styles = (theme) => ({
    // modal: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     width: '600px',
    //     height: '600px',
    //     boxShadow: theme.shadows[5],
    // },
    // progess: {
    //     position: 'absolute'
	// }	
});


class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            postsData: '',
            loading: true
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        console.log(token);
        // axios.get(`http://localhost:4000/getfriendspost/${userId}`, {
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     }
        // })
        // .then((result) => {
        //     console.log(result);
        //     this.setState({
        //         home: result.data,
        //         loading: false
        //     });
        // })
        // .catch((err) => {
        //     console.log("not valid")
        //     console.log(err);
        //     // this.setState({
        //         // errors: err.response.data
        //         // loading: false
        //     // })
        // })
    }

    render() {
        const { classes } = this.props;
        const { loading } = this.state;
        return (
            <div>
                <NavbarApp clicked={this.fileUploadAction}/>
                <div className={classesHomepage.container}>
                    <Grid container /*className={classes.form}*/>
                        <Grid item sm={4} xs={1}/>
                        <h1>HomePage</h1>
                        <Grid item sm={4} xs={10}>
                            {/* <h1>{this.state.home}</h1> */}
                            {this.state.loading ? this.state.postsData ? <CircularProgress size={70} /> :
                                this.state.postsData.map((post) => {
                                    if(post.posts === "no posts available") {
                                        return null;
                                    }
                                    else {
                                        return post.posts.map((userPost) => {
                                            return <HomepagePost key={userPost._id} postData={userPost} profileData={post.profileData} />
                                        })
                                    }
                                }) : <h1>No Posts from your Friends</h1>
                            }
                        </Grid>
                        <Grid item sm={4} xs={1}/>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);
