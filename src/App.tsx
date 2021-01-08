import React from 'react';
import {connect} from "react-redux";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import './App.css'

const App = () => (
    <div className={'wrapper'}>
        <Header/>
        <Main/>
    </div>
)

const mapStateToProps = (store: any) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(App);
