import {JSDOM} from "jsdom"
import { bot } from "./bot.js"
import { data_request, login } from "./api.js"
import * as dotenv from 'dotenv'
dotenv.config()

function get_data(data) {
    // console.log(data);
    const { document } = (new JSDOM(data)).window;

    const items = [...document.body.getElementsByClassName('item relative')]
 
    const scrapedData = []

    items.forEach(item => {
      const link = item.querySelector('.title').firstElementChild.getAttribute('href')
      const title = item.querySelector('.title').firstElementChild.getAttribute('title')
      const desc = item.querySelector('.desc').textContent
      const categories = [...item.querySelector('.labels').getElementsByTagName('a')].map(a => a.textContent.trim())
      const budget = item.querySelector('span[symbol=ریال]').getAttribute("amount").trim()
      const details = [...item.querySelector('.left').getElementsByTagName('div')].map(i => i.textContent.trim())

      scrapedData.push({
        link: link,
        title: title,
        desc: desc,
        categories:categories,
        budget: budget,
        details: details
      })
    });


    return scrapedData
}

function send_data(data) {
  const text = `<a href="${data.link}">${data.title}</a>\n
    <strong>مبلغ:</strong> ${parseInt (data.budget).toLocaleString() } \n
    <strong>توضیحات:</strong> ${data.desc} \n
    <strong>دسته بندی:</strong> ${data.categories} \n
    ${data.details[0]}
  `

  bot.sendMessage(process.env.CHAT_ID, text , {parse_mode: "HTML", disable_web_page_preview: true})
}

(async() => {
  const username = process.env.USER_NAME
  const password =  process.env.PASSWORD

  const cookie = await login(username, password)

  setInterval(async () => {
    const data = await data_request(cookie)

    const d = get_data(data)
    
    d.slice(0,10).reverse().forEach(i => {
      send_data(i)
    })
  }, 2 * 60 * 60 * 1000)
  
})()