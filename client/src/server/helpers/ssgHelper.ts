import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { client as sanity } from "~/utils/sanity"

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null, sanity },
    transformer: superjson, // optional - adds superjson serialization
  });