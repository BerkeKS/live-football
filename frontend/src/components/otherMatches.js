import { useEffect, useState } from "react";

let LiveMatches = (props) => {
    var[otherMatches, setOtherMatches] = useState([]);
    useEffect(() => {
        fetch(`https://v3.football.api-sports.io/fixtures?league=${props.league}&season=${props.season}&date=${props.date}`, {headers: {
            'x-rapidapi-key': 'c2eb6a05becb1fade6b70900471caad5',
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }})
            .then((response) => response.json())
            .then((data) => {
                setOtherMatches(data.response);
            })
    }, [props.league, props.season, props.date])
    return(
        <div>
            {otherMatches.map((match, index) => {
                return <div key={index}>
                    <hr style={{border: "3px"}}/>
                    <div>
                        <div style={{display: "flex", flexBasis: "25%"}}>
                            <p style={{color: "GrayText"}}>{match.teams.home.name}<span style={{marginLeft: "20", fontWeight: (match.goals.home > match.goals.away) ? "bold" : "normal", color: (match.goals.home > match.goals.away) ? "black" : "GrayText"}}>{match.goals.home}</span></p>
                        </div>
                        <div style={{display: "flex", flexBasis: "25%"}}>
                            <p style={{color: "GrayText"}}>{match.teams.away.name}</p>
                            <p style={{marginLeft: "50", fontWeight: (match.goals.away > match.goals.home) ? "bold" : "normal", color: (match.goals.away > match.goals.home) ? "black" : "GrayText"}}>{match.goals.away}</p>
                        </div>
                    </div>
                    <hr/>
                </div>
            })}
        </div>
    )
}

export default LiveMatches