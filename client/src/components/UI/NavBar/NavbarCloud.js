import React, { Component } from 'react'
//MUI STUFF
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";


const styles = {
    homeIcon: {
        fontSize: '3rem'
    },
    addIcon: {
        fontSize: '3rem',
        color: 'white',
        marginLeft: '10px'
    }
}

class NavbarCloud extends Component {

    render() {
        const { classes } = this.props;
        return (
            <AppBar>
                <Toolbar>
                    <HomeIcon className={classes.homeIcon}/>
                    <AddIcon className={classes.addIcon} onClick={this.props.clicked}/>                    
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(NavbarCloud);
