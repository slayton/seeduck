from flask import Flask, render_template, url_for
import os, re
import util


app = Flask(__name__)

BASE_DIR = 'static/downloads'
fileInfo = util.listFilesInDirectory(BASE_DIR);

@app.route('/')
def index():
	return "hello";

@app.route('/player')
def viewPlayer():
	#fileInfo = util.listFilesInDirectory(BASE_DIR);
	#for n, p, a, c in fileInfo:
	#	print p
	return render_template('player.html', fileData = zip( fileInfo[0], fileInfo[1], fileInfo[2], fileInfo[3]))

@app.route('/library')
def viewLibrary():
	return render_template('library.html', fileData = zip( fileInfo[0], fileInfo[1], fileInfo[2], fileInfo[3]))


@app.route('/list')
def list():
	files = util.listFilesInDirectory(BASE_DIR);
	str = ''
	for f in files:
		str = str + f + '<br>'

	return str

@app.route('/poster/<seriesName>')
def getPosterImage(seriesName):
	return util.getPosterForSeriesName(seriesName);



