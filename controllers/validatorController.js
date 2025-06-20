import { getDb } from '../config/db.js'

export const getValidators = async (req, res) => {
  const db = getDb()

  const validators = await db.all('SELECT * FROM validators')

  const result = []

  for (const validator of validators) {
    const slashHistory = await db.all(
      'SELECT timestamp, amount_steth, reason FROM slash_history WHERE validator_id = ?',
      [validator.id]
    )

    result.push({
      operatorAddress: validator.operator_address,
      totalDelegatedStakeStETH: validator.total_delegated_stake_steth,
      slashHistory: slashHistory.map(item => ({
        timestamp: item.timestamp,
        amountStETH: item.amount_steth,
        reason: item.reason || null,
      })),
      status: validator.status,
    })
  }

  res.send(result)
}
