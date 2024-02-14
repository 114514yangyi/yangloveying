import json
with open("/home/huyang/gift/begin/player/js/data.json","r") as fp:
    var=json.load(fp)
    
var["albums"].append(name)
var["trackNames"].append(message[0])
var["trackUrl"].append(download)
var["bk"].append(cover)