const Hapi = require('hapi');
var GoogleSpreadsheet = require('google-spreadsheet');


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

/*
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {

        var doc = new GoogleSpreadsheet('1mEtpA4f4bpTG20b_N1vEbl4SI4zHF_eJVopwGEQa6t4');
        var doc_rows;
        
        doc.getRows(1,{}, function(err,rows){
            
            if(rows){
                doc_rows=rows;
                console.log(rows);
                reply({ rows : doc_rows }).code(200)

            }
            else{
                console.log(err);
                reply().code(400)
            }
            
        });
    }
});
*/

var returnrows = function () {
    console.log("spreadsheets");
    var doc = new GoogleSpreadsheet('Add a publick google sheet id here');
    doc.getRows(1, {}, function (err, rows) {
        if (rows) {
            console.log(rows);
        } else {
            console.log(err)
        }
    });
}

var callback = function () {
    console.log("do something with rows");
}

server.register({
    register: require('hapi-cron-job'),
    options: {
        jobs: [{
            name: "Call api two times a day",
            enabled: true,
            immediate: false,
            schedule: "every 12 h",
            execute: returnrows,
            environments: ['development', 'staging']
        }],
        callback: callback
    }
}, (err) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});