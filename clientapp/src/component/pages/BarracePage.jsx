import React, { useEffect, useState } from "react";
import "./BarracePage.css"
import axios from "axios";
import Barrace from "../barrace/Barrace";


const BarracePage = ()=>{

    const [chartdata, setData] = useState({})
    
    useEffect(()=>{
        axios.get("/api/get/chartdata").then(response=>{
        const {data} = response;
        setData(data)
        })
    },[])

    return(
        <div>
            <h1 className="border py-3 px-3 mx-3 my-3 bg-titulo text-white text-center">PIB ANUAL</h1>
            { chartdata.len !== undefined ? 
                <Barrace info={chartdata}/>: null }
            <div className="container mt-5 text-center">
                <span className="text-white">
                    This application uses data from the following website  
                </span>
               
                <a href="https://www.gapminder.org/data/documentation/gd001/" target="blank" className="nav-link border border-primary mt-4"> https://www.gapminder.org/data/documentation/gd001/</a> 
             
                
            </div>
        </div>
    )
}

export default BarracePage;