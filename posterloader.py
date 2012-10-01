import os, re, json, urllib
from xml.dom.minidom import parse, parseString
from PIL import Image
import requests

APIKEY = 'A759044985ADC3E7';
BASE_URL ='http://thetvdb.com/'

SERIES_ID_URL = 'api/GetSeries.php?seriesname='
seriesName = 'Breaking Bad';

posterDir ='static/.posters/'


def _getIdForName(seriesName):
	getSeriesUrl = BASE_URL + 'api/GetSeries.php'
	res = requests.get( getSeriesUrl, 
		params={'seriesname': seriesName});

	dom = parseString(res.content);
	elements = dom.getElementsByTagName('seriesid')
	if len(elements)>0:
		data = elements[0].firstChild.data;
		id = data.encode('UTF8');
		return id	
	else:
		return -1


def _getPosterForId(id):
	getPosterUrl = BASE_URL + "api/" + APIKEY + "/series/" + str(id) + "/banners.xml" 
	res = requests.get(getPosterUrl);
	dom = parseString(res.content);
	elements = dom.getElementsByTagName('BannerType')
	posterUrl = ''

	for i in range(0, len(elements)-1):
		t = elements[i].firstChild.data.encode('utf8')
		if t == 'poster':
			sib = elements[i].previousSibling.previousSibling
			posterUrl = sib.firstChild.data.encode('utf8')
			break

	return BASE_URL + 'banners/' + posterUrl

def _downloadPosterForId(id, posterfile):
	pURL = _getPosterForId(id)
	print 'Saving ' + pURL + " to " + posterfile
	urllib.urlretrieve(pURL, posterfile)

def _nameFromString(s):
	s = re.sub('([ ][Ss][0-9][0-9][Ee][0-9][0-9][A-Za-z 1-9.]*)','', s)
	return s

def getPosterFileForName(name):
	name = _nameFromString(name).lower()
	posterFile = posterDir + re.sub(' ','_', name) + '.png'  #remove spaces from the name and add the png extension
	nullPoster = posterDir + "_noposter.png" 


	# if the poster file doesn't exist yet try to create it
	if not os.path.isfile(posterFile):
		
		id = _getIdForName(name)
		if id ==-1: # if no ID returned, then use the nullPoster
			posterFile = nullPoster;
		else:
			_downloadPosterForId(id, posterFile)
	
	# print 'Asking for:' + name + " returning: " + posterFile;
	return posterFile

	# 
	# if not id == -1:
	# 	posterfile = posterDir + id + '.png';
		
	# 	print 'Checking for ' + name + ' at ' + posterfile

	# 	if os.path.isfile(posterfile):
	# 		print 'Poster found, no need to download'
	# 		return posterfile
	# 	else:
	# 		print 'Poster not found, downloading it!'
			
	# 		_downloadPosterForId(id, posterfile)

	# 		if os.path.isfile(posterfile):
	# 			return posterfile
	# 		else:
	# 			return ''

	# else:
	


