import Topics from "./components/topics/HomePage";
import dynamic from "next/dynamic";

const App = async () => {
  return (
    <div>
      <Topics />
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
