import { Accordion } from "./components/Accordion";
import { Reveal } from "./components/Reveal";
import { useCopyToClipboard, useDebounce, useLocalStorage } from "./hooks";
import { formatUsPhone } from "./lib/format";

export default function App() {
  const [query, setQuery] = useLocalStorage("demo:query", "");
  const debounced = useDebounce(query, 400);
  const { copied, copy } = useCopyToClipboard();

  return (
    <main>
      <h1>Vite + React starter</h1>
      <Reveal>
        <p>Reusable hooks and components. Type below: the value persists and the debounced copy updates 400 ms later.</p>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type something..." />
        <p>Debounced: <b>{debounced || "-"}</b></p>
        <button onClick={() => copy(debounced)}>{copied ? "Copied!" : "Copy"}</button>
      </Reveal>
      <Reveal delay={120}>
        <p>Phone formatter: {formatUsPhone("3045454670")}</p>
        <Accordion items={[{ title: "What is this?", content: "A small, tested toolkit you can copy into any React app." }, { title: "License?", content: "MIT." }]} />
      </Reveal>
    </main>
  );
}
