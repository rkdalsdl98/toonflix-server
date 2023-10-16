# 💡 Topic !

매일 여러 플랫폼들의 웹툰을 소개받고 추천 하자!

# 개요  

1인 개발 프로젝트로 나만이 알고 있는 꿀잼 웹툰을 추천 서로에게 추천하자! 라는 취지에서 만들게된 웹툰 모음집 앱 입니다!  

웹툰을 앱에 로드하는 형식이 아닌, 웹툰을 제공하는 사이트로 이동하게 만들었습니다.  

# Crawling  

## 학습 용도로 사용되었으며 수익창출에 목적을 가지지 않습니다!  
<h3>네이버<h3>: 노마드 코더에서 학습용도로 제공하는 API데이터를 사용 했습니다.  
<h3>레진, 다음<h3>: python 코드를 기반으로 Selenium으로 Chrome Webdriver를 이용해 타켓 페이지가 로드되길 기다리고 BeautifulSoup로 메타 정보들을 수집하여 불러오고 있습니다.  

서버 로드와 동시에 데이터를 불러오며, 데이터베이스에 기록된 정보의 날짜를 대조하여 오늘 날짜의 데이터가 기록되어 있다면 크롤러를 실행하지 않고 기존의 데이터로 로드하는 방식으로 동작하고 있습니다.  

(수집된 정보들은 .csv 파일형식으로 저장되며 서버에서 파일을 불러와 읽은 이후 데이터를 가공하여 저장합니다.)  

# ERD

<img src='https://velog.velcdn.com/images/rkdalsdl98/post/c984f8b1-5059-4006-ad56-1444131c1921/image.png'>

# Stack

```bash
# 이미지 출처 - 점핏 https://www.jumpit.co.kr/
```

FrontEnd
<img src='https://cdn.jumpit.co.kr/images/stacks/flutter.png' width="50" height="50"> <img src='https://cdn.jumpit.co.kr/images/stacks/dart.png' width="50" height="50">

BackEnd
<img src='https://cdn.jumpit.co.kr/images/stacks/typescript.png' width="50" height="50"> <img src='https://cdn.jumpit.co.kr/images/stacks/TypeORM.png' width="50" height="50"> <img src='https://cdn.jumpit.co.kr/images/stacks/nestjs.png' width="50" height="50"> <img src='https://cdn.jumpit.co.kr/images/stacks/node.js.png' width="50" height="50"><img src='https://cdn.jumpit.co.kr/images/stacks/python.png' width="50" height="50">

Database
<img src='https://cdn.jumpit.co.kr/images/stacks/mysql.png' width="50" height="50">  

[APP 레포지토리로 이동하기](https://github.com/rkdalsdl98/toonflix)