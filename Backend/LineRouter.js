const express = require('express');
const port = 8080;

var app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/linerouter', (req, res) => {
    let playerData = req.body;
    console.log(`client connected: name=${playerData.name}, id=${playerData.id}, partner_id=${playerData.partner_id}`)
    res.send("hub:3232");
});

app.listen(port, () => console.log(`line router listening on port ${port}`));