import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import axios from 'axios';

import './App.css';
import Login from './containers/Login/Login';
import Signup from './containers/SignUp/Signup';
import HomePage from './containers/HomePage/HomePage';
import Temp from './containers/Temp';
import Logout from './containers/Login/Logout';
import Options from './components/UI/Options/Options';
import Cloud from './containers/Cloud/Cloud';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  }
  // typography: {
  //   useNextVariants: true
  // }
});

class App extends Component {

    componentDidMount() {
		setInterval(() => {
		  const token = localStorage.getItem('token');
		  if(token) {
			axios.get("http://localhost:4000/checktokenexpiry",{
			  headers: {
				Authorization: 'Bearer ' + token
			}
			})
			.then((res) => {
				console.log("res");
			  console.log(res);
			})
			.catch((err) => {
				console.log("error");
			  console.log(err);
			  if(err) {
				  console.log("error1")
				  console.log(this.props);
				localStorage.clear();
				window.location.href = "/";
				alert("Session Timed Out\nPlease Login Again")       
			  }
			})
		  }
		},120000);
	}

  // componentDidMount() {
  //   const token = localStorage.getItem('token');
  //   const expiryDate = localStorage.getItem('expiryDate');
  //   console.log(token);
  //   console.log(expiryDate);
  //   if (!token || !expiryDate) {
  //     return;
  //   }
  //   if (new Date(expiryDate) <= new Date()) {
  //     this.logoutHandler();
  //     return;
  //   }
  //   const userId = localStorage.getItem('userId');
  //   const remainingMilliseconds =
  //     new Date(expiryDate).getTime() - new Date().getTime();
  //   this.setState({ token: token, userId: userId });
  //   this.setAutoLogout(remainingMilliseconds);
  // }

  // logoutHandler = () => {
  //   // this.setState({ token: null, userId: null });
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expiryDate');
  //   localStorage.removeItem('userId');
  //   console.log(this.props);
  //   window.location.href = "/";
  // };

  // setAutoLogout = milliseconds => {
  //   console.log("inside auto logout");
  //   console.log(milliseconds);
  //   setTimeout(() => {
  //     this.logoutHandler();
  //   }, milliseconds);
  // };

  render(){
    return (
      <MuiThemeProvider theme={theme}>  
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/logout" component={Logout}/> 
			  <Route path="/options" component={Options} />
			  <Route path="/cloud" component={Cloud} />
              <Route exact path="/homepage" component={HomePage}/>
              <Route exact path="/temp" component={Temp}/> 
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
