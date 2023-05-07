const { exec } = require('child_process');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/', (req, res) => {

    const namespace_id = req.body.namespace_id;
    const msg = req.body.msg;

    const data = Buffer.from(msg, 'utf8').toString("hex");
    console.log(data);

    if (namespace_id && data) {
        const command = `curl --header "Content-Type: application/json" --request POST --data '{"namespace_id":"${namespace_id}","data":"${data}","gas_limit": 80000,"fee":2000}' http://127.0.0.1:26659/submit_pfb`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                const parsedOutput = JSON.parse(stdout);

                const { height, txhash, gas_wanted, gas_used } = parsedOutput;

                const result = {
                    height: height,
                    txhash: txhash,
                    gas_wanted: gas_wanted,
                    gas_used: gas_used,
                };
                console.log(result)
                res.status(200).send(JSON.stringify(result, null, 2))
            } catch (e) {
                res.status(500).json(`Namespace ID: ${namespace_id}\nData Hex: ${data}\n\n\n${stdout}`);
                console.log(e)
            }
        });
    } else {
        res.status(400).json({ message: 'Invalid request' });
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
