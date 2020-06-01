import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import classesContainer from './UserAccount.module.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBarApp from '../../../components/UI/NavBar/NavbarApp';
import UserPosts from '../UserPosts/UserPosts';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        const token = localStorage.getItem("token");
        console.log("inside did mount");
        axios.get(`http://localhost:4000/profile/${userId}`,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((result) => {
            console.log(result);
            this.setState({
                userData: result.data
            })
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    arrayBufferToBase64 = (buffer) => {
		var binary = '';
		var bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((byte) => binary += String.fromCharCode(byte));
		return window.btoa(binary);
	};


    render() {
        console.log(this.state.userData);
        let imageData;
        if(this.state.userData) {
            imageData = `data:image/*;base64,${this.arrayBufferToBase64(this.state.userData.image.data)}`;
        }
        const userId = localStorage.getItem("userId");
        // console.log(this.props.match.params.id);
        return (
            <>
                <NavBarApp />
                <div className={classesContainer.form}>
                    {!this.state.userData ? <CircularProgress size={70} className={classesContainer.loading}/> : 
                        <Grid container /*className={classes.form}*/>
                            <Grid item sm={3} xs={1}/>
                            <Grid item sm={6} xs={10} className={classesContainer.grid}>
                                <header className={classesContainer.header}>
                                    <div className={classesContainer.leftSide}>
                                        <div className={classesContainer.box}>
                                            <img src={imageData} alt="images" className={classesContainer.image}/>
                                        </div>
                                    </div>
                                    <section>
                                        <div>
                                            <h2 className={classesContainer.username}>{this.state.userData.username}</h2>
                                        </div>
                                        <div style={{marginTop: "15px"}}>
                                            <p className={classesContainer.name}>{this.state.userData.name}</p>
                                            <p className={classesContainer.text}>{this.state.userData.bio}</p>
                                            <a href={this.state.userData.website} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}><p>{this.state.userData.website}</p></a>
                                        </div>
                                        <div>
                                            <Button variant="contained" color="primary" component={Link} to={"/edit-profile/" + userId}>
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </section>
                                </header>
                                <div className={classesContainer.postBox}>
                                    <p>Posts</p>
                                </div>
                                <div className={classesContainer.container}>
                                    <UserPosts />
                                </div>
                            </Grid>
                            <Grid item sm={3} xs={1}/>
                        </Grid>
                    }
                </div>
            </>
        )
    }
}

export default UserProfile;
