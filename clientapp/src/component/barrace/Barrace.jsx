import React from "react"
import BarChart from 'chart-race-react';

const Barrace = ({info})=>{
    
    const {data, len, colors, claves, time} = info;
    
   
    const labels = claves.reduce((res, item, idx)=>{
        return {
            ...res,
            ...{
                [item]: 
                (
                    <div className="text-center">
                        <div className="mr-4 text-white h4">{item}</div>
                    </div>
                )
            }
        }
    },{})

    return(
        <div className="container">
            <BarChart
               start={true}
               data={data} 
               timeline={time}
               labels={labels}
               colors={colors}
               len={len}
               timeout={600}
               delay={300}
               timelineStyle={{
                 textAlign: "center",
                 fontSize: "50px",
                 color: "rgb(222,222,222)",
                 marginBottom: "20px"
               }}
               textBoxStyle={{
                 textAlign: "right",
                 color: "rgb(200,200,200)",
                 fontSize: "20px",
               }}
               barStyle={{
                 height: "25px",
                 marginTop: "8px",
                 borderRadius: "5px",
               }}
               width={[30, 80, 20]}
               maxItems={10}

            
            />

        </div>
    )
}

export default Barrace;