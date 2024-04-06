import Topics from "./components/topics/Topics";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const App = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      
      <Topics />
    </div>
  );
};

export default App;
