import Announcements from '../../announcements/announcements.js';
import EspaBox from '../../espaBox/espaBox.js';
import PrivComBox from '../../privComBox/privComBox.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Application from '../../myApplication/myApplication.js'

export default function Home() {

    const [application, setApplication] = useState([]);

    const [userSend, setUserSend] = useState([]);

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            const user = jwt_decode(token)
            setUserSend(user)
            console.log(user)
        }


        
    },[token])

    useEffect(() => {
        axios.post('http://localhost:5500/student/getApplication',{email:userSend.email}).then((application) => {
            setApplication(application.data)
            console.log(application.data)
        })
    },[userSend])

    return (
        <div className="home">
            {application.length>0 && <Application application={application}/>}
            <Announcements/>
            <EspaBox/>
            <PrivComBox/>
        </div>
    );
}
