const { faker } = require("@faker-js/faker");
const db = require("../src/db");
const { DEPARTMENTS, COUNTRIES } = require("./constants");

const TOTAL = 10000;
const BATCH_SIZE = 500;

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEmployee(i) {
  const first = faker.person.firstName();
  const last = faker.person.lastName();

  return {
    first_name: first,
    last_name: last,
    email: `${first}.${last}${i}@company.com`.toLowerCase(),
    job_title: faker.person.jobTitle(),
    department: randomItem(DEPARTMENTS),
    country: randomItem(COUNTRIES),
    salary: faker.number.int({ min: 20000, max: 150000 }),
  };
}

function seed() {
  console.log("🌱 Seeding started...");
  console.time("seeding");
  // cleanup
  db.prepare("DELETE FROM employees").run();

  const insert = db.prepare(`
    INSERT INTO employees (
      first_name,
      last_name,
      email,
      job_title,
      department,
      country,
      salary
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertBatch = db.transaction((batch) => {
    for (const emp of batch) {
      insert.run(
        emp.first_name,
        emp.last_name,
        emp.email,
        emp.job_title,
        emp.department,
        emp.country,
        emp.salary,
      );
    }
  });

  let inserted = 0;

  while (inserted < TOTAL) {
    const batch = [];
    for (let i = 0; i < BATCH_SIZE && inserted < TOTAL; i++) {
      batch.push(generateEmployee(inserted));
      inserted++;
    }

    insertBatch(batch);
    console.log(`✅ Inserted ${inserted}/${TOTAL}`);
  }

  console.log("🎉 Seeding completed");
  console.timeEnd("seeding");
}

seed();
