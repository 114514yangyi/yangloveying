# Time: 2021/08/15 15:00
import pyperclip



img=input("img:")
year=input("year:")
time=input("time:")
title=input("title:")
content=input("content:")


  
img = content["img"]
year = content["year"]
time = content["time"]
title = content["title"]
content = content["content"]

output = ('<div class="mk-tl-item">'
      '<div class="mk-tl-event">'
      '<div class="mk-tl-dot">'
      f'<img src="{img}" />'
      '</div>'
      '</div>'
      '<div class="mk-tl-date">'
      f'<span class="mk-tl-year">{year}</span>'
      f'<span class="mk-tl-month">{time}</span>'
      '</div>'
      '<div class="mk-tl-content">'
      f'<div class="mk-tl-title">{title}</div>'
      '</div>'
      '</div>'
      '</div>')

pyperclip.copy(output)
#将output写入裁剪板

