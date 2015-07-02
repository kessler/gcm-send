var rc = require('rc')

module.exports = rc('gcm-send', {
	endpoint: 'http://yourgcmbridgeserver.com/api/send?h=yourhandle&m=${ message }&t=${ title }',
	defaultTitle: 'gcm-send says:'
})