// This express app will serve the production build folder inside the client

const express = require('express');
const path = require("path");

const app = express();

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    const build_path = path.resolve(__dirname, 'client', 'build', 'index.html');
    return res.sendFile(build_path);
})

const PORT = 5001;

app.listen(PORT, ()=> console.log(`Server listening on PORT ${PORT}`));
