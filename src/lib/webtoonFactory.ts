import { WebtoonDto } from "src/webtoon/dto/webtoon.dto";
import { ToonFlixWebtoonDto } from "src/webtoon/dto/toonflixWebtoon.dto";
import axios from "axios";
import { WebtoonDetailDto } from "src/webtoon/dto/webtoonDetail.dto";
import { WebtoonService } from "src/webtoon/webtoon.service";

import * as fs from 'fs'

require('dotenv').config()

const BASE_URL : string = process.env.BASEURL
const ABSOLUTE_PATH : string = process.env.ABSOLUTE_PATH

export async function mergeWebtoonDetailData(webtoon: WebtoonDto, webtoonService: WebtoonService) : Promise<void> 
export async function mergeWebtoonDetailData(webtoon: WebtoonDto) : Promise<ToonFlixWebtoonDto>

export async function mergeWebtoonDetailData(webtoon: WebtoonDto, webtoonService?: WebtoonService) : Promise<void | ToonFlixWebtoonDto> {
    try {
        const requestDetail = await axios.get(`${BASE_URL}${webtoon.webtoon_id}`)
        const detailData = requestDetail.data

        const webtoonDetail : WebtoonDetailDto = {
            genre: detailData.genre,
        }

        const toonflixWebtoon : ToonFlixWebtoonDto = {
            ...webtoon,
            ...webtoonDetail
        }
        
        if(webtoonService) await webtoonService.insertOrUpdateWebtoon(toonflixWebtoon)
        else return toonflixWebtoon
    } catch(e) {
        throw new Error(e)
    }
}

export async function initLezhinWebtoons(webtoonService: WebtoonService) : Promise<void>
export async function initLezhinWebtoons(webtoonService?: WebtoonService) : Promise<void | ToonFlixWebtoonDto[]> {
    return new Promise<void | ToonFlixWebtoonDto[]>(async (resolve, reject) => {
        try {
            const today : Date = new Date()
            const day : number = today.getDay()
            const toonflixWebtoons : ToonFlixWebtoonDto[] = [];
            
            readCsvFile('lezhin')
            .forEach(webtoon => {
                const [webtoonId, title, genre, thumb] = webtoon.split(',')
                if(webtoonId !== 'noway') {
                    const fromToonFlixDto : ToonFlixWebtoonDto = {
                        title,
                        genre,
                        thumb,
                        webtoon_id: webtoonId,
                        day,
                        company: 'lezhin'
                    }
                    toonflixWebtoons.push(fromToonFlixDto)
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