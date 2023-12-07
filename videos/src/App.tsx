import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {Home, Details, Quiz,Leaderboard} from './pages';
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
  return (
      <ErrorBoundary>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path={"/details/:videoSlug"} element={<Details/>}/>
                  <Route path={"/quiz/:videoSlug"} element={<Quiz/>}/>
                  <Route path={"/leaderboard/:videoSlug"} element={<Leaderboard/>}/>
              </Routes>
          </BrowserRouter>
      </ErrorBoundary>

  );
}

export default App;
