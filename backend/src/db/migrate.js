const fs = require("fs");
const path = require("path");
const db = require("./index");

const migrationsDir = path.join(__dirname, "../../migrations");

function runMigrations() {
  const files = fs.readdirSync(migrationsDir).sort();

  //Check if migrations have ever been run by checking for migrations folder
  let executedMigrations;
  try {
    executedMigrations = db
      .prepare("SELECT id FROM migrations")
      .all()
      .map((row) => row.id);
  } catch (err) {
    executedMigrations = [];
  }

  files.forEach((file) => {
    if (executedMigrations.includes(file)) {
      console.log(`Skipping already executed: ${file}`);
      return;
    }

    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    console.log(`Running migration: ${file}`);

    const transaction = db.transaction(() => {
      db.exec(sql);

      db.prepare("INSERT INTO migrations (id) VALUES (?)").run(file);
    });

    transaction();
  });

  console.log("Migrations complete");
}

runMigrations();
