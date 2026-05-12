import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import QualificationFlow from "./components/QualificationFlow";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-aerospace-navy text-titanium-silver font-sans">
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <QualificationFlow />
      )}
    </div>
  );
}

export default App;