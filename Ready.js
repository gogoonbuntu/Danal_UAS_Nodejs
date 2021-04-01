exports.ReadyFunction = async ()=> {
	const { CallTrans, data2str, ID, PWD, ORDERID, MakeFormInput, serverAddr } = require("./inc/function")
	
	/********************************************************************************
	 *
	 * [ 전문 요청 데이터 ] *********************************************************
	 *
	 ********************************************************************************/

	/***[ 필수 데이터 ]************************************/
	const TransR = new Map()
	const CHARSET = "EUC-KR"
	const iconv = require('iconv-lite')
	
	/******************************************************
	 ** 아래의 데이터는 고정값입니다.( 변경하지 마세요 )
	 * TXTYPE       : ITEMSEND
	 * SERVICE		: UAS
	 * AUTHTYPE		: 36
	 ******************************************************/
	TransR.set( "TXTYPE", "ITEMSEND" )
	TransR.set( "SERVICE", "UAS" )
	TransR.set( "AUTHTYPE", "36" )

	/******************************************************
	 * CPID 	 : 다날에서 제공해 드린 ID( function 파일 참조 )
	 * CPPWD	 : 다날에서 제공해 드린 PWD( function 파일 참조 )
	 * TARGETURL : 인증 완료 시 이동 할 페이지의 FULL URL
	 * CPTITLE   : 가맹점의 대표 URL 혹은 APP 이름 
	 ******************************************************/
	TransR.set( "CPID", ID )
	TransR.set( "CPPWD", PWD )
	TransR.set( "TARGETURL", serverAddr + "/CPCGI" )
	TransR.set( "CPTITLE", "www.danal.co.kr" )

	/***[ 선택 사항 ]**************************************/
	/******************************************************
	 * USERID       : 사용자 ID
	 * ORDERID      : CP 주문번호	 
	 * AGELIMIT		: 서비스 사용 제한 나이 설정( 가맹점 필요 시 사용 )
	 ******************************************************/
	TransR.set( "USERID", "USERID" )
	TransR.set( "ORDERID", ORDERID )
	// TransR.set( "AGELIMIT", "019" )

	/********************************************************************************
	 *
	 * [ CPCGI에 HTTP POST로 전달되는 데이터 ] **************************************
	 *
	 ********************************************************************************/
	 
	/***[ 필수 데이터 ]************************************/
	const ByPassValue = new Map()

	/******************************************************
	 * BgColor      : 인증 페이지 Background Color 설정
	 * BackURL      : 에러 발생 및 취소 시 이동 할 페이지의 FULL URL
	 * IsCharSet	: charset 지정( EUC-KR:deault, UTF-8 )
	 ******************************************************/
	ByPassValue.set( "BgColor", "00" )
	ByPassValue.set( "BackURL", serverAddr + "/BackURL" )
	ByPassValue.set( "IsCharSet", CHARSET )

	/***[ 선택 사항 ]**************************************/
	/******************************************************
	 ** CPCGI에 POST DATA로 전달 됩니다.
	 **
	 ******************************************************/
	ByPassValue.set( "ByBuffer", "This value bypass to CPCGI Page")
	ByPassValue.set( "ByAnyName", "AnyValue" )

	return CallTrans( TransR )
		.then( res => {
			if( res.get("RETURNCODE") == "0000" ) {

	/******************************************************
	 *
	 * 가맹점 인증 후 TID 전송,
	 * 본인인증 창 응답
	 * 
	 ******************************************************/								
				resform = '<form name="Ready" action="https://wauth.teledit.com/Danal/WebAuth/Web/Start.php" method="post">\n'
					+ MakeFormInput(res,["RETURNCODE","RETURNMSG"])
					+ MakeFormInput(ByPassValue, null)
					+ '</form>'
					+ '<script>'
					+ 'document.Ready.submit()'
					+ '</script>'
				return resform
				
			} else {
				/**************************************************************************
				 *
				 * 인증 실패에 대한 작업
				 *
				 **************************************************************************/
				
				retstr = ''
					+'<center>'
					+'인증 서비스 에러'
					+'<br>'
					+'에러코드 : ' + res.get("RETURNCODE")
					+'<br>'
					+'에러메시지 : ' + res.get("RETURNMSG")
					+'</center>'
				
				return retstr
			}
		})
}