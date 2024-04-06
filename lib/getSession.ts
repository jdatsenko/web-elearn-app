import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getSessionProps = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};
