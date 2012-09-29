import os, re, json
from filenamefilter import FileNameFilter as FNF
from pymediainfo import MediaInfo

def listFilesInDirectory(path):
	
	fnf = FNF('static/tag_filter');
	fTypeFilt = readJsonFile('static/filetype_filter');
	fTypeFilt = fTypeFilt['ext']

	fileNames = []
	filePaths = []
	audioCodecs = []
	videoCodecs = []

	for path,dirs,files in os.walk(path):
		for fn in files:
			if getFileExtension(fn) in fTypeFilt:
				
				f = fnf.filterStringRE(fn) # filter out un wanted tags
				f = re.sub('[.]', ' ', f, f.count('.')-1) #replace all but last . with ' '
				fileNames.append(f)
				
				filePaths.append(os.path.join(path,fn))
				
				c = getMediaInfoForFile( os.path.join(path, fn) )
				audioCodecs.append(c['audio'])
				videoCodecs.append(c['video'])
	
	info = []
	
	info.append(fileNames)
	info.append(filePaths)
	info.append(audioCodecs)
	info.append(videoCodecs)

	return info 

def listVideosInDirectory(path):
	print 'listing videos in directory'

# remove file extensions, convert periods to ' ' and remove release names  ie we want to produce a name that is as clean as possible
def cleanVideoFileName(files):
	print 'processing video names'

def getFileExtension(file):
	parts = file.split('.')
	return parts[-1]	

def getStringsToRemove():
	releaseNameFile = open('static/release_names.conf')
	names = [i for i in fileName.readlines()]
	print names

def readJsonFile(f):
	return jsonToUtf8( json.load( open(f, 'r') ) )

def jsonToUtf8(d):
	D = dict()
	for key in d:
		
		newKey = key.encode('utf8')
		newVals = []

		for val in d[key]:
			newVals.append(val.encode('utf8'))

		D[newKey] = newVals

	return D

def getMediaInfoForFile(file):
	media_info = MediaInfo.parse(file)
	vc = ''
	ac = ''
	for track in media_info.tracks:
		 if track.track_type == 'Video':
		 	vc = track.codec
		 if track.track_type == 'Audio':
		 	ac = track.codec
	c = {}
	
	c['audio'] = ac;
	c['video'] = vc;

	return c







