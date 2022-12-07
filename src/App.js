import React, { useEffect, useState } from "react";
import {  BrowserRouter, Route, NavLink } from 'react-router-dom';
import NavBar from "./components/NarBar/NarBar";
import AvailableHouses from "./components/AvailableHouses/AvailableHouses";
import UserProfile from "./components/UserProfile/UserProfile";
import MyReviews from "./components/MyReviews/MyReviews";
import MyVisits from "./components/MyVisits/MyVisits";
import LoginSignUpPage from "./components/LoginSignUpPage/LoginSignUpPage";
import HouseProfile from "./components/HouseProfile/HouseProfile";
import './App.css';


const API_URL = "http://127.0.0.1:3000/houses"



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([])
  const [reviews, setReviews] = useState([])
  const [selectedState, setSelectedState] = useState('All')

  useEffect(() => {
    fetch('/authorized_user')
    .then(r => {
      if(r.ok){
        r.json()
        .then(user => {
          setIsAuthenticated(true)
          setUser(user)
        })
        .then(unlockHouses)
        .then(unlockReviews)
      }
    })
  }, []);

  const unlockHouses = () => {
    fetch('/houses')
    .then(r => r.json())
    .then(data => setHouses(data))
    }
  const unlockReviews = () => {
    fetch(`http://localhost:3000/reviews/${user.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
  }

  const filterHouses = () => {
    if(selectedState === "All"){
        return houses
    } else {
        return houses.filter(h => h.location.toLowerCase().includes(selectedState.toLowerCase()))
    }
}

  if(!isAuthenticated) return <LoginSignUpPage setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
  return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/">
            {isAuthenticated ? <NavLink to= "/availablehouses"/> : <LoginSignUpPage  setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>}
          </Route>
          <div>
            <NavBar setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
            <div className="body">
              <Route exact path="/availablehouses">
                  {isAuthenticated ? <AvailableHouses houses={filterHouses()} setSelectedState={setSelectedState} selectedState={selectedState} /> : <NavLink to="/"/>}
              </Route>
              <Route path="/userprofile">
                {isAuthenticated ? <UserProfile user={user}/> : <NavLink to="/"/>}
              </Route>
              <Route path="/myvisits">
                {isAuthenticated ? <MyVisits user={user} houses={houses}/> : <NavLink to="/"/>}
              </Route>
              <Route path="/myreviews">
                {isAuthenticated ? <MyReviews user={user} reviews={reviews} setReviews={setReviews} houses={houses}/>  : <NavLink to="/"/>}
              </Route>
              <Route path="/availablehouses/:id">
                {isAuthenticated ? <HouseProfile user={user}/>  : <NavLink to="/"/>}
              </Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}
export default App;