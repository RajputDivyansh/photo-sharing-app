import React, { Component } from 'react'
import axios from 'axios';
import NavbarApp from '../../../components/UI/NavBar/NavbarApp';
import Classes from './HomePage.module.css';
// import Login from './Login';
// import Signup from './Signup';

class HomePage extends Component {
    state = {
        home: ''
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

    render() {
        return (
            <div>
                <NavbarApp />
                <div className={Classes.container}>
                <h1>HomePage</h1>
                <h1>{this.state.home}</h1>
                </div>
            </div>
        )
    }
}

export default HomePage;
