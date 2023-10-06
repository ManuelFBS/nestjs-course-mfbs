-- CREATE DATABASE IF NOT EXISTS nestjsdb
SELECT 'CREATE DATABASE nestjsdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nestjsdb')\gexec