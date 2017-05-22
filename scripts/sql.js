window.sql = {
    data: []
}


var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: process.env.HOME + '/Library/Messages/chat.db',
    }
});

window.sql.getMessages = function(done) {
    knex('message')
        .where('text', 'like', '%food%')
        .join('handle', 'handle.ROWID', 'message.handle_id')
        .asCallback(done);
}