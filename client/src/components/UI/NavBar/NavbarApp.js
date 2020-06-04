import React, { Component } from 'react'
import { Link } from  'react-router-dom';
import axios from 'axios';
//MUI STUFF
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import { fade, withStyles } from '@material-ui/core/styles';

import SearchUser from '../../../containers/App/SearchUser/SearchUser';
import classesFile from './NavbarApp.module.css';

const styles = (theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.25),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.35),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      display: 'inline-block'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    clear: {
        position: 'absolute',
        right: '1px',
        top: "5px",
    },
    inputRoot: {
      color: 'black',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    account: {
        position: 'absolute',
        right: '100px'
    },
    logout: {
        position: 'absolute',
        right: '20px'
    }
  });

class NavbarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
            search: '',
            searchData: null,
            incomingLoading: false
        }
        this.onSearch = this.onSearch.bind(this);
        this.displayFocus = this.displayFocus.bind(this);
        this.displayBlur = this.displayBlur.bind(this);
    }

    onSearch = (event) => {
        event.preventDefault();
        this.setState({
            search: event.target.value,
            incomingLoading: true
        })
        const token = localStorage.getItem('token');
        const user = {user: event.target.value};
        console.log(event.target.value);
        if(event.target.value) {
            axios.post('http://localhost:4000/searchuser', user,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((result) => {
                console.log(result);
                this.setState({
                    searchData: result.data,
                    incomingLoading: false
                })
            })
            .catch((err) => {
                console.log(err);
            })
        }

        // if(!event.target.value) {
        //     this.setState({
        //         display: 'none',
        //         // search: event.target.value,
        //         searchData: null
        //     })
        // }

        if(event.target.value) {
            console.log("inside change if");
            console.log(event.target.value);
            this.setState({
                display: 'block',
                // search: event.target.value
            })
        }
        else {
            console.log("inside change else");
            console.log(event.target.value);
            this.setState({
                display: 'none',
                // search: event.target.value,
                searchData: null
            })
        }
    }

    displayFocus = () => {
        if(this.state.searchData) {
            console.log("inside focus if");
            console.log(this.state.searchData);
            this.setState({
                display: 'block'
            })
        }
        else {
            console.log("inside focus else");
            console.log(this.state.searchData);
            this.setState({
                display: 'none'
            })
        }
    }

    displayBlur = () => {
        this.setState({
            display: 'none'
        })
    }

    clearSearch = () => {
        this.setState({
            search: '',
            display: 'none',
            searchData: null
        })
    }

    render() {
        const { classes } = this.props;
        const userId = localStorage.getItem("userId");
        return (
            <AppBar>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/homepage">HomePage</Button>
                    <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
                    <Button color="inherit" component={Link} to="/cloud">Cloud</Button>
                    <div className={classes.search + ' ' + classesFile.dropdown} /*tabIndex="0" onBlur={this.displayBlur}*/>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={this.state.search}
                            onChange={this.onSearch}
                            onFocus={this.displayFocus}
                            /*onBlur={this.displayBlur}*/ />
                        {this.state.search ? <ClearIcon className={classes.clear} onClick={this.clearSearch}/> : null}
                        <div style={{display: this.state.display}} className={classesFile.dropdownContent}>
                            {this.state.display === 'block' ? this.state.incomingLoading ? <CircularProgress size={30} className={classesFile.refresh} /> :
                                this.state.searchData.map((data) => {
                                    return  <SearchUser key={data.userId} data={data} />
                                }) : null
                            }
                        </div>
                    </div>
                    <Button color="inherit" className={classes.account} component={Link} to={"/account/" + userId}>Account</Button>
                    <Button color="inherit" className={classes.logout} component={Link} to="/logout">Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(NavbarApp);