import React, { useState, useEffect } from "react";
import GamerepoDataService from "../services/gamerepo";
import { Link } from "react-router-dom";

const GamesList = props => {
  const [games, setGames] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchPlatform, setSearchPlatform] = useState("");
  const [searchPublisher, setSearchPublisher] = useState("");
  const [publishers, setPublishers] = useState(["All Publishers"]);

  useEffect(() => {
    retrieveGames();
    retrievePublishers();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchPlatform = e => {
    const searchPlatform = e.target.value;
    setSearchPlatform(searchPlatform);
  };

  const onChangeSearchPublisher = e => {
    const searchPublisher = e.target.value;
    setSearchPublisher(searchPublisher);
    
  };

  const retrieveGames = () => {
    GamerepoDataService.getAll()
      .then(response => {
        console.log(response.data);
        setGames(response.data.games);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrievePublishers = () => {
    GamerepoDataService.getPublishers()
      .then(response => {
        console.log(response.data);
        setPublishers(["All Publishers"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveGames();
  };

  const find = (query, by) => {
    GamerepoDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setGames(response.data.games);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchTitle, "title")
  };

  const findByPlatform = () => {
    find(searchPlatform, "platform")
  };

  const findByPublisher = () => {
    if (searchPublisher == "All Publishers") {
      refreshList();
    } else {
      find(searchPublisher, "publisher")
    }
  };

  return (
    <div>
      <div className="row pb-3">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4 mt-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search by platform"
            value={searchPlatform}
            onChange={onChangeSearchPlatform}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByPlatform}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4 mt-1">

          <select onChange={onChangeSearchPublisher}>
             {publishers.map(publisher => {
               return (
                 <option value={publisher}> {publisher.substring(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByPublisher}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {games.map((game) => {
          const cover = `${game.cover}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <p className="card-text">
                    <strong>Publisher: </strong>{game.publisher}<br/>                      
                  </p>
                  <img src={cover} alt="Cover" />
                  <div className="row">
                  <Link to={"/games/"+game._id} className="btn btn-primary col-lg-5 mx-1 mb-1 mt-2">
                    View Comments
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default GamesList;
