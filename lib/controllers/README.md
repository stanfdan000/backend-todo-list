# Controllers

This folder will hold all your app's route handlers (aka `controllers`). Use controllers to define the app routes you want to use for a given resource. Controllers are responsible for taking a request and routing it to the appropriate place, whether that be a model, service, or some other utility. Controllers are also responsible for sending responses back to the client once we're done with their request.  A general convention with controllers is that their filenames are lowercase and plural (e.g `users.js`).


> backend-express-template@1.0.0 setup-db
> node -r dotenv/config setup-db.js
error: no pg_hba.conf entry for host "44.197.213.134", user "betxxoufuhxxip", database "d96jfg7dad1mc9", no encryption
    at Parser.parseErrorMessage (/app/node_modules/pg-protocol/dist/parser.js:287:98)
    at Parser.handlePacket (/app/node_modules/pg-protocol/dist/parser.js:126:29)
    at Parser.parse (/app/node_modules/pg-protocol/dist/parser.js:39:38)
    at Socket.<anonymous> (/app/node_modules/pg-protocol/dist/index.js:11:42)
    at Socket.emit (node:events:513:28)
    at addChunk (node:internal/streams/readable:315:12)
    at readableAddChunk (node:internal/streams/readable:289:9)
    at Socket.Readable.push (node:internal/streams/readable:228:10)
    at TCP.onStreamRead (node:internal/stream_base_commons:190:23) {
  length: 174,
  severity: 'FATAL',
  code: '28000',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'auth.c',
  line: '545',
  routine: 'ClientAuthentication'
}
:x: Error: no pg_hba.conf entry for host "44.197.213.134", user "betxxoufuhxxip", database "d96jfg7dad1mc9", no encryption











Message daniel stanford



