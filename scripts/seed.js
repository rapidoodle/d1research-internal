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
      v_bear VARCHAR(255),
      bear VARCHAR(255),
      central VARCHAR(255),
      bull VARCHAR(255),
      v_bull VARCHAR(255),
      risk_adj VARCHAR(255),
      discount_to_central_percent VARCHAR(255),
      payout_percent_very_bear VARCHAR(255),
      payout_percent_bear VARCHAR(255),
      payout_percent_central VARCHAR(255),
      payout_percent_bull VARCHAR(255),
      payout_percent_very_bull VARCHAR(255),
      vbe_sales_m_vbe VARCHAR(255),
      vbe_sales_v_central_percent_vbe VARCHAR(255),
      vbe_net_income_m_vbe VARCHAR(255),
      vbe_ni_margin_percent_vbe VARCHAR(255),
      vbe_ni_margin_change_bp_vbe VARCHAR(255),
      vbe_awsc_m_vbe VARCHAR(255),
      vbe_eps_vbe VARCHAR(255),
      vbe_eps_v_central_percent_vbe VARCHAR(255),
      dps_vbe1 VARCHAR(255),
      dps_vbe2 VARCHAR(255),
      dps_vbe3 VARCHAR(255),
      dps_vbe4 VARCHAR(255),
      dps_vbe5 VARCHAR(255),
      be_sales_m_be VARCHAR(255),
      be_sales_v_central_percent_be VARCHAR(255),
      be_net_income_m_be VARCHAR(255),
      be_ni_margin_percent_be VARCHAR(255),
      be_ni_margin_change_bp_be VARCHAR(255),
      be_awsc_m_be VARCHAR(255),
      be_eps_be VARCHAR(255),
      be_eps_v_central_percent_be VARCHAR(255),
      dps_be1 VARCHAR(255),
      dps_be2 VARCHAR(255),
      dps_be3 VARCHAR(255),
      dps_be4 VARCHAR(255),
      dps_be5 VARCHAR(255),
      ce_sales_m_ce VARCHAR(255),
      ce_sales_v_central_percent_ce VARCHAR(255),
      ce_net_income_m_ce VARCHAR(255),
      ce_ni_margin_percent_ce VARCHAR(255),
      ce_ni_margin_change_bp_ce VARCHAR(255),
      ce_awsc_m_ce VARCHAR(255),
      ce_eps_ce VARCHAR(255),
      ce_eps_v_central_percent_ce VARCHAR(255),
      dps_ce1 VARCHAR(255),
      dps_ce2 VARCHAR(255),
      dps_ce3 VARCHAR(255),
      dps_ce4 VARCHAR(255),
      dps_ce5 VARCHAR(255),
      bu_sales_m_bu VARCHAR(255),
      bu_sales_v_central_percent_bu VARCHAR(255),
      bu_net_income_m_bu VARCHAR(255),
      bu_ni_margin_percent_bu VARCHAR(255),
      bu_ni_margin_change_bp_bu VARCHAR(255),
      bu_awsc_m_bu VARCHAR(255),
      bu_eps_bu VARCHAR(255),
      bu_eps_v_buntral_percent_bu VARCHAR(255),
      dps_bu1 VARCHAR(255),
      dps_bu2 VARCHAR(255),
      dps_bu3 VARCHAR(255),
      dps_bu4 VARCHAR(255),
      dps_bu5 VARCHAR(255),
      vbu_sales_m_vbu VARCHAR(255),
      vbu_sales_v_central_percent_vbu VARCHAR(255),
      vbu_net_income_m_vbu VARCHAR(255),
      vbu_ni_margin_percent_vbu VARCHAR(255),
      vbu_ni_margin_change_bp_vbu VARCHAR(255),
      vbu_awsc_m_vbu VARCHAR(255),
      vbu_eps_vbu VARCHAR(255),
      vbu_eps_v_central_percent_vbu VARCHAR(255),
      dps_vbu1 VARCHAR(255),
      dps_vbu2 VARCHAR(255),
      dps_vbu3 VARCHAR(255),
      dps_vbu4 VARCHAR(255),
      dps_vbu5 VARCHAR(255),
      pay24vbe VARCHAR(255),
      pay24be VARCHAR(255),
      pay24c VARCHAR(255),
      pay24bu VARCHAR(255),
      pay24vbu VARCHAR(255),
      sales24 VARCHAR(255),
      svc24 VARCHAR(255),
      ni24 VARCHAR(255),
      nim24 VARCHAR(255),
      nimc24 VARCHAR(255),
      awsc24 VARCHAR(255),
      eps24 VARCHAR(255),
      epsvc24 VARCHAR(255),
      sales25 VARCHAR(255),
      svc25 VARCHAR(255),
      ni25 VARCHAR(255),
      nim25 VARCHAR(255),
      nimc25 VARCHAR(255),
      awsc25 VARCHAR(255),
      eps25 VARCHAR(255),
      epsvc25 VARCHAR(255),
      pay25vbe VARCHAR(255),
      pay25be VARCHAR(255),
      pay25c VARCHAR(255),
      pay25bu VARCHAR(255),
      pay25vbu VARCHAR(255),
      sales26 VARCHAR(255),
      svc26 VARCHAR(255),
      ni26 VARCHAR(255),
      nim26 VARCHAR(255),
      nimc26 VARCHAR(255),
      awsc26 VARCHAR(255),
      eps26 VARCHAR(255),
      epsvc26 VARCHAR(255),
      pay26vbe VARCHAR(255),
      pay26be VARCHAR(255),
      pay26c VARCHAR(255),
      pay26bu VARCHAR(255),
      pay26vbu VARCHAR(255),
      "2020vbe" VARCHAR(255),
      "2021vbe" VARCHAR(255),
      "2022vbe" VARCHAR(255),
      "2023vbe" VARCHAR(255),
      "2024vbe" VARCHAR(255),
      "2025vbe" VARCHAR(255),
      "2026vbe" VARCHAR(255),
      "2027vbe" VARCHAR(255),
      "2020be" VARCHAR(255),
      "2021be" VARCHAR(255),
      "2022be" VARCHAR(255),
      "2023be" VARCHAR(255),
      "2024be" VARCHAR(255),
      "2025be" VARCHAR(255),
      "2026be" VARCHAR(255),
      "2027be" VARCHAR(255),
      "2020bu" VARCHAR(255),
      "2021bu" VARCHAR(255),
      "2022bu" VARCHAR(255),
      "2023bu" VARCHAR(255),
      "2024bu" VARCHAR(255),
      "2025bu" VARCHAR(255),
      "2026bu" VARCHAR(255),
      "2027bu" VARCHAR(255),
      "2020vbu" VARCHAR(255),
      "2021vbu" VARCHAR(255),
      "2022vbu" VARCHAR(255),
      "2023vbu" VARCHAR(255),
      "2024vbu" VARCHAR(255),
      "2025vbu" VARCHAR(255),
      "2026vbu" VARCHAR(255),
      "2027vbu" VARCHAR(255),
      "vbe_q1" VARCHAR(255),
      "be_q1" VARCHAR(255),
      "bu_q1" VARCHAR(255),
      "vbu_q1" VARCHAR(255),
      "vbe_q2" VARCHAR(255),
      "be_q2" VARCHAR(255),
      "bu_q2" VARCHAR(255),
      "vbu_q2" VARCHAR(255),
      "vbe_q3" VARCHAR(255),
      "be_q3" VARCHAR(255),
      "bu_q3" VARCHAR(255),
      "vbu_q3" VARCHAR(255),
      "vbe_q4" VARCHAR(255),
      "be_q4" VARCHAR(255),
      "bu_q4" VARCHAR(255),
      "vbu_q4" VARCHAR(255),
      "vbe_total" VARCHAR(255),
      "be_total" VARCHAR(255),
      "bu_total" VARCHAR(255),
      "vbu_total" VARCHAR(255),
      "updated_by" UUID NOT NULL,
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
