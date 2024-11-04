'use server'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export default async function getView() {
  const alltests = await prisma.test.findMany()
  console.log(alltests)
}