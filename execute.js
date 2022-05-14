/* 
 * Desafío - Cotiza con BlueMoney Parte 2
 * Author: Max Coronado Lorca
 */

const cp = require('child_process')

const fileName = 'bluemoney.js'
const params = 'data dat dolar 12000'

cp.exec(`node ${fileName} ${params}`, (err, res) => {
    console.log(res)        
})