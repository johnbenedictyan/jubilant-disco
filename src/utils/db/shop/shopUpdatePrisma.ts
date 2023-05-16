import prisma from "../prisma";

interface UpdateFields {
  id?: number;
  name?: string;
  addressField1?: string;
  addressField2?: string;
  addressField3?: string;
  postalCode?: number;
}

export default async function shopUpdatePrisma(id: number, info: UpdateFields) {
  if (!id) return null;
  const shop = await prisma.shop.update({ where: { id }, data: info });
  return shop;
}
