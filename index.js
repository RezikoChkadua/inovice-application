import app from './server/server'

app.listen(4000, () => {
    console.log('Listening on 4000');
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

