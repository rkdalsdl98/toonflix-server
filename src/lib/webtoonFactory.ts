import { WebtoonDto } from "src/webtoon/dto/webtoon.dto";
import { ToonFlixWebtoonDto } from "src/webtoon/dto/toonflixWebtoon.dto";
import axios from "axios";
import { WebtoonDetailDto } from "src/webtoon/dto/webtoonDetail.dto";
import { WebtoonService } from "src/webtoon/webtoon.service";

require('dotenv').config()
const BASE_URL : string = process.env.BASEURL

export async function mergeWebtoonDetailData(webtoon: WebtoonDto, webtoonService: WebtoonService) : Promise<void> 
export async function mergeWebtoonDetailData(webtoon: WebtoonDto) : Promise<ToonFlixWebtoonDto> 

export async function mergeWebtoonDetailData(webtoon: WebtoonDto, webtoonService?: WebtoonService) : Promise<void | ToonFlixWebtoonDto> {
    try {
        const requestDetail = await axios.get(`${BASE_URL}${webtoon.webtoon_id}`)
        const detailData = requestDetail.data

        const webtoonDetail : WebtoonDetailDto = {
            about: detailData.about,
            genre: detailData.genre,
            age: detailData.age
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