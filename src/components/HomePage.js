import React from 'react';
import Navbar from './Navbar';
import userdetailImg from '../images/userdetails.png';
import cardetailImg from '../images/cardetails.png';
import rentinfoImg from '../images/rentinfo.png';
import reportsImg from '../images/reports.png';
import {Link} from 'react-router-dom';

export default function HomePage(){
    return(
        <>
            <Navbar/>
            <div className="admins">
                <div className="row">
                    <Link to="/userDetails" className="adminhome">
                    <div className="rowtext">USER DETAILS
                    <img src={userdetailImg} className="images"/></div>
                    </Link>

                    <a href="/carDetails" className="adminhome">
                    <div className="rowtext">VEHICLE DETAILS
                    <img src={cardetailImg}  className="images"/></div>
                    </a>
                    
                </div>
                <div className="row">
                    <a href="/rentDetails" className="adminhome">
                    <div className="rowtext">RENT INFORMATION
                    <img src={rentinfoImg}  className="images"/></div>
                    </a>

                    <a href="/generateReports" className="adminhome">
                    <div className="rowtext">GENERATE REPORTS
                    <img src={reportsImg}  className="images"/></div>
                    </a>
                </div>
                
            </div>
        </>
    );
}