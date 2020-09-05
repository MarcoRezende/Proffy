import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing/'
import TeacherList from './pages/TeacherList/'
import TeacherForm from './pages/TeacherForm/'
import SignUp from './pages/SignUp/'
import ForgotPassword from './pages/ForgotPassword/'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
            <Route path="/sign-up" component={SignUp}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
        </BrowserRouter>
    )
}

export default Routes;