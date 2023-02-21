import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/postlist.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const appId = process.env.REACT_APP_APP_ID;

  useEffect(() => {
    axios.get('https://dummyapi.io/data/v1/post', {
      headers: {
        'app-id': appId
      }
    })
      .then(response => {
        setPosts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [appId]);

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    axios.get(`https://dummyapi.io/data/v1/post/${post.id}/comment`, {
      headers: {
        'app-id': appId
      }
    })
      .then(response => {
        setComments(response.data.data);

      })
      .catch(error => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setSelectedPost(null);
    setComments([]);
  };

  const handleTagSearch = (tag) => {
    const url = `https://dummyapi.io/data/v1/tag/${tag}/post`;

    axios.get(url, {
      headers: {
        'app-id': appId
      }
    })
      .then(response => {
        setPosts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearchTextChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    if (newSearchText === '') {
      axios.get('https://dummyapi.io/data/v1/post', {
        headers: {
          'app-id': appId
        }
      })
        .then(response => {
          setPosts(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      handleTagSearch(newSearchText);
    }
  };

  return (
    <div className='body-post'>
      <input type="text" placeholder="Search for tag" value={searchText} onChange={handleSearchTextChange} />

    <div className="post-list">
      {posts.map(post => (
        <div className="post-card" key={post.id}>
          <div className="user-info">
            <img src={post.owner.picture} alt={post.owner.firstName} />
            <span className="user-name">{post.owner.firstName} {post.owner.lastName}</span>
          </div>
          <div className="post-content">
            <img src={post.image} alt="" />
            <p>{post.text}</p>
            <div className="post-tags">
              {post.tags.map(tag => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="post-stats">
          <span onClick={() => handleCommentClick(post)} style={{ cursor: "pointer" }}>
  {post.comments} view comments 
</span>
          </div>
        </div>
      ))}
      {selectedPost && (
  <div className="modal">
    <div className="modal-content">
      <button className="close-button" onClick={closeModal}>X</button>
      <h2>Comentarios</h2>
      {comments.length === 0 ? (
        <div>Sin comentarios</div>
      ) : (
        comments.map(comment => (
          <div className="comment" key={comment.id}>
            <p>{comment.id}</p>
            <div className="user-info">
              <img src={comment.owner.picture} alt={comment.owner.firstName} />
              <span className="user-name">{comment.owner.firstName} {comment.owner.lastName}</span>
            </div>
            <div className="comment-content">
              <p>{comment.message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}

    </div>
    </div>
  );
};

export default PostList;
