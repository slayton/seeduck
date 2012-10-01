#!/usr/bin/python
import os, re, sys, json, util
from pprint import pprint

def listContentsOfPath(contentPath, ext=[]):
	fileList = []
	for contentPath, dirs, files in os.walk(contentPath):
		for fn in files:
			if not ext:
				fileList.append(fn)
			else:
				parts = fn.split('.')
				if parts[-1] in ext:
					fileList.append(fn)
		
	return fileList

def breakUpWords(word):
	word = re.sub('[sS][0-9][0-9][eE][0-9][0-9]', ' ', word)
	word = re.sub( '[,.-]', ' ', word)
	words =  word.split(' ')
	return words

# drop non unique values, remove any empy values, and return a sorted list
def cleanUpWordList(words):
	words = set(words);
	if '' in words:
		words.remove('')
	words = list(words)
	words.sort()
	return words

def filterWords(words, whitelist, blacklist):
	
	graylist = []
	for w in words:
		w = w.lower()
		if not w in whitelist and not w in blacklist:
			graylist.append(w)
			
	return graylist
	
def loadFilters(filterFile):
	tagFilter = util.readJsonFile( filterFile )
	return tagFilter

def main():
	## Get inputs
	fileTypes  = ['mkv', 'm4v', 'mp4']
	contentPath = os.getcwd()
	filterFile = 'tag_filter'

	if len(sys.argv)>1:
		contentPath = sys.argv[1]

	if len(sys.argv)>2:
		filterFile = sys.argv[2]


	## List directory contents and split file names into individual tags
	fileList = listContentsOfPath(contentPath, fileTypes)
	## convert the file list to a word list
	wordList = []
	for f in fileList:
		wordList.append( breakUpWords(f))
	words = [item for sublist in wordList for item in sublist]

	# remove duplicates, and empty words, then sort
	words = cleanUpWordList(words)

	# load the filters
	tagFilter = loadFilters(filterFile)
	blacklist = [x.lower() for x in tagFilter['black']]
	whitelist = [x.lower() for x in tagFilter['white']]
	grayList = filterWords(words, whitelist, blacklist)

	print "\nWORDS NOT IN WHITE OR BLACK LIST\n--------------------------------\n", grayList

if __name__ == "__main__":
	main()
