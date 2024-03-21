import { Argon2id } from "oslo/password";

import { db } from "./db";
import { users } from "./schema";

async function runSeed() {
  await db.insert(users).values([
    {
      email: "admin@gbo.com",
      username: "admingbo",
      password: await new Argon2id().hash("gbo123"),
      role: "admin",
    },
  ]);
}

runSeed();
