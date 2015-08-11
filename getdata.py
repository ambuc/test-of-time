import re
import json

data = open('data.txt').read()

def parseData(data):
	data = data.split('\n')
	desc = None
	img = None
	date = None

	if len(data) > 2:
		desc = data[2]
		desc = desc.split('dcterms:description "')[1]
		desc = desc.split('ampamp')[0]
		desc = desc.split('ampref')[0]
		desc = desc.split('{{')[0]
		desc = desc.split('"@')[0]
		desc = desc.split('ref name')[0]
		desc = re.sub('ampquot', '"', desc)
		desc = re.sub('ampndash', '-', desc)
		desc = re.sub('ampmdash', '--', desc)
		desc = re.sub('ampnbsp', '', desc)

		if 'lode:illustrate <' in data[-2]:
			img = data[-2].split('lode:illustrate <')[1]
			img = img.split('>;')[0]

		date = data[-1]
		date = date.split('lode:atTime "')[1]
		date = date.split('"')[0]
		bc = False
		if date[0] == '-':
			bc = True
			date = date[1:]
		date = date.split('-')[0]
		if bc:
			date = '-' + date

	desc = re.sub(r'\d\d\d\d', '----', desc)

	if (len(desc) >= 23):
		return {"event": desc, "img": img, "year": date}

data = data.split('\n\n')
data = map(parseData, data)

print 'var data = ' + json.dumps(data) + ';'


