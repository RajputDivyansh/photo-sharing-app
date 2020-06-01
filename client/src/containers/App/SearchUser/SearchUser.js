import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import classes from './SearchUser.module.css';

class SearchUser extends Component {
    render() {
        return (
            <Link to={"/profile/" + this.props.data._id} className={classes.link}>
                <div className={classes.user}>
                    <div className={classes.name}>
                        <span>{this.props.data.username}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

export default SearchUser;
