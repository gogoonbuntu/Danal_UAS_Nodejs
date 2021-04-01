const axios = require('axios')
const iconv = require('iconv-lite')

/******************************************************
 * ID		: 다날에서 제공해 드린 CPID
 * PWD		: 다날에서 제공해 드린 CPPWD
 * ORDERID	: CP 주문정보
 ******************************************************/
const ID  = ""
const PWD = ""
const ORDERID = "ORDERID"
exports.ID = ID
exports.PWD = PWD
exports.ORDERID = ORDERID

/******************************************************
 * 게발용 옵션
 ******************************************************/
const Debug = true
const serverAddr = "http://localhost:3003"
exports.Debug = Debug
exports.serverAddr = serverAddr


exports.CallTrans = async function( data ) {
	
	if( Debug ) {
		//인증서 무시 옵션입니다. 테스트에만 사용해주세요.
		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
	}
	
    let REQ_STR = data2str( data )
    let RES_STR = ""
	
	const DN_SERVICE_URL = "https://uas.teledit.com/uas/"
	const DN_CONNECT_TIMEOUT = 5
	const DN_TIMEOUT = 30	
	
	let res = await axios.post(DN_SERVICE_URL, REQ_STR, {
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		  },
		  responseType: 'arraybuffer'
	 })
	 	  
	
	 if(res.status == '200') {
		 RES_STR = iconv.decode(res.data, 'utf-8').toString()
	 } else {
		 //network error logic
		 RES_STR = 'RETURNCODE=-1'
	 }
	 
	 if ( Debug ){
		console.log('\n\nCallTrans Data')
		console.log('REQ => ' + REQ_STR)
		console.log('RES => ' + RES_STR)
		console.log('\n\n\n')
	}
	
	return str2data(RES_STR)
}

data2str = function( data ) {
    let str = ""
    data.forEach((val, key, mapObject) => str+=(key+'='+encodeURI(val)+'&'))
    return str.slice(0,-1)
}
exports.data2str = data2str

str2data = function( str ){
    const myMap = new Map()
    let query = str.split('&')
    for (elem of query) {
        let pair = elem.split('=')
        myMap.set(pair[0], pair[1])
    }
    return myMap
}
exports.str2data = str2data

exports.MakeFormInput = function( myMap, arr ) {
	let ret = ""

	if (arr != null) {
		for ( i in arr ) {
			if ( myMap.has(arr[i]) ){
				myMap.delete(arr[i])
			}
		}
	}
	
	for ( i of myMap ){
		var key = i[0]
		var val = i[1]
		
		ret += "<input type=\"hidden\" name=\""
		ret += key
		ret += "\" value=\""
		ret += val
		ret += "\">"
		ret += "\n"
	}

	return ret
}

exports.MakeFormInputHTTP = function( HTTPVAR,arr ){
	
	let ret = ""
	let key = ""
	let val = []
	
	for ( i of Object.keys(HTTPVAR) ){
		key = i
		if ( key == arr ){
			continue
		}
		
		val = HTTPVAR[key]
		
		ret += "<input type=\"hidden\" name=\""
		ret += key
		ret += "\" value=\""
		ret += val
		ret += "\">"
		ret += "\n"
	}
	
	return ret
}