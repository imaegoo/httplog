const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
const moment = require('moment')
const app = express()
const port = 4000
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'http.log' }),
        new winston.transports.Console()
    ]
});

app.use(bodyParser.json({
    type: 'application/json'
}))
app.use(bodyParser.urlencoded({
    type: 'application/x-www-form-urlencoded'
}))
app.use(bodyParser.text({
    type: '*/*'
}))
app.get('*', reqHandler)
app.post('*', reqHandler)
app.put('*', reqHandler)
app.delete('*', reqHandler)
app.listen(port, () => console.log(`listening & logging on port ${port}`))

function reqHandler(req, res) {
    logger.info(formatReq(req))
    res.send('OK')
}

function formatReq(req) {
    let logStr = getStandardDateTime()
    logStr += `\n\t${req.method} ${req.path}`
    logStr += `\n\tQuery:`
    logStr += `${toString(req.query, 2)}`
    logStr += `\n\tHeader:`
    logStr += `${toString(req.headers, 2)}`
    if (req.method !== 'GET') {
        logStr += `\n\tBody:`
        if (req.body instanceof Object) {
            logStr += `${toString(req.body, 2)}`
        } else {
            logStr += `\n\t\t${req.body}`
        }
    }
    console.log(req)
    return logStr
}

function getStandardDateTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

function toString(obj, tabCount = 2) {
    let str = ''
    let item
    for (let key in obj) {
        item = obj[key]
        str += '\n'
        for (let i = 0; i < tabCount; i++) str += '\t'
        str += `${key}:`
        if (item instanceof Object) {
            str += toString(item, tabCount + 1)
        } else {
            str += ` ${item}`
        }
    }
    return str
}
