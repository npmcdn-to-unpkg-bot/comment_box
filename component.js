class Comment extends React.Component {
  render() {            // render function:must have for all components
     return( 
      
      <div className="comment">
        <p className="comment-header">
          {/* reading 'props' (aka arguments) from the CommentBox class */}
          {this.props.author}
          </p> 
        <p className="coment-body">
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
     return( 
      <div class="comment-box">
        <h3>Comments</h3>
        <h4 class="comment-count">2 comments</h4>
          <div class="comment-list">
            {/* refers to the 2 divs(comment & comment-footer) in Comment class */}
            <Comment
              author="Willy-Kun" body="Hey Hey Hey" />
            <Comment
              author="Wilbur" body="Cookies" />
          </div>
      </div>



      );
    
  }
}

ReactDOM.render(
  <CommentBox />, // StoryBox: React Component; written in camel-case
  document.getElementById('comment-box') // story-app: HTML element with 'story-app' ID
);