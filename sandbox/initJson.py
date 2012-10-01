#!/usr/bin/python
import os, re, sys, json

outfile = 'tag_filter'
f = open(outfile, 'w');
t = {};
t['white'] = ['Breaking', 'Bad', 'Game', 'of','Thrones'];
t['black'] = ['720p', 'HDTV'];


json.dump(t, f)

