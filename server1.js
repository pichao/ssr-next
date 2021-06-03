const express = require('express');
const app = express();
const port = 4000;

app.get('/api/search/shows', (req, res) => {
    res.json({
        t: 5,
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
