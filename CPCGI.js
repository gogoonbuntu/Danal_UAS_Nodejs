exports.CPCGIFunction = async (req)=> {
	const { CallTrans, data2str, ID, PWD, ORDERID, MakeFormInput, MakeFormInputHTTP, Debug } = require("./inc/function")
	
	const TransR = new Map()
	const TID = req["TID"]
	/*
	 * - CONFIRMOPTION
	 *		0 : NONE( default )
	 *		1 : CPID 및 ORDERID 체크
	 * - IDENOPTION
	 * 0 : 생년월일(6자리) 및 성별 IDEN 필드로 Return (ex : 1401011)
	 * 1 : 생년월일(8자리) 및 성별 별개 필드로 Return (연동 매뉴얼 참조. ex : DOB=20140101&SEX=1)
	 */
	let nConfirmOption = 0
	let nIdenOption = 0
	
	TransR.set( "TXTYPE", "CONFIRM" )
	TransR.set( "TID", TID )
	TransR.set( "CONFIRMOPTION", nConfirmOption )
	TransR.set( "IDENOPTION", nIdenOption )

	/*
	 * nConfirmOption이 1이면 CPID, ORDERID 필수 전달
	 */
	if( nConfirmOption == 1 )
	{
		TransR.set( "CPID", ID )
		TransR.set( "ORDERID", ORDERID )
	}

	return CallTrans( TransR )
		.then( res => {

	/******************************************************
	 ** true일경우 웹브라우져에 debugging 메시지를 출력합니다.
	 ******************************************************/
			if( Debug )
			{
				console.log( "REQ[" + data2str(TransR) + "]<BR>" )
				console.log( "RES[" + data2str(res) + "]<BR>" )
			}

			if( res.get("RETURNCODE") == "0000" ){
				/**************************************************************************
				 *
				 * 인증성공에 대한 작업
				 *
				 **************************************************************************/
				const resform = '<form name="CPCGI" action="./Success" method="post">'
						+ MakeFormInputHTTP(req,"TID")
						+ MakeFormInput(res, ["RETURNCODE","RETURNMSG"] )
						+ '</form>'
						+ '<script>'
						+ 'document.CPCGI.submit()'
						+ '</script>'
				
				return resform
				
			} else{
				/**************************************************************************
				 *
				 * 인증 실패에 대한 작업
				 *
				 **************************************************************************/
				
				retstr = '<center>'
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

