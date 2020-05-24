import React, { Component } from 'react'
import { Link } from  'react-router-dom';
//MUI STUFF
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class NavbarApp extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                    <Button color="inherit" component={Link} to="/homepage">HomePage</Button>
                    <Button color="inherit" component={Link} to="/temp">Temp</Button>
                    <Button color="inherit" component={Link} to="/logout">Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavbarApp;
