import Container from 'react-bootstrap/esm/Container';
import './App.css';
import AppBar from './components/appBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import RegisterScreen from './screens/registerScreen';
import LoginuScreen from './screens/loginuScreen';
import LogineScreen from './screens/logineScreen';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import MatchesScreen from './screens/matchesScreen';
import MatchInfoScreen from './screens/matchScreen';


function App() {
  const[user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <AppBar user={user} setUser={setUser} />
        <main className='py-2'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen user={user}/>} exact />
              <Route path='/matches' element={<MatchesScreen/>} />
              <Route path='/loginu' element={<LoginuScreen setUser={setUser}/>} />
              <Route path='/logine' element={<LogineScreen setUser={setUser}/>} />
              <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/matches/:matchID" element={<MatchInfoScreen/>} />
            </Routes>
          </Container>
        </main>
        <Toaster toastOptions={{duration:2000}} />
      </Router>
    </div>
  );
}

export default App;
