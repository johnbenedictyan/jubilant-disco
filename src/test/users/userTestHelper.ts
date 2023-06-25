import { User } from "@prisma/client";

import prisma from "../../utils/db/prisma";
import { hashPassword } from "../../utils/hashPasswords";

const TEST_USER: User = {
  email: "testuser@testuser.com",
  username: "testUser",
  password: "password123",
  bio: "This is the bio of the test user",
  image: "https://picsum.photos/200",
  role: "user",
};

const createTestUser = async () => {
  const testUser = await prisma.user.create({
    data: {
      ...TEST_USER,
      password: hashPassword(TEST_USER.password),
    },
  });
  return testUser;
};

const deleteTestUser = async () => {
  const testUser = await prisma.user.delete({
    where: {
      email: TEST_USER.email,
    },
  });
  return testUser;
};

export { TEST_USER, createTestUser, deleteTestUser };
