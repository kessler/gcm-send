#!/usr/bin/env node

var config = require('./config.js')
var request = require('hyperquest')
var templateGenerator = require('lodash-template')
var debug = require('debug')('gcm-send')

var template = templateGenerator(config.endpoint)

module.exports.send = function(title, message) {
	var url = template({
		title: encodeURIComponent(title),
		message: encodeURIComponent(message)
	})

	debug(url)
	
	return request(url)
}

if (require.main === module) {
	var argv = process.argv.slice(2)

	var command = argv[0]

	if (command !== 'send') {
		console.error('missing a command, try use the cli like so:')
		console.error('gcm-send [command] <message|title> <message>')
		process.exit(1)
	}

	var title = argv[2] ? argv[1] : config.defaultTitle
	
	var message = argv[2] || argv[1]

	module.exports.send(title, message).on('error', function (e) { console.error(e) })
}
