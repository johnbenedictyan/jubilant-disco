import { Tag } from "@prisma/client";

import prisma from "../../utils/db/prisma";

const TEST_TAG: Tag = {
  tagName: "Test Tag",
};

const createTestTag = async () => {
  const testTag = await prisma.tag.create({
    data: {
      ...TEST_TAG,
    },
  });
  return testTag;
};
