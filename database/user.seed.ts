import { faker } from "@faker-js/faker";

import { db } from "./db";
import { users } from "./schema";

interface UserSeed {
  username: string;
  email: string;
  password: string;
  ipAddress: string;
}

async function seedUser() {
  const seedData = [] as UserSeed[];
  for (let i = 0; i < 50; i++) {
    seedData.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ipAddress: faker.internet.ipv4(),
    });
  }

  await db.insert(users).values(seedData);
}

seedUser();
