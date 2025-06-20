export const createTables = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS restakers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_address TEXT UNIQUE,
      amount_restaked_steth REAL,
      target_avs_operator_address TEXT,
      last_updated INTEGER
    );

    CREATE TABLE IF NOT EXISTS validators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operator_address TEXT UNIQUE,
      total_delegated_stake_steth REAL,
      status TEXT,
      last_updated INTEGER
    );

    CREATE TABLE IF NOT EXISTS slash_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      validator_id INTEGER,
      timestamp INTEGER,
      amount_steth REAL,
      reason TEXT,
      FOREIGN KEY (validator_id) REFERENCES validators(id)
    );

    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet_address TEXT UNIQUE,
      total_rewards_received_steth REAL,
      last_updated INTEGER
    );

    CREATE TABLE IF NOT EXISTS reward_breakdown (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reward_id INTEGER,
      operator_address TEXT,
      amount_steth REAL,
      timestamp INTEGER,
      FOREIGN KEY (reward_id) REFERENCES rewards(id)
    );
  `)
}
