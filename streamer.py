from flask import Flask, render_template, url_for
import os, re
import util

app = Flask(__name__)

BASE_DIR = 'static/downloads'

@app.route('/')
def index():
	return "hello";

@app.route('/stream')
def stream():
	fileInfo = listFilesInDirectory();
	return render_template('streamer.html', fileData= zip( fileInfo[0], fileInfo[1]))

@app.route('/list')
def list():
	files = util.listFilesInDirectory(BASE_DIR);
	str = ''
	for f in files:
		str = str + f + '<br>'

	return str


