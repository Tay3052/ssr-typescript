import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Intro from "./pages/Myself";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header コンポーネントは常に表示される */}
        <Route path="/" element={<Header />}>
          {/* ルートパスにマッチした場合は Intro コンポーネントを表示 */}
          <Route path="/" element={<Intro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
