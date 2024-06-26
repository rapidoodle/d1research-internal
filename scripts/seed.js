const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function seedFinancialData(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Drop the table if it exists
    await client.sql`DROP TABLE IF EXISTS financial_data`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE financial_data (
        id SERIAL PRIMARY KEY,
        year INT,
        company VARCHAR(255),
        sector VARCHAR(255),
        equity_ticker VARCHAR(255),
        share_price FLOAT,
        div_ticker VARCHAR(255),
        p_and_l_fx VARCHAR(255),
        div_future_fx VARCHAR(255),
        index1 VARCHAR(255),
        index2 VARCHAR(255),
        index3 VARCHAR(255),
        dps_z FLOAT,
        current_price_z FLOAT,
        discount_premium_percent FLOAT,
        annual_return_percent FLOAT,
        very_bear_z FLOAT,
        bear_z FLOAT,
        bull_z FLOAT,
        very_bull_z FLOAT,
        risk_adj_dps_z FLOAT,
        net_income FLOAT,
        av_weighted_share_cap FLOAT,
        eps FLOAT,
        dps_fy FLOAT,
        dps_payout_ratio VARCHAR(255),
        op_cash_flow FLOAT,
        capex FLOAT,
        free_cash_flow FLOAT,
        dividend FLOAT,
        share_buyback FLOAT,
        total_capital_return FLOAT,
        net_debt FLOAT,
        share_in_issue FLOAT,
        treasury_shares FLOAT,
        shares_outstanding FLOAT,
        capital_payout_percent VARCHAR(255),
        dps_q1 FLOAT,
        dps_q2 FLOAT,
        dps_q3 FLOAT,
        dps_q4 FLOAT,
        ex_date_q1 DATE,
        ex_date_q2 DATE,
        ex_date_q3 DATE,
        ex_date_q4 DATE
      );
    `;

    console.log(`Created "financial_data" table`);

    return {
      createTable
    };
    } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
    }
    }



async function seedCompanies(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Drop the table if it exists
      await client.sql`DROP TABLE IF EXISTS companies`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        sharing VARCHAR(255),
        tags VARCHAR(255),
        iframe_url VARCHAR(255),
        template boolean,
        attachments VARCHAR(255),
        member_permission INT,
        sector_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
  
      console.log(`Created "companies" table`);
  
      return {
        createTable
      };
    } catch (error) {
      console.error('Error seeding companies:', error);
      throw error;
    }
}

async function seedEvents(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Drop the table if it exists
      await client.sql`DROP TABLE IF EXISTS events`;
      // Create the "event" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        recurrence VARCHAR(255),
        company_id INT,
        all_day BOOLEAN,
        color VARCHAR(7),
        end_date TIMESTAMP WITH TIME ZONE,
        description TEXT,
        assignees TEXT[],
        location VARCHAR(255),
        sharing VARCHAR(50),
        start_date TIMESTAMP WITH TIME ZONE,
        friendly_name VARCHAR(255),
        tags TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
  
      console.log(`Created "events" table`);
  
      return {
        createTable
      };
    } catch (error) {
      console.error('Error seeding events:', error);
      throw error;
    }
}

async function seedSectors(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Drop the table if it exists
      await client.sql`DROP TABLE IF EXISTS sectors`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE sectors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      `;
  
      console.log(`Created "sectors" table`);
  
      return {
        createTable
      };
    } catch (error) {
      console.error('Error seeding sectors:', error);
      throw error;
    }
}

async function seedTags(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Drop the table if it exists
      await client.sql`DROP TABLE IF EXISTS tags`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      `;
  
      console.log(`Created "tags" table`);
  
      return {
        createTable
      };
    } catch (error) {
      console.error('Error seeding tags:', error);
      throw error;
    }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Drop the table if it exists
    await client.sql`DROP TABLE IF EXISTS users`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        access_level INT NOT NULL DEFAULT 1,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const hashedPassword = await bcrypt.hash('123456', 10);
    const insertedUsers =  await client.sql`
        INSERT INTO users (name, email, password, access_level)
        VALUES ('Ralfh Bryan Perez', 'rperez@d1research.com', ${hashedPassword}, 1), ('Thomas Aaby', 'taaby@d1research.com', ${hashedPassword}, 1)
        ON CONFLICT (id) DO NOTHING;
      `;

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedFinancialData(client);
  // await seedCompanies(client);
  // await seedTags(client);
  await seedEvents(client);
  // await seedUsers(client);
  // await seedSectors(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
