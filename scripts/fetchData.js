export const fetchAndStoreData = async (db) => {
  try {
    const now = Math.floor(Date.now() / 1000)
    const restakers = [
      {
        userAddress: '0xUser111',
        amountRestakedStETH: 120.5,
        targetAVSOperatorAddress: '0xOpA1',
      },
      {
        userAddress: '0xUser222',
        amountRestakedStETH: 80.75,
        targetAVSOperatorAddress: '0xOpA2',
      },
    ]

    const validators = [
      {
        operatorAddress: '0xOpA1',
        totalDelegatedStakeStETH: 5000.25,
        status: 'active',
        slashHistory: [
          {
            timestamp: 1678886400,
            amountStETH: 30,
            reason: 'Missed uptime',
          },
        ],
      },
      {
        operatorAddress: '0xOpA2',
        totalDelegatedStakeStETH: 3200.0,
        status: 'jailed',
        slashHistory: [],
      },
    ]

    const rewards = [
      {
        walletAddress: '0xUser111',
        totalRewardsReceivedStETH: 45.2,
        rewardsBreakdown: [
          {
            operatorAddress: '0xOpA1',
            amountStETH: 30.2,
            timestamps: [1678972800],
          },
          {
            operatorAddress: '0xOpA2',
            amountStETH: 15.0,
            timestamps: [1679059200],
          },
        ],
      },
      {
        walletAddress: '0xUser222',
        totalRewardsReceivedStETH: 18.6,
        rewardsBreakdown: [
          {
            operatorAddress: '0xOpA2',
            amountStETH: 18.6,
            timestamps: [1679145600],
          },
        ],
      },
    ]

    for (const r of restakers) {
      await db.run(
        `INSERT OR REPLACE INTO restakers 
        (user_address, amount_restaked_steth, target_avs_operator_address, last_updated)
        VALUES (?, ?, ?, ?)`,
        [r.userAddress, r.amountRestakedStETH, r.targetAVSOperatorAddress, now]
      )
    }

    for (const v of validators) {
      const result = await db.run(
        `INSERT OR REPLACE INTO validators 
        (operator_address, total_delegated_stake_steth, status, last_updated)
        VALUES (?, ?, ?, ?)`,
        [v.operatorAddress, v.totalDelegatedStakeStETH, v.status, now]
      )
      const validatorId = result.lastID

      for (const s of v.slashHistory || []) {
        await db.run(
          `INSERT INTO slash_history 
          (validator_id, timestamp, amount_steth, reason)
          VALUES (?, ?, ?, ?)`,
          [validatorId, s.timestamp, s.amountStETH, s.reason]
        )
      }
    }

    for (const r of rewards) {
      const result = await db.run(
        `INSERT OR REPLACE INTO rewards 
        (wallet_address, total_rewards_received_steth, last_updated)
        VALUES (?, ?, ?)`,
        [r.walletAddress, r.totalRewardsReceivedStETH, now]
      )
      const rewardId = result.lastID

      for (const b of r.rewardsBreakdown || []) {
        for (const t of b.timestamps || []) {
          await db.run(
            `INSERT INTO reward_breakdown 
            (reward_id, operator_address, amount_steth, timestamp)
            VALUES (?, ?, ?, ?)`,
            [rewardId, b.operatorAddress, b.amountStETH, t]
          )
        }
      }
    }

    console.log('data inserted successfully.')
  } catch (e) {
    console.error('Error inserting mock data:', e.message)
  }
}
