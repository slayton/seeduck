from flask import Flask, render_template, url_for, request, Response, jsonify
from functools import wraps
import os, re
import util
import posterloader as PL


app = Flask(__name__)

BASE_DIR = 'static/downloads'

def check_auth(username, password):
	"""This function is called to check if a username /
	password combination is valid.
	"""
	return username == 'admin' and password == 'letmeinalready'

def authenticate():
	"""Sends a 401 response that enables basic auth"""
	return Response(
	'Could not verify your access level for that URL.\n'
	'You have to login with proper credentials', 401,
	{'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		auth = request.authorization
		if not auth or not check_auth(auth.username, auth.password):
			return authenticate()
		return f(*args, **kwargs)
	return decorated


@app.route('/')
def index():
	return "hello";

@app.route('/player/')
@requires_auth
def viewPlayerNoArg():
	fileInfo = util.listFilesInDirectory(BASE_DIR);
	return render_template('player.html', fileData = zip( fileInfo[0], fileInfo[1], fileInfo[2], fileInfo[3]))

@app.route('/player/<filename>')
@requires_auth
def viewPlayer(filename):
	fileInfo = util.listFilesInDirectory(BASE_DIR);
	try:
		idx = fileInfo[0].index(filename)
	except ValueError:
		idx = -1;
	if not idx == -1:
		return render_template('player.html', fileData = zip( fileInfo[0], fileInfo[1], fileInfo[2], fileInfo[3]), videoPath=fileInfo[1][idx])
	else:
		return render_template('player.html', fileData = zip( fileInfo[0], fileInfo[1], fileInfo[2], fileInfo[3]), videoPath=' ')		


@app.route('/library')
@requires_auth
def viewLibrary():
	# for f in fileInfo[0]:
	# 	PL.getPosterForName(f)
	fileInfo = util.listFilesInDirectory(BASE_DIR);
	return render_template('library.html', fileData = zip( fileInfo[0], fileInfo[1], fileInfo[2], fileInfo[3]))


@app.route('/list')
def list():
	files = util.listFilesInDirectory(BASE_DIR);
	str = ''
	for f in files:
		str = str + f + '<br>'

	return str

@app.route('/poster/<episodeName>')
def getPosterImage(episodeName):

	imgPath = PL.getPosterFileForName(episodeName);
	return jsonify(url=imgPath);
	# return imgPath

