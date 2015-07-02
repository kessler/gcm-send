#!/usr/bin/env node

var config = require('./config.js')
var request = require('hyperquest')
var templateGenerator = require('lodash-template')
var debug = require('debug')('gcm-send')

var template = templateGenerator(config.endpoint)

module.exports = function(title, message) {
	var url = template({
		title: encodeURIComponent(title),
		message: encodeURIComponent(message)
	})

	debug(url)
	
	return request(url)
}

if (require.main === module) {
	var argv = process.argv.slice(2)

	var title = argv[1] ? argv[0] : config.defaultTitle
	
	var message = argv[1] || argv[0]

	module.exports(title, message).on('error', function (e) { console.error(e) })
}
