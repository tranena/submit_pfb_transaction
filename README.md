# submit_pfb_transaction

You can use this project to submit the celestia pfb transaction.

![Alt text](Screenshot_20230507_213119.png)
![Alt text](Screenshot_20230507_213144.png)

## at first, make sure to run a [celestia light node](https://docs.celestia.org/nodes/light-node/) with port 26659.

## install nvm

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

## install npm 

`nvm install --lts`

## install packages

```
npm install child_process
npm install express
```

## how to run

```
cd submit_pfb_transaction
node main.js
```

visit [localhost:3000](localhost:3000) in browser.

