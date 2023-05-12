import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { client as sanity } from "~/utils/sanity"
import superjson from "superjson";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null, sanity },
    transformer: superjson, // optional - adds superjson serialization
  });