from site import USER_BASE
from bs4 import BeautifulSoup
import requests
import json
import Bot
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

data = {
    'username': os.environ.get('USERNAME'),
    'password': os.environ.get('PASSWORD'),
    '_token': os.environ.get('TOKEN')
}

def login():
    return requests.post('https://ponisha.ir/login',data)

def get_response(url):
    
    try:
        response = requests.get(url,timeout=3,cookies=cookies)
        response.raise_for_status()
        print ('requsts page ' + str(i) + ' succesfully!')
        return response
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
    except requests.exceptions.RequestException as err:
        print ("OOps: Something Else",err)

def get_data(html):
    data = []
    parsed_html = BeautifulSoup(html,features='html.parser')

    for i in range(9):
        detail = parsed_html.body.find_all('li',attrs={'class': 'item relative'})[i].findChildren('div',attrs={'class': 'detail'})[0]
        title = detail.findChildren('div',attrs={'class':'title'})[0].a['title']
        href = detail.findChildren('div',attrs={'class':'title'})[0].a['href']
        desc = detail.findChildren('div',attrs={'class':'desc hidden-xs height-50px'})[0].text
        more = ''
        
        data.append({
            'title': title,
            'href': href,
            'desc': desc
        })

    return data


if __name__ == '__main__':
    cookies = login().cookies
    total_pages = 10
    for i in range(total_pages):
        url = 'https://ponisha.ir/search/projects/my-skills'

        if (i != 0):
            url += str(i)

        response = get_response(url)

        data = get_data(response.text)

        # write in file
        # f = open("data.json", "w", encoding='utf8')
        # json.dump({'data': data}, f,ensure_ascii=False)
        # f.close()

        # telegram bot
        Bot.bot(data)
        