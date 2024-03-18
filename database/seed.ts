import { db } from "./db";
import { users } from "./schema";

async function runSeed() {
  await db.insert(users).values([
    {
      email: "admin@gbo.com",
      username: "admingbo",
      password: "gbo123",
      role: "admin",
    },
  ]);
}

runSeed();
