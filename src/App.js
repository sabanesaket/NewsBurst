import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<News key="general" pageSize={19} catgeory="general" />}/>
          <Route exact path='/business' element={<News key="business" pageSize={19} catgeory="business" />}/>
          <Route exact path='/entertainment' element={<News key="entertainment" pageSize={19} catgeory="entertainment" />}/>
          {/* <Route exact path='/general' element={<News key="general" pageSize={19} catgeory="general" />}/> */}
          <Route exact path='/health' element={<News key="health" pageSize={19} catgeory="health" />}/>
          <Route exact path='/science' element={<News key="science" pageSize={19} catgeory="science" />}/>
          <Route exact path='/sports' element={<News key="sports" pageSize={19} catgeory="sports" />}/>
          <Route exact path='/technology' element={<News key="technology" pageSize={19} catgeory="technology" />}/>
        </Routes>
      </div>
    )
  }
}

