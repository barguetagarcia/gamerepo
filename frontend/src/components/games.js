import React, { useState, useEffect } from "react";
import GamerepoDataService from "../services/gamerepo";
import { Link, useParams } from "react-router-dom";

const Games = props => {
  const initialGameState = {
    id: null,
    title: "",
    cover: "",
    publisher: "",
    comments: []
  };
  const [game, setGame] = useState(initialGameState);



  const getGame = id => {
    GamerepoDataService.get(id)
      .then(response => {
        setGame(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const { id } = useParams();

  useEffect(() => {
    getGame(id);
  }, [id]);



  const deleteComment = (commentId, index) => {
    GamerepoDataService.deleteComment(commentId, props.user.id)
      .then(response => {
        setGame((prevState) => {
          prevState.comments.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {game ? (
        <div>
          <h5>{game.title}</h5>
          <img src={game.cover} />
          <p>
            <strong>Publisher: </strong>{game.publisher}<br/>
          </p>
          <Link to={"/games/" + id + "/comments"} className="btn btn-primary">
            Add Comment
          </Link>
          <h4> Comments </h4>
          <div className="row">
            {game.comments.length > 0 ? (
             game.comments.map((comment, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {comment.text}<br/>
                         <strong>User: </strong>{comment.name}<br/>
                         <strong>Date: </strong>{comment.date}
                       </p>
                       {props.user && props.user.id === comment.user_id &&
                          <div className="row">
                            <a onClick={() => deleteComment(comment._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/games/" + id + "/comments",
                              state: {
                                currentComment: comment
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No comments yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No game selected.</p>
        </div>
      )}
    </div>
  );
};

export default Games;