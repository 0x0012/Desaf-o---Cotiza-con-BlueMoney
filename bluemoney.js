/*
 * Desafío - Cotiza con BlueMoney Parte 1
 * @author Max Coronado Lorca
 */

const fs = require('fs')
const https = require('https')

const URL = 'https://mindicador.cl/api'

const main = args => {
  const filename = args[0]
  const filetype = args[1]
  const toUnit = args[2]
  let pesos = Number(args[3])
  
  https
    .get(URL, response => {
      let data = ''
      response.on('data', chunk => {
        data += chunk
      })
      response.on('end', _ => {
        let dataFile = prepareDataFile(JSON.parse(data), pesos, 'dolar')
        fs.writeFile(`${filename}.${filetype}`, JSON.stringify(dataFile), 'utf8', _ => {
          console.log(`Se ha creado el archivo "${filename}.${filetype}"`)
          console.log(dataFile)
        })
      })
    })    
    .on('error', err => {
      console.error(err)
    })
}  

const prepareDataFile = (data, from, to) => {
  date = `A la fecha: ${data.fecha}`
  text = 'Fue realizada cotización con los siguientes datos:'
  pesos = `Cantidad de pesos a convertir: $${from} pesos`
  toUnit = `Convertido a "${to}" da un total de: $${(from / data[to].valor).toFixed(2)}`

  return [date, text, pesos, toUnit]
}

main(process.argv.slice(2))