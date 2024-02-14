import sys
arguments=sys.argv
year=arguments[1]
time=arguments[2]
title=arguments[3]
content=arguments[4]
img=arguments[5]



print('<div class="mk-tl-item">'
      '<div class="mk-tl-event">'
      '<div class="mk-tl-dot">'
      f'<img src="{img}" />'
      '</div>'
      '<div class="mk-tl-date">'
      f'<span class="mk-tl-year">{year}</span>'
      f'<span class="mk-tl-month">{time}</span>'
      '</div>'
      '<div class="mk-tl-content">'
      f'<div class="mk-tl-title">{title}</div>'
      '<p>'
      f'{content}'
      '</p>'
      '</div>'
      '</div>'
      '</div>')