const ServerFrame = require('./ServerFrame');

class ServerApp extends ServerFrame {
	async up () {
		this._serverName = 'Server app as service name "testApp"';

		this._app.use((req, res,  next) => {
			this._info(`Req ${req.url}`);
			next();
		});


		this._app.use('/fatal', (req, res) => {
			process.nextTick(function () {
				throw new Error;
			});
			// this code is unreachable
			res.send('We will crash\n')
		});

		this._app.use('/err', (req, res) => {
			console.error('Test error');
			this._err(`Test error`);
			res.status(200).json({message : 'Error in console'})
		});

		this._app.use('/', (req, res) => res.status(200).json({message : 'Hi Igor :)'}));
		await super.up();

		return true;
	}

	_info (mess) {
		console.log(`6 | [0;34m INFO [39m ${mess} `);
	}

	_err(mess) {
		console.error(new Error(` 3 | [0;31m ERR [39m ${mess} `));
	}
}

module.exports = ServerApp;
