import re
import csv
import json
import os 


languages = ["Chinese", "Japanese", "Korean", "Vietnamese", "Russian", "Mexican", "African","Indian"]
#languages = ["African"]


for lang in languages:
	with open("../Seattle/geoprocessing/points/geojson/{0}pts.geojson".format(lang) , "rb+") as g:
		points = json.load(g)
	
		latlon = []
		
		for i in points["features"] :
			lon = i["geometry"]["coordinates"][0]
			lat = i["geometry"]["coordinates"][1]
			coordinates = [lat,lon]
			latlon += [coordinates]
		print lang
	
	with open('../Seattle/arrays/{0}array.js'.format(lang) , 'w') as f:
		f.write("heat{0}= ".format(lang) )
		f.write(repr(latlon))
		f.write(";")
#	with open('arrays/{0}array.js'.format(lang) ) as f:
#		list2 = eval(f.read())