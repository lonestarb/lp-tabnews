import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  const response = await database.query(
    "drop schema public cascade; create schema public;"
  );
  expect(response[0].command).toBe("DROP");

  expect(response[1].command).toBe("CREATE");
}

test("POST /api/v1/migrations should return 201", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

test("POST /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toEqual(0);
});
