const { Pool } = require('pg');

const pool = new Pool({
  connectionString: postgresql://ento_delivery_user:lVmFvXRWyTpMIaELPW8DfAaK5FV8oPQw@dpg-cqnt705ds78s73boips0-a/ento_delivery_user_db,
});

module.exports = pool;
