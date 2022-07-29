/*
npm install express
npm install axios
npm install iconv-lite
*/



const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

const { ReadyFunction } = require("./ready")
const { CPCGIFunction } = require("./CPCGI")

app.use("/", express.static(path.join(__dirname)))
//app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:false}))

app.get('/ready', (req, res) => {
	ReadyFunction().then(resform => {
		res.send(resform)
	})
})

app.post('/CPCGI', (req, res) => {
	CPCGIFunction(req.body).then(resform => {
		res.send(resform)
	})
})

app.post('/Success', (req, res) => {
	res.set({'Content-Type': 'text/html; charset=EUC-KR'})
	res.sendFile(path.join(__dirname, "Success.html"))
})

app.post('/BackURL', (req, res) => {
	//본인인증 실패시 뒤로가기 버튼을 누르면 이동할 페이지를 연결
})

app.listen(3003, () => {
  console.log('Express App on port 3003!')
})
