import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';

import classes from './HomepagePost.module.css';
import avatar from '../../../../assets/images/avatar_for_photoApp.jpg';

class HomepagePost extends Component {
    constructor(props) {
        super(props);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
    }

    arrayBufferToBase64 = (buffer) => {
		var binary = '';
		var bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((byte) => binary += String.fromCharCode(byte));
		return window.btoa(binary);
    };

    render() {
        let imageData;
        if(this.props.profileData.image.data[0]) {
            imageData = `data:image/*;base64,${this.arrayBufferToBase64(this.props.profileData.image.data)}`;
        }
        else {
            imageData = avatar;
        }

        if(this.props.postData.image.data[0]) {
            postImageData = `data:image/*;base64,${this.arrayBufferToBase64(this.props.postData.image.data)}`;
        }
        
        return (
            <div className={classes.mainDiv}>
                <article className={classes.article}>
                    <header className={classes.header}>
                        <div className={classes.profilePicture}>
                            <img src={imageData} alt="dp" className={classes.picture}/>
                        </div>
                        <div className={classes.username}>
                            <Link to={"/profile"+this.props.postData.userID} className={classes.link}>
                                {this.props.profileData.username}
                            </Link>
                        </div>
                    </header>
                    <div className={classes.postImage}>
                        <img src={postImageData} alt="postImage" className={classes.image} />
                    </div>
                    <div className={classes.bottom}>
                        <section className={classes.icons}>
                            <span className={classes.likeSpan}>
                                <FavoriteBorderIcon className={classes.likeIcon} /*onClick={this.submitLike}*/ />
                            </span>
                            <span className={classes.commentSpan} >
                                <CommentIcon className={classes.commentIcon} /*onClick={}*/ />
                            </span>
                        </section>
                        <section className={classes.likedBy}>
                            <div className={classes.likedByDiv}>
                                <p className={classes.p}>Liked by {this.props.postData.likeCount}</p>
                            </div>
                        </section>
                        <div className={classes.captionAndCommentDiv}>
                            <div className={classes.captionDiv}>
                                <Link to={"/profile"+this.props.postData.userID} className={classes.link} />
                                <span className={classes.caption}>{this.props.postData.caption}</span>                                
                            </div>
                            <div className={classes.commentsCount}>
                                <Link to="/" className={classes.commentLink}>
                                    View all {this.props.postData.commentCount} comments
                                </Link>
                            </div>
                        </div>
                        <div className={classes.timeDiv}>
                            <span className={classes.time}>
                                {this.props.postData.createdAt}0
                            </span>
                        </div>
                        <section className={classes.commentSection}>
                            <div className={classes.commentDiv}>
                                <form /*onSubmit={}*/ className={classes.form}>
                                    <textarea placeholder="Add a comment…" class="Ypffh" autocomplete="off" autocorrect="off" />
                                    <button className={classes.button} disabled={disabled} type="submit">Post</button>
                                </form>
                            </div>
                        </section>
                    </div>
                </article>
            </div>
        )
    }
}

export default HomepagePost;
