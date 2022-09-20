import React, { useState } from "react";
import GamerepoDataService from "../services/gamerepo";
import { Link, useLocation, useParams } from "react-router-dom";

const AddComment = props => {

  let initialCommentState = ""

  let editing = false;

  const { id } = useParams();

  const location = useLocation();
  
  if (location && location.id) {
    editing = true;
    initialCommentState = location.currentComment.text
  }


  console.log(location._id);
  const [comment, setComment] = useState(initialCommentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setComment(event.target.value);
  };

  const saveComment = () => {
    var data = {
      text: comment,
      name: props.user.name,
      user_id: props.user.id,
      game_id: id
    };

    if (editing) {
      data.commentId = location.currentComment._id
      GamerepoDataService.updateComment(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      GamerepoDataService.createComment(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/games/" + id} className="btn btn-success">
              Back to Games
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Comment</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={comment}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveComment} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddComment;