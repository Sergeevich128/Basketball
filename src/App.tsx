import React from 'react';
import {connect} from "react-redux";
import Header from "./modules/header/Header";
import Main from "./modules/main/Main";

const App = () => (
    <div className="wrapper">
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
