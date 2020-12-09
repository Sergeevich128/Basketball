import React, {useState} from 'react';
import {connect} from "react-redux";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";


const App = (props: any) => (
  <>
    <Header/>
    <Main/>
  </>
)

const mapStateToProps = (store: any) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(App);
