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
  render() {
     const comments = this._getComments();
     return( 
      <div class="comment-box">
        <h3>Comments</h3>
        <h4 class="comment-count">
          {/* 0-multiple comments */}
          {this._getCommentsTitle(comments.length)}
        </h4>
          <div class="comment-list">
            {/* refers to comments in commentList; JSX can render arrays */}
            {comments}
          </div>
      </div>

      );
    }

  _getComments() { // return array of JSX elements
    const commentList = [
      { id: 1, author: 'Morgan Circuit', body: 'Great Picture!'},
      { id: 2, author: 'Bending Bender', body: 'Excellent Stuff'}
    ];

   return commentList.map( (comment) => {    // return a new component for each
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

}

ReactDOM.render(
  <CommentBox />, // StoryBox: React Component; written in camel-case
  document.getElementById('comment-box') // story-app: HTML element with 'story-app' ID
);