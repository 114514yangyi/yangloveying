import requests
from lxml import etree

url="https://www.gequbao.com/s"
question="/爱就一个字"
headers={"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0" }

response=requests.get(url=url+question,headers=headers)

content=response.text

tree=etree.HTML(content)
down_load=tree.xpath("/html/body/div[1]/div[2]/div/div[2]/div[2]/div[3]/a/@href")

new_url="https://www.gequbao.com"+down_load[0]

number=int(down_load[0][7:])


new_response=requests.get(url=new_url,headers=headers)

new_content=new_response.text

tree=etree.HTML(new_content)
message=tree.xpath("/html/body/div[1]/div[2]/div[1]/h1/span/text()")[0]
cover=tree.xpath("//div[@id='aplayer']/img/@src")[0]


info=message.split(" - ")

artist=info[1]

album=info[0]


url=f"https://www.gequbao.com/api/play_url?id={number}&json=1"
response=requests.get(url=url,headers=headers)

content=response.json()

download=content["data"]["url"]

import json
with open("/home/huyang/gift/begin/player/js/data.json","r") as fp:
    var=json.load(fp)
    
var["albums"].append(album)
var["trackNames"].append(message)
var["trackUrl"].append(download)
var["bk"].append(cover)

with open("/home/huyang/gift/begin/player/js/data.json","w") as fp:
    json.dump(var,fp)
