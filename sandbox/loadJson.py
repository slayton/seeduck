#!/usr/bin/python
import os, re, sys, json, util
from pprint import pprint

inputFile = 'tag_filter'
f = open(inputFile, 'r')
d = json.load(f)

d = util.jsonToUtf8(d)

# newD = dict()
# for key in d:
	
# 	newKey = key.encode('utf8')
# 	newVals = []

# 	for val in d[key]:
# 		newVals.append(val.encode('utf8'))

# 	newD[newKey] = newVals

print d

#d = [s.encode('utf-8') for s in d]



