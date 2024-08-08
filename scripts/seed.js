const { copy } = require('@vercel/blob');
const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function seedFinancialData(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Drop the table if it exists
    // await client.sql`DROP TABLE IF EXISTS financial_data`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE financial_data (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        year INT,
        company VARCHAR(255),
        sector VARCHAR(255),
        equity_ticker VARCHAR(255),
        share_price VARCHAR(255),
        div_ticker VARCHAR(255),
        p_and_l_fx VARCHAR(255),
        div_future_fx VARCHAR(255),
        index1 VARCHAR(255),
        index2 VARCHAR(255),
        index3 VARCHAR(255),
        d1_central VARCHAR(255),
        current_price_z VARCHAR(255),
        discount_premium_percent VARCHAR(255),
        annual_return_percent VARCHAR(255),
        very_bear_z VARCHAR(255),
        d1_lower VARCHAR(255),
        d1_upper VARCHAR(255),
        very_bull_z VARCHAR(255),
        risk_distribution VARCHAR(255),
        risk_skew VARCHAR(255),
        net_income VARCHAR(255),
        av_weighted_share_cap VARCHAR(255),
        eps VARCHAR(255),
        dps_fy VARCHAR(255),
        dps_payout_ratio VARCHAR(255),
        op_cash_flow VARCHAR(255),
        capex VARCHAR(255),
        free_cash_flow VARCHAR(255),
        dividend VARCHAR(255),
        share_buyback VARCHAR(255),
        total_capital_return VARCHAR(255),
        net_debt VARCHAR(255),
        share_in_issue VARCHAR(255),
        treasury_shares VARCHAR(255),
        shares_outstanding VARCHAR(255),
        capital_payout_percent VARCHAR(255),
        dps_q1 VARCHAR(255),
        dps_q2 VARCHAR(255),
        dps_q3 VARCHAR(255),
        dps_q4 VARCHAR(255),
        ex_date_q1 DATE,
        ex_date_q2 DATE,
        ex_date_q3 DATE,
        ex_date_q4 DATE,
        peer_1 VARCHAR(255),
        peer_2 VARCHAR(255),
        peer_3 VARCHAR(255),
        peer_4 VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL
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

async function seedFinancialDataHistory(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Drop the table if it exists
    // await client.sql`DROP TABLE IF EXISTS financial_data_history`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE financial_data_history (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        year INT,
        company VARCHAR(255),
        equity_ticker VARCHAR(255),
        d1_central VARCHAR(255),
        very_bear_z VARCHAR(255),
        d1_lower VARCHAR(255),
        d1_upper VARCHAR(255),
        very_bull_z VARCHAR(255),
        risk_distribution VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL
      );
    `;

    console.log(`Created "financial_data_history" table`);

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
      // await client.sql`DROP TABLE IF EXISTS companies`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE companies (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4() UNIQUE,
        name VARCHAR(255),
        equity_ticker VARCHAR(255),
        sharing VARCHAR(255),
        tags VARCHAR(255),
        iframe_url VARCHAR(255),
        template boolean,
        attachments VARCHAR(255),
        member_permission INT,
        sector_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL,
        unique_url_key UUID DEFAULT uuid_generate_v4() UNIQUE
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

// async function backupEventsTable(client) {
//   try {
//       await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//       // Drop the backup table if it exists
//       await client.sql`DROP TABLE IF EXISTS events_backup`;

//       // Create the backup table with the same structure as the original table
//       await client.sql`CREATE TABLE events_backup AS TABLE events WITH NO DATA`;

//       // Insert all data from the original table into the backup table
//       await client.sql`INSERT INTO events_backup SELECT * FROM events`;

//       console.log('Backed up "events" table to "events_backup"');
//   } catch (error) {
//       console.error('Error backing up events table:', error);
//       throw error;
//   }
// }

// async function updateSourceUrl(client) {
//   try {
//     // Fetch all events with a description
//     const { rows: events } = await client.query('SELECT id, description FROM events WHERE description IS NOT NULL');

//     // Regex to extract URL from description
//     const urlRegex = /href="([^"]*)"/;

//     for (const event of events) {
//       const match = event.description.match(urlRegex);
//       const sourceUrl = match ? match[1] : null;

//       // Update the source_url field
//       if (sourceUrl) {
//         await client.query(
//           'UPDATE events SET source_url = $1 WHERE id = $2',
//           [sourceUrl, event.id]
//         );
//       }
//     }

//     console.log('Updated source_url for all events');
//   } catch (error) {
//     console.error('Error updating source_url:', error);
//     throw error;
//   }
// }

async function seedEvents(client) {
    try {
      
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Drop the table if it exists
      // await client.sql`DROP TABLE IF EXISTS events`;
      // Create the "event" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        recurrence VARCHAR(255),
        company_id UUID NOT NULL,
        all_day BOOLEAN,
        color VARCHAR(7),
        end_date TIMESTAMP WITH TIME ZONE,
        description TEXT,
        assignees TEXT,
        location VARCHAR(255),
        sharing VARCHAR(50),
        start_date TIMESTAMP WITH TIME ZONE,
        friendly_name VARCHAR(255),
        source_url VARCHAR(255),
        tags TEXT,
        clinked_id VARCHAR(255),
        status INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID
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
      // await client.sql`DROP TABLE IF EXISTS sectors`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE sectors (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL
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
      // await client.sql`DROP TABLE IF EXISTS tags`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE tags (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL
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

async function seedKeyTable(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Drop the table if it exists
      // await client.sql`DROP TABLE IF EXISTS unique_keys`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE unique_keys (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_overview_key UUID NOT NULL,
        consolidated_estimates_key UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
  
      console.log(`Created "unique_keys" table`);

      await client.sql`INSERT INTO unique_keys (
          company_overview_key,
          consolidated_estimates_key
      ) VALUES (
          uuid_generate_v4(),
          uuid_generate_v4()
      );`;

      console.log('Inserted default data into "unique_keys" table');
  
      return {
        createTable
      };
    } catch (error) {
      console.error('Error seeding unique_keys:', error);
      throw error;
    }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Drop the table if it exists
    // await client.sql`DROP TABLE IF EXISTS users`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        access_level UUID NOT NULL,
        password TEXT NOT NULL,
        updated_by UUID NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const hashedPassword = await bcrypt.hash('D1Research2024!', 10);
    const insertedUsers =  await client.sql`
        INSERT INTO users (name, email, password, access_level, updated_by)
        VALUES 
          ('Ralfh Bryan Perez', 'rperez@d1research.com', ${hashedPassword}, 'db90858b-7bad-4dd5-8913-1ffe39f3dd18', uuid_generate_v4()), 
          ('Thomas Aaby', 'taaby@d1research.com', ${hashedPassword}, 'db90858b-7bad-4dd5-8913-1ffe39f3dd18', uuid_generate_v4()),
          ('Benjamin Peters', 'bpeters@d1research.com', ${hashedPassword}, 'bbb38c08-1e0f-4b8d-b77e-4968cff7069d', uuid_generate_v4()),
          ('Rafael Miranda', 'rmiranda@d1research.com', ${hashedPassword}, 'bbb38c08-1e0f-4b8d-b77e-4968cff7069d', uuid_generate_v4())
        ON CONFLICT (email) DO NOTHING;
      `;

    console.log(`Seeded users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedUserAccess(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // await client.sql`DROP TABLE IF EXISTS user_access`;
    const createTable = await client.sql`
      CREATE TABLE user_access (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        access_level VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "user_access" table`);

    // Insert default values
    const insertDefaults = await client.sql`
      INSERT INTO user_access (access_level)
      VALUES
        ('Admin'),
        ('Analyst'),
        ('Researcher');
    `;

    console.log(`Inserted default values into "user_access" table`);

    return {
      createTable,
      insertDefaults
    };
  } catch (error) {
    console.error('Error seeding user_access:', error);
    throw error;
  }
}

async function seedAnalystsComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // await client.sql`DROP TABLE IF EXISTS analysts_comments`;
    const createTable = await client.sql`
      CREATE TABLE analysts_comments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL
      );
    `;

    console.log(`Created "analysts_comments" table`);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding analysts_comments:', error);
    throw error;
  }
}

async function seedLatestManagementStatement(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // await client.sql`DROP TABLE IF EXISTS latest_management_statement`;
  } catch (error) {
    console.error('Error seeding latest_management_statement:', error);
    throw error;
  }
}

async function seedCapitalReturnPolicy(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // await client.sql`DROP TABLE IF EXISTS capital_return_policy`;
    const createTable = await client.sql`
      CREATE TABLE capital_return_policy (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL
      );
    `;

    console.log(`Created "capital_return_policy" table`);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding capital_return_policy:', error);
    throw error;
  }
}


async function seedSensitivitiesTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS sensitivities`;
    const createTable = await client.sql
    `CREATE TABLE sensitivities (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      year VARCHAR(255),
      company VARCHAR(255),
      equity_ticker VARCHAR(255),
      lower_sales_m VARCHAR(255),
      lower_sales_v_central_pct VARCHAR(255),
      lower_net_income_m VARCHAR(255),
      lower_ni_margin_pct VARCHAR(255),
      lower_ni_margin_change_bp VARCHAR(255),
      lower_awsc_m VARCHAR(255),
      lower_eps VARCHAR(255),
      lower_eps_v_central_pct VARCHAR(255),
      lower_dps VARCHAR(255),
      lower_payout_ratio VARCHAR(255),
      central_sales_m VARCHAR(255),
      central_sales_v_central_pct VARCHAR(255),
      central_net_income_m VARCHAR(255),
      central_ni_margin_pct VARCHAR(255),
      central_ni_margin_change_bp VARCHAR(255),
      central_awsc_m VARCHAR(255),
      central_eps VARCHAR(255),
      central_eps_v_central_pct VARCHAR(255),
      central_dps VARCHAR(255),
      central_payout_ratio VARCHAR(255),
      upper_sales_m VARCHAR(255),
      upper_sales_v_central_pct VARCHAR(255),
      upper_net_income_m VARCHAR(255),
      upper_ni_margin_pct VARCHAR(255),
      upper_ni_margin_change_bp VARCHAR(255),
      upper_awsc_m VARCHAR(255),
      upper_eps VARCHAR(255),
      upper_eps_v_central_pct VARCHAR(255),
      upper_dps VARCHAR(255),
      upper_payout_ratio VARCHAR(255),
      lower_q1_div VARCHAR(255),
      lower_q2_div VARCHAR(255),
      lower_q3_div VARCHAR(255),
      lower_q4_div VARCHAR(255),
      lower_total VARCHAR(255),
      central_q1_div VARCHAR(255),
      central_q2_div VARCHAR(255),
      central_q3_div VARCHAR(255),
      central_q4_div VARCHAR(255),
      central_total VARCHAR(255),
      upper_q1_div VARCHAR(255),
      upper_q2_div VARCHAR(255),
      upper_q3_div VARCHAR(255),
      upper_q4_div VARCHAR(255),
      upper_total VARCHAR(255),
      updated_by UUID NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

      console.log(`Created "sensitivities" table`);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding sensitivities:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  // await seedFinancialDataHistory(client);
  // await seedFinancialData(client);
  // await seedKeyTable(client);
  // await seedCompanies(client);
  // await seedTags(client);
  // await seedEvents(client);
  // await seedUsers(client);
  // await seedSectors(client);
  // await seedUserAccess(client);
  // await seedAnalystsComments(client);
  // await seedLatestManagementStatement(client);
  // await seedCapitalReturnPolicy(client);
  await seedSensitivitiesTable(client);


  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
