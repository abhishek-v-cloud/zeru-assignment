import { getDb } from '../config/db.js'

export const getRestakers = async (req, res) => {
  const db = getDb()
  const restakers = await db.all('SELECT * FROM restakers')

  const formatted = restakers.map(r => ({
    userAddress: r.user_address,
    amountRestakedStETH: r.amount_restaked_steth.toString(),
    targetAVSOperatorAddress: r.target_avs_operator_address,
  }))

  res.send(formatted)
}
