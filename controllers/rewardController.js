import { getDb } from '../config/db.js';

export const getRewards = async (req, res) => {
  const db = getDb();
  const { address } = req.params;

  const reward = await db.get(
    'SELECT * FROM rewards WHERE wallet_address = ?',
    [address]
  );

  if (!reward) {
    res.status(404).send({ error: 'Wallet not found' });
    return;
  }

  const breakdown = await db.all(
    'SELECT operator_address, amount_steth, timestamp FROM reward_breakdown WHERE reward_id = ?',
    [reward.id]
  );

  const groupedBreakdown = breakdown.reduce((acc, curr) => {
    const existing = acc.find(item => item.operatorAddress === curr.operator_address);
    if (existing) {
      existing.amountStETH += curr.amount_steth;
      existing.timestamps.push(curr.timestamp);
    } else {
      acc.push({
        operatorAddress: curr.operator_address,
        amountStETH: curr.amount_steth,
        timestamps: [curr.timestamp],
      });
    }
    return acc;
  }, []);

  res.send({
    walletAddress: reward.wallet_address,
    totalRewardsReceivedStETH: reward.total_rewards_received_steth,
    rewardsBreakdown: groupedBreakdown,
  });
};
