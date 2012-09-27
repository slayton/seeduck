from flask import Flask, render_template, url_for
import os

app = Flask(__name__)

BASE_DIR = 'downloads/'

@app.route('/')
def index():
	return "hello";

@app.route('/stream')
def stream():
	fileInfo = listFilesInDirectory();
	return render_template('streamer.html', fileData= zip( fileInfo[0], fileInfo[1]))

@app.route('/list')
def list():
	files = listFilesInDirectory();
	str = ''
	for f in files:
		str = str + f + '<br>'

	return str

def listFilesInDirectory():
	
	nameList = [];
	pathList = [];
	for path,dirs,files in os.walk(BASE_DIR):
		for fn in files:
			nameList.append(fn);
			pathList.append(os.path.join(path,fn))

	info = []
	info.append(nameList)
	info.append(pathList)
	return info;
