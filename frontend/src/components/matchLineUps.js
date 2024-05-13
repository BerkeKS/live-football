import { useEffect, useState } from "react"

let Squads = (props) => {
    var [squads, setSquads] = useState([])
    useEffect(() => {
        fetch(`https://v3.football.api-sports.io/fixtures/lineups?fixture=${props.match}`, {headers: {
            'x-rapidapi-key': 'c2eb6a05becb1fade6b70900471caad5',
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }})
        .then((response) => response.json())
        .then((data) => {
            setSquads(data.response)
        }).catch((error) => console.log(error))
    }, [props.match])
    var dividerCount = 0
    let dividerPut = (num) => {
        if(num  < 11){
            num = num + 1
            return(<hr style={{border: "3px"}}/>)
        }
    }
    return(
        <div>
            {squads.map((squad, index) => {
                return(
                    <div style={{display: "flex"}}>
                        <div>
                            <p>Formation: {squad.formation}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Squads