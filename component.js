class Comment extends React.Component {
  render() {            // render function:must have for all components
     return( 
      
      <div className="comment">
        <p className="comment-header">
          {/* reading 'props' (aka arguments) from the CommentBox class */}
          {this.props.author}
          </p> 
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="commment-footer-delete">
           Delete Comment
          </a>
        </div>
      </div>

      );
    
  }
}

class CommentBox extends React.Component {
  // constructor to hide comments (initially) aka set showComments to false
  constructor () {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  render() {
     const comments = this._getComments();
     // show/hide components using state
     let commentNodes;
     let buttonText = 'Show comments';
     if (this.state.showComments) {
        buttonText = 'Hide comments';
     // refers to comments in commentList; JSX can render arrays
        commentNodes = <div className="comment-list">{comments}</div>;
     }

     return( 
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comments</h3>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <h4 className="comment-count">
          {/* 0-multiple comments */}
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>

      );
    }

  _handleClick() {
    this.setState( {
      showComments: !this.state.showComments
    });
  }

  _getComments() { // return array of JSX elements
    
   return this.state.comments.map( (comment) => {    // return a new component for each
    return (                                 // element in commentList
      <Comment 
        author={comment.author} body={comment.body} key={comment.id} /> // accessing comment properties
    );             
   });
  
  };

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment'; 
    } else {
      return `${commentCount} comments`; // string template syntax

    }
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };

    this.setState({comments: this.state.comments.concat([comment])});
  }

  componentWillMount() {
    _fetchComments(); // fetch comments from API before component rendered
  }

  componentDidMount () { // call after component render
    this._timer = setInterval(() => this._fetchComments(), 5000); // pull info from server every 5 secs
  }

  componentWillUnmount() {
    clearInterval(this._timer); //run when component is to be removed from DOM
  }

  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/comments',
      success: (comments) => {
        this.setState({comments}) //refers to CommentBox
      }
    });
  }

}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the Discussion</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={(input) => this._author = input} />
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">
            Post Comment
          </button>
        </div>
      </form>
      );
  }

  _handleSubmit(event) {
    event.preventDefault(); // prevent page reload when form is submitted

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

ReactDOM.render(
  <CommentBox />, // CommentBox: React Component; written in camel-case
  document.getElementById('comment-box') // story-app: HTML element with 'story-app' ID
);