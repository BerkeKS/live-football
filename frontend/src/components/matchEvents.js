import { useEffect, useState } from "react"

let Events = (props) => {
    var [events, setEvents] = useState([])
    var [eventNum, setEventNum] = useState(0)
    useEffect(() => {
        fetch(`https://v3.football.api-sports.io/fixtures/events?fixture=${props.match}`, {headers: {
            'x-rapidapi-key': 'c2eb6a05becb1fade6b70900471caad5',
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }})
          .then((response) => response.json())
          .then((data) => {
            setEvents(data.response)
            setEventNum(data.response.length)
          })
    }, [props.match])
    var edgeCount = 0
    var edgePut = (edgeNum, num) => {
        if(edgeNum < num){
            edgeNum = edgeNum + 1
            return(<div style={{borderLeft: "2px solid gray", height: "25px"}}></div>)
        }
    }
    return(
            <div style={{justifyContent: "center"}}>
                {events.map((event, index) => {
                    return(
                        <div key={index} style={{backgroundColor: "#fff", border: "3px solid aquamarine", height: "40px", width: "40px", borderRadius: "50%", justifyContent: "center"}}>
                            <p style={{justifyContent: "center"}}>{event.time.elapsed}</p>
                            {edgePut(edgeCount, eventNum)}
                        </div>
                    )
                })}
            </div>
    )
}

export default Events