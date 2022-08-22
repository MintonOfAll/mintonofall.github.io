import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import members from "./member.js";

let teamIndex = 0;
function App() {
  let [playingPlayer, setPlayingPlayer] = useState([]);
  let [newPlayer, setNewPlayer] = useState("");
  let [players, setPlayers] = useState([]);
  let [teams, setTeams] = useState([]);
  let [gameResultAtom, setGameResultAtom] = useState([]);
  let result = [];
  let gameResult = [];
  for (let i = 0; i < playingPlayer.length; i += 4)
    result.push(playingPlayer.slice(i, i + 4));
  for (let i = 0; i < gameResultAtom.length; i += 4)
    gameResult.push(gameResultAtom.slice(i, i + 4));
  console.log("gameResult : " + gameResult);
  console.log("gameResultAtom : " + gameResultAtom);
  let getPlayers = localStorage.getItem('localPlayers');
  console.log("getPlayers : " + JSON.parse(getPlayers));

  useEffect(()=> {
    localStorage.setItem('localPlayers', JSON.stringify([]))
  },[])

  return (
    <div className="App">
      <h4>대기시합</h4>
      {result.map(function (a, i) {
        return (
          <>
            {" "}
            <div>
              {a[0] + " " + a[1] + " " + a[2] + " " + a[3] + " "}
              <button
                onClick={() => {
                  let copy = [...gameResultAtom];
                  let copyPlayingPlayer = [...playingPlayer];
                  copy.push(a[0]);
                  copy.push(a[1]);
                  copy.push(a[2]);
                  copy.push(a[3]);
                  setGameResultAtom(copy);
                  localStorage.setItem('localGameResultAtom', JSON.stringify(gameResultAtom));
                  copyPlayingPlayer.splice(i, 4);
                  setPlayingPlayer(copyPlayingPlayer);
                  localStorage.setItem('localPlayingPlayer', JSON.stringify(playingPlayer));
                }}
              >
                종료
              </button>
            </div>
          </>
        );
      })}

      <button
        onClick={() => {
          setPlayingPlayer([]);
          result = [];
        }}
      >
        시합리셋
      </button>
      <div className="wating player">
        <hr></hr>
        <h4>대기선수</h4>
        {
        JSON.parse(getPlayers).map(function (member, i) {
          // let playNumber = gameResultAtom.filter(member).length();
          return (
            <>
              <div className="watingPlayerListDiv">
                <span
                  className="watingPlayerListDiv"
                  onClick={() => {
                    let copy = [...playingPlayer];
                    copy.push(member);
                    setPlayingPlayer(copy);
                    console.log("playing : " + playingPlayer);
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/memberImg/${member}.jpeg`}
                    className="watingPlayerListImg"
                    width="50px"
                  />
                  {member}

                  <div className="playNumber">
                    {" "}
                    경기수 :{" "}
                    {playingPlayer.filter((A) => A === member).length +
                      gameResultAtom.filter((A) => A === member).length}
                  </div>
                </span>

                <button
                  className="outButton"
                  onClick={() => {
                    let copy = [...players];
                    copy.splice(i, 1);
                    setPlayers(copy);
                  }}
                >
                  퇴장
                </button>
              </div>
            </>
          );
        })}

        <input
          type="text"
          name="playerName"
          value={newPlayer}
          onChange={(e) => {
            setNewPlayer(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            let copy = [...players];
            copy.push(newPlayer);
            setPlayers(copy);
            localStorage.setItem('localPlayers', JSON.stringify(copy));
            const test = localStorage.getItem('localPlayers');
            console.log("test : "+test);
            setNewPlayer("");
          }}
        >
          {" "}
          입장{" "}
        </button>
        <div>
          <button
            onClick={() => {
              setPlayers([]);
            }}
          >
            리셋
          </button>
          <button
            onClick={() => {
              let copy = [...playingPlayer];
              copy.pop();
              setPlayingPlayer(copy);
            }}
          >
            되돌리기
          </button>
        </div>
      </div>
      <h2>시합결과</h2>
      {gameResult.map(function (a, i) {
        return (
          <>
            <div>{a[0] + " " + a[1] + " " + a[2] + " " + a[3] + " "}</div>
          </>
        );
      })}
      <button
        onClick={() => {
          gameResult = [];
          gameResultAtom = [];
        }}
      >
        리셋
      </button>
    </div>
  );
}

export default App;
