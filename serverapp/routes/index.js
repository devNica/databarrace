const router = require("express").Router();
const xlsx = require("xlsx");

router.get("/get/chartdata", (req, res)=>{
    const wb = xlsx.readFile("public/data.xlsx");
    const ws = wb.Sheets["countries_and_territories"];
    const info = xlsx.utils.sheet_to_json(ws);

    
    /**
     * CADA ELEMENTO DENTRO DEL ARRAY INFO, ES UN CONJUNTO DE DATOS QUE REPRESENTAN UNA FILA DEL ARCHIVO (DE EXCEL)
     * DESDE DONDE SON LEIDOS, ESTA SE RETORNA COMO PARES DE CLAVE:VALOR DONDE LAS CLAVES SON LA DESCRIPCION DEL DATO
     * CUYO VALOR VALGA LA REDUNDANCIA ESTA CONTENIDO EN VALUE.
     * console.log(info[0])
     * 
     * ['1800': 603,
     * '1801': 603,
     * '1802': 603,
     * .
     * .
     * .
     * '2040': 2942, ---> POSITION: 241
     * geo_name: 'Afghanistan'
     * indicator_name: 'GPD per capita, PPP (constan 2011 international $)',
     * geo: 'agf',
     * indicator: 'gpdcc_cppp']
     * 
    */

    /**
     * ESTA FUNCION REDUCTORA TIENE EL PROPOSITO DE TRANSFORMAR LOS DATOS
     * DE TAL FORMA QUE SE ORGANICEN LOS VALORES DEL PIB MEDIDO POR AÑOS 
     * CLASIFICADOS POR EL NOMBRE DEL PAIS CORRESPONDIENTE
    */

    const array_to_object = (acc, curr)=>({
        ...acc,
        ...{
            [curr.geo_name]: Object.values(curr).slice(0,241)
        }
    })

    let chartdata = info.reduce(array_to_object,{});

    /**
     * COMO RESULTADO DE LA FUNCION REDUCTORA, SE OBTIENE LO SIGUIENTE:
     * console.log(chartdata)
     * {
     *   "Afghanista": [603,603,603,...,2942],
     *    "Albania": [667,667,667,...,22500],
     * }
     * 
    */

    /**LA FUNCION randomColor PERMITE CALCULAR UN COLOR RGBA DE FORMA ALEATORIA*/

    const randomColor = () => {
        return `rgba(${Math.floor(255 * Math.random())}, ${Math.floor(
        255 * Math.random()
      )}, ${Math.floor(255 * Math.random())}, 0.7)`;
    };

    
    const data = chartdata; 
    const len = data[Object.keys(data)[0]].length; //TAMAÑO DE CADA VECTOR DE DATOS PIB
    const claves = Object.keys(data) //RETORNA UN ARRAY CON LOS NOMBRES DE SOLO LOS PAISES

    /*
    * LA SIGUIENTE FUNCION REDUCTORA DEVUELVE UN OBJETO CON LOS PARES CLAVE:VALOR 
    * DONDE LA CLAVE ES EL NOMBRE DEL PAIS Y EL VALOR UN COLOR RGBA ALEATORIAMENTE ASIGNADO
    * console.log(colors)
    *   colors:{
    *       "Afghanistan": "rgba(12, 145, 245, 0.7)",
    *       "Albania": "rgba(143, 14, 247, 0.7)",
    *       "Algeria": "rgba(209, 104, 24, 0.7)",
    *   }
    * 
    *   console.log(claves)
    *   claves:["Afghanistan","Albania", "Algeria", ...]
    * 
    *   data:{
    *    "Afghanista": [603,603,603,...,2942],
    *    "Albania": [667,667,667,...,22500],
    *   }
    */

    const colors = claves.reduce((res, item)=>({
        ...res,
        ...{
            [item]: randomColor()
        }
    }),{})

    /***
     * PARA MOSTRAR LA EVOLUCION TEMPORAL DE LOS DATOS SE NECESITA DE UN VECTOR DE IGUAL TAMAÑO
     * QUE EL VECTOR DE DATOS PIB, DONDE CADA VALOR CORRESPONDE AL AÑO EN QUE SE TOMO LA MUESTRA
     * PARA EL PIB
     * 
     * console.log(time)
     * time: [1800,1801,1802,...,2038,2039,2040]
     * 
    */

    const time = Array(241).fill(1800).map((itm, idx)=>itm+idx)

    res.json({data, len, claves, colors, time})
})

module.exports = router;