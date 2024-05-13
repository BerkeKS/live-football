import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import LiveMatches from "../components/otherMatches";
import Events from "../components/matchEvents";
import { Button } from "react-bootstrap";
import Squads from "../components/matchLineUps";

const MatchInfoScreen = () => {
    var [match, setMatch] = useState([]);
    var [option, setOption] = useState(0);
    //console.log is effectibe to get the data structure
    var matchID = useParams()["matchID"]
    useEffect(() => {
        fetch(`https://v3.football.api-sports.io/fixtures?id=${matchID}`, {headers: {
            'x-rapidapi-key': 'c2eb6a05becb1fade6b70900471caad5',
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }})
            .then((response) => response.json())
            .then((data) => {
                setMatch(data.response);
            })
    }, [matchID]);
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = ((currentDate.getMonth() + 1) > 9) ? (currentDate.getMonth() + 1) : ("0".concat((currentDate.getMonth() + 1).toString())) ;
    var currentDay = ((currentDate.getDate()) > 9) ? (currentDate.getDate()) : ("0".concat(currentDate.getDate().toString()))
    var currentWeekDay = week[currentDate.getDay()]
    return(
        <div>
            {match.map((m, index) => {
                return <div key={index} style={{display: "flex", flexBasis: "15%",  justifyContent: "space-between"}}>
                            <div style={{display: "inline"}}>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                    <p style={{fontSize: "35px"}}>{m.league.name}</p>
                                    <p style={{marginInline: "10px", fontSize: "20px"}}>{m.league.country}</p>
                                    <img width={70} src={m.league.logo} alt="" />
                                </div>
                                <div style={{borderColor: "black"}}>
                                    <p>{`${currentYear}-${currentMonth}-${currentDay} -- ${currentWeekDay}`}</p>
                                    <LiveMatches league={m.league.id} season={currentYear} date={`${currentYear}-${currentMonth}-${currentDay}`}/>
                                </div>
                            </div>
                            <div style={{flexBasis: "80%"}}>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <div>
                                        <img width={100} src={m.teams.home.logo} alt=""/>
                                        <p style={{fontSize: "23px"}}>{m.teams.home.name}</p>
                                    </div>
                                    <div style={{display:"flex", marginInline: "20px", alignItems: "center"}}>
                                        <p style={{fontSize: "25px", color: (m.goals.home > m.goals.away) ? "green" : "gray", fontWeight: (m.goals.home > m.goals.away) ? "bold" : "normal"}}>{m.goals.home}</p>
                                        <p style={{marginInline: "10px"}}>-</p>
                                        <p style={{fontSize: "25px", color: (m.goals.home < m.goals.away) ? "green" : "gray", fontWeight: (m.goals.home < m.goals.away) ? "bold" : "normal"}}>{m.goals.away}</p>
                                    </div>
                                    <div>
                                        <img width={100} src={m.teams.away.logo} alt=""/>
                                        <p style={{fontSize: "23px"}}>{m.teams.away.name}</p>
                                    </div>
                                </div>
                                <div style={{display: "-moz-initial"}}>
                                    <Button onClick={() => setOption(0)}>Statistics</Button>
                                    <Button style={{marginInline: "15px"}} onClick={() => setOption(1)}>Line-Up</Button>
                                    <Button onClick={() => setOption(2)}>Summary</Button>
                                </div>
                                <div style={{justifyContent: "flex-end"}}>{(option === 0) ? <p>Stats</p> : ((option === 1) ? <Squads match={matchID} /> : <Events match={matchID} />)}</div>
                            </div>
                        </div>
            })}
        </div>
    )
}

export default MatchInfoScreen;
