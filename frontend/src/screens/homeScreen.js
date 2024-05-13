const HomeScreen = ({user}) => {
    return(
        <div style={{display: "flex", gap: "10px", justifyContent: "space-around"}}>
                <div style={{background: "red", flexBasis: "25%", display: "flex", alignSelf: "center", justifyContent: "center"}}>1</div>
                <div style={{background: "green", flexBasis: "50%"}}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div style={{background: "red", flexBasis: "25%", display: "flex", alignSelf: "center", justifyContent: "center"}}>3</div>
            </div>
    );
}

export default HomeScreen;