// 도메인, http 설정 : Nginx 사용

// nvm 노드 버전 매니저
// nodejs 설치하고 다른 버전으로 설치할 때 삭제하고 다시 설치할 필요 없이 버전 관리가 편하다
// 원하는 버전을 설치받고 바로 스위치 가능

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash 

// 소스 파일 적용
// source ~/.bashrc

// 전체 목록 확인
// nvm list-remote

// 원하는 버전을 선택하고 설치
// nvm install (버전 숫자)

// 인스턴스의 v4 주소는 우리가 인스턴스를 실행하거나 다시 실행하면 동적으로 할당되는 ip 주소.
// 도메인을 그냥 연결하면 주소가 변경 되었을 때 연결이 끊기게 된다.
// 그래서 ip 설정을 탄력적으로 하면 고정 아이피 할당이 가능하다.
// aws에서 네트워크 및 보안 탭의 탄력적 IP에서 IP 할당이 가능하다.

// Nginx를 사용해서 프록시 설정
// 프록시는 통신할 때 중간에서 대신 통신을 해주는 역할. 클라이언트와 서버 사이의 중계 서버 역할
// 클라이언트는 프록시 서버를 서버로 판단하고 서버는 프록시 서버를 클라이언트로 판단한다.

// 서버의 위치에 따라 포워드 프록시와 리버스 프록시로 구분된다.

// 리버스 프록시 : 프록시 서버가 서버의 앞에 위치하고 클라이언트가 서버에 요청하면 리버스 프록시가 호출되고
// 리버스 프록시는 서버에게 요청해서 응답을 받고 클라이언트에게 전송
// 서버를 감출 수 있어 보안에 좋다.
// 클라이언트 -> 인터넷 -> 프록시 서버 -> 서버
// 서버 -> 프록시 서버 -> 인터넷 -> 클라이언트
// Nginx를 사용해 리버스 프록시 생성.

// aws 인스턴스 접속 후 nginx 설치
// sudo apt install nginx

// nginx 시작
// sudo service nginx start

// nginx 상태 확인
// sudo service nginx status

// nginx 종료
// sudo service nginx stop

// 웹 사이트 호스팅을 할 때 설정에 대한 값이 default 파일에 생성
// cd /etc/nginx/sites-enabled
// default 파일은 가상 호스트 설정 파일

// 설정 파일 수정

// 예 )
// location / {
//     # First attempt to serve request as file, then
//     # as directory, then fall back to displaying a 404.
//     # try_files $uri $uri/ =404;

//     proxy_set_header HOST $host;
//     proxy_pass http://127.0.0.1:8080;
//     proxy_redirect off;
// }

// proxy_set_header 부분은 요청이 들어온 브라우저의 host 내용을 넘겨준다는 뜻
// proxy_pass 80으로 포트를 듣고 들어온 요청을 8080 포트로 전달하겠다는 뜻
// proxy_redirect off는 SPA일 경우 redirect를 없애겠다는 의미 SPA가 아니면 굳이 써줄 필요는 없다.
// SPA 싱글페이지 어플리케이션 react vue 등

// 설정파일 수정 후 정상적인지 확인
// 문법 오류 체크 : sudo nginx -t

// nginx 재시작 : 설정 완료 후 재시작 필요
// sudo service nginx restart

// 가비아에서 도메인 구매해서 사용
// www.gabia.com

// 가비아에서 구매한 도메인을 이용하여 탄력적 IP로 요청이 가도록 작업

// AWS Route 53 사용 -> 호스팅 영역 클릭 -> 호스팅 영역 생성, 구매한 도메인 사용

// 상세 내용 중 레코드 : 도메인의 이름과 관련된 정보를 나타내는 데이터
// NS(네임 서버) : 인터넷에서 도메인을 ip주소로 변환하는 역할
// 도메인을 입력하면 네임서버에게 도메인 ip 주소를 요청한다.
// 이를 통해 웹사이트 접근을 돕는다.

// 레코드 추가
// A 레코드 : 도메인 이름을 v4 주소로 매핑
// A 레코드에 탄력적 IP를 값으로 작성

// CNAME 레코드 : 서브 도메인으로 설정
// 설정한 이름으로 접속했을 때 원래 도메인으로 접속할 수 있도록 해준다.

// https로 보안 이슈 해결
// 검증된 사이트라는 것을 의미
// https 요청할 때 인증서를 발급받아서 인증을 요청
// 배포한 서버에 https를 설정해서 보안 이슈 해결
// 모질라 : 인증서 발급 사이트. 3개월에 한번씩 발급 갱신
// certbot을 사용해 https 간편 설정 가능. 재발급을 직접 받을 필요 없이 자동으로 진행 후 우리에게 내용만 알려줌
// nginx와 호환 좋음

// https://certbot.eff.org/

// 설치 명령어
// sudo snap install core : 설치
// sudo snap refresh core : 설치 후 리프레시
// sudo snap install --classic certbot : certbot 설치

// certbot 실행 파일에 링크 설정
// sudo ln -s /snap/bin/certbot/user/bin/certbot

// nginx 관련 certbot 실행
// sudo certbot --nginx

// nginx에 default 파일 수정
// cd /etc/nginx/sites-enabled/로 이동 후
// sudo vi default 파일 확인
// 들어가서 server_name 부분에 생성한 도메인으로 변경 후 저장, 종료
// 완료되면 nginx 재시작

// 보안 관련하여 자동 갱신 명령어 : sudo certbot renew
// 재발급 이상 없는지 확인 : sudo certbot renew --dry-run