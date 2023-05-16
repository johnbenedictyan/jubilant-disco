import prisma from "../prisma";

export default async function shopCreatePrisma(
  name: string,
  addressField1: string,
  addressField2: string,
  addressField3: string,
  postalCode: number
) {
  const shop = await prisma.shop.create({
    data: { name, addressField1, addressField2, addressField3, postalCode },
  });
  return shop;
}
