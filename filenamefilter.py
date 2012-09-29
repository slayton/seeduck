import os, re, sys, json, util

class FileNameFilter:

	_whitelist = []
	_blacklist = []
	_filterType = 0
	_excludePattern =''

	def __init__(self, filterFile = 'tag_filter', _filterType = 0):
		self._setFilterFile(filterFile)
		self._filterType = _filterType

	def _setFilterFile(self, filterFile):
		self.jsonFile = filterFile
		filters = util.readJsonFile(self.jsonFile)
		# convert the filter lists to lowercase tp 
		self._whitelist = [x.lower() for x in filters['white']]
		self._blacklist = [x.lower() for x in filters['black']]

		self._createExclusionPattern()

	def _createExclusionPattern(self):
		self._excludePattern = '|' . join(self._blacklist)

	def filterString(self, str):
		str = re.sub( '[, -]', '.', str)
		chunks = str.split('.')
		str = ''
		for c in chunks:
			cL = c;
			if not cL.lower() in self._blacklist:
				if len(str)>0:
					str = str + "." +  c;
				else:
					str = c;

		return str		

	def filterStringRE(self, str):
		str = re.sub( '[, -]', '.', str)
		str = re.sub(self._excludePattern, '', str, flags=re.IGNORECASE)
		str = re.sub( '[.]+', '.', str)
		return str










