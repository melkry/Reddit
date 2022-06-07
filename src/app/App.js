import "./styles.css";
import { Header } from "../components/header/header";
import { Content } from "../components/content/content";
import { Subreddits } from "../components/subreddits/subreddits";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Subreddits />
    </div>
  );
}
