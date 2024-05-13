import { useEffect, useState } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import {AiOutlineSearch} from "react-icons/ai";

const MatchesScreen = () => {
    var [livematches, setLivematches] = useState([]);
    useEffect(() => {
        function getMatch() {
            fetch('https://v3.football.api-sports.io/fixtures?live=all', {headers: {
            'x-rapidapi-key': 'c2eb6a05becb1fade6b70900471caad5',
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }})
            .then((response) => response.json())
            .then((data) => {
                setLivematches(data.response);
            })
        }
        getMatch()
        const interval = setInterval(() => getMatch(), 15000)
        return () => {clearInterval(interval);}
    }, []);
    const buttonContent = <><span>Details</span><span>{<AiOutlineSearch style={{margin: "0px 0px 0px 10px"}} className='text-white' size="20"/>}</span></>
    return(
        <>
            <h1>Live Matches</h1>
            {livematches.map((fixture, index) => {
                return <div key={index}>
                    <p style={{fontSize: "20px"}}>{`${fixture.league.country}  -  ${fixture.league.name}`}</p>
                    <Container>
                    <Row>
                        <Col>
                        <img src={fixture.teams.home.logo} width={85} alt=""></img>
                        </Col>
                        <Col>
                        <p style={fixture.goals.home > fixture.goals.away ? {backgroundColor: "gray", color: "white"} : {backgroundColor: "transparent", color:"gray"}}>{fixture.teams.home.name}</p>
                        </Col>
                        <Col>
                        <p>{'      ' + fixture.goals.home + '-' + fixture.goals.away + '      '}</p>
                        <Button style={{color: "white", borderColor: "aquamarine"}} href={`matches/${fixture.fixture.id}`}>{buttonContent}</Button>
                        </Col>
                        <Col>
                        <p style={fixture.goals.away > fixture.goals.home ? {backgroundColor: "gray", color: "white"} : {backgroundColor: "transparent", color:"gray"}}>{fixture.teams.away.name}</p>
                        </Col>
                        <Col>
                        <img src={fixture.teams.away.logo} width={85} alt=""></img></Col>
                    </Row>
                </Container>
                <hr/>
                </div>
            })}
        </>
    )
    
}

export default MatchesScreen