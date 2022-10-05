# 다날 본인인증 NodeJS 연동모듈 (22.10.04)

Django version 2.2.4
Python version 3.7.4

## server.js 에서 JSON config 파일 경로 설정 해주세요!

---------------------------

# 기본 순서 : Ready - CPCGI
Ready : 가맹점 인증, 세션정보 생성

CPCGI : 구매자 신분 확인, 거래건 정보 확인, 거래 발생

## 연동시 변경해야할 사항:

appUAS / inc / conf_uas.json


가맹점 정보에 맞게 설정하시면 됩니다.

더 자세한 커스텀을 원하시면 inc 디렉터리 속 Ready, CPCGI, functions 위주로 봐주세요.

* 결과값으로 이름, 전화번호 등 개인정보를 받기 원하시면 영업 담당자에게 요청해주세요

문의는 CPID, TID, 거래일시 등과 함꼐 tech@danal.co.kr 로 문의주시면 빠르게 처리해드리겠습니다.
