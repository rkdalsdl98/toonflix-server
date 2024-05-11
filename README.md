<h2>📚 STACKS</h2>
<div>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">  
</div>  
<div>  
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/typeorm-2D3748?style=for-the-badge">  
</div>   
<div>  
    <img src="https://img.shields.io/badge/selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white"> <img src="https://img.shields.io/badge/beautifulsoup-important?style=for-the-badge&logo=beautifulsoup&logoColor=white">   
</div>   

## 개요  

다양한 플랫폼의 웹툰을 하나의 앱에서 찾고, 매일 초기화 되는 평가로 잘 알려지지 않은 나만 알고 있던 꿀잼 웹툰을 추천 해보자!    

#### ** 웹툰을 불법복제 하지 않고 해당 웹툰 플랫폼으로 이동하는 방식입니다. **  

## Crawling  

## 학습 용도로 사용되었으며 수익창출에 목적을 가지지 않습니다!  

<h3>네이버</h3>  
  노마드 코더에서 학습용도로 제공하는 API데이터를 사용 했습니다.  
<h3>레진, 다음</h3>  
  python 코드를 기반으로 Selenium으로 Chrome Webdriver를 이용해 타켓 페이지가 로드되길 기다리고 BeautifulSoup로 메타 정보들을 수집하여 불러오고 있습니다.  

서버 로드와 동시에 데이터를 불러오며, 데이터베이스에 기록된 정보의 날짜를 대조하여 오늘 날짜의 데이터가 기록되어 있다면 크롤러를 실행하지 않고 기존의 데이터로 로드하는 방식으로 동작하고 있습니다.  

(수집된 정보들은 .csv 파일형식으로 저장되며 서버에서 파일을 불러와 읽은 이후 데이터를 가공하여 저장합니다.)  

### .bat 파일형식에 크롤러를 내부적으로 실행하는 코드  

```
async launchLezhinCrawler() : Promise<void> {
  return new Promise<void>((resolve, reject) => {
      exec(`${ABSOLUTE_PATH}start.bat`, async (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error.toString()}`);
              reject()
          }

          if (stderr) {
              console.error(`exec stderr: ${stderr.toString()}`);
              reject()
          }
          await initLezhinWebtoons(this)
          resolve()
      })
  })
}
```  
webtoonservice를 파라미터로 받게 되면 수집된 데이터를 서비스를 통해 바로 DB와 동기화 시키고, 그렇지 않다면 수집된 데이터를 반환하게 됩니다.  

```
export async function initLezhinWebtoons(webtoonService: WebtoonService) : Promise<void>
export async function initLezhinWebtoons(webtoonService?: WebtoonService) : Promise<void | ToonFlixWebtoonDto[]> {
    return new Promise<void | ToonFlixWebtoonDto[]>(async (resolve, reject) => {
        try {
            const today : Date = new Date()
            const day : number = today.getDay()
            const toonflixWebtoons : ToonFlixWebtoonDto[] = [];
            
            readCsvFile('lezhin')
            .forEach(webtoon => {
                const splitList = webtoon.split(',')
                if(splitList.length === 4) {
                    const [webtoon_id, title, genre, thumb] = splitList
                    if(webtoon_id !== 'noway') {
                        const fromToonFlixDto : ToonFlixWebtoonDto = {
                            title,
                            genre,
                            thumb,
                            webtoon_id,
                            day,
                            company: 'lezhin'
                        }
                        toonflixWebtoons.push(fromToonFlixDto)
                    }
                }
            })

            if(webtoonService) {
                await webtoonService.insertOrUpdateWebtoon(toonflixWebtoons)
                resolve()
            }
            else resolve(toonflixWebtoons)
        } catch (e) {
            console.log(e)
            reject()
        }
    })
}
```

.csv 파일을 읽어오는 과정에 맨앞단에 한 글자씩 불필요한 데이터가 포함되어 넘어오는 현상을 정규식으로 처리했습니다.

### 정규식 적용 코드  

```
function readCsvFile(filename : string) : string[] {
    try {
        const csv = fs.readFileSync(`${ABSOLUTE_PATH}toonflix-server/${filename}.csv`, 'utf-8')
        const csvToString : string = csv.toString().replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎ\.\,\r\n\/\:\?\!\_]/g, "")
        const csvToArray : string[] = csvToString.split(/\r|\n/).filter(item => item !== "")
        return csvToArray
    } catch(e) {
        throw new Error()
    }
}
```  

## ERD

<img src='https://velog.velcdn.com/images/rkdalsdl98/post/c984f8b1-5059-4006-ad56-1444131c1921/image.png'>  

[APP 레포지토리로 이동하기](https://github.com/rkdalsdl98/toonflix)