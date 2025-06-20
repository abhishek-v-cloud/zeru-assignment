# EigenLayer Restaking Info API

## Overview

This project provides a **REST API** that aggregates and exposes restaking data on the **EigenLayer** protocol.

### Features:
-  User Restaking Information  
-  Validator Metadata  
-  Reward Insights  

Built using **Node.js**, **Express**, and **SQLite3**, it supports fast local querying data.



## Project Structure

<pre> ```bash eigenlayer-restaking-api/ ├── config/ # DB connection and config loader ├── controllers/ # Handles logic for each endpoint ├── routes/ # API routes for Express ├── scripts/ # fetchData script with mock or real data ├── utils/ # Table creation and helpers ├── eigenlayer.db # SQLite database ├── server.js # Main server file └── README.md # This file ``` </pre>


## ⚙️ Setup Instructions

### Requirements
- Node.js v22  
- npm (comes with Node.js)

### Steps

#### 1. Install dependencies

```bash
npm install
node server.js


API Endpoints
1. GET /restakers
Returns list of users who restaked.

json
[
    {
        "userAddress":"0xUser111",
        "amountRestakedStETH":120.5,
        "targetAVSOperatorAddress":"0xOpA1"
    },
    {
        "userAddress":"0xUser222",
        "amountRestakedStETH":80.75,
        "targetAVSOperatorAddress":"0xOpA2"
    }
]

2. GET /validators
Returns validator info + slash history.

json
[
    {
        "operatorAddress":"0xOpA1",
        "totalDelegatedStakeStETH":5000.25,
        "slashHistory":[
            {
                "timestamp":1678886400,
                "amountStETH":30,
                "reason":"Missed uptime"
                }
        ],
        "status":"active"
    },
    {
        "operatorAddress":"0xOpA2",
        "totalDelegatedStakeStETH":3200,
        "slashHistory":[],
        "status":"jailed"
    }
]

3. GET /rewards/:address
Returns rewards for a wallet address.

json
{
  "walletAddress":"0xUser111",
  "totalRewardsReceivedStETH":45.2,
  "rewardsBreakdown": [
    {
      "operatorAddress":"0xOpA1",
      "amountStETH":30.2,
      "timestamps":[1678972800]
    },
    {
      "operatorAddress":"0xOpA2",
      "amountStETH":15,
      "timestamps":[1679059200]
    }
  ]
}
