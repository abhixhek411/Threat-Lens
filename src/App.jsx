import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import MatrixBackground from './components/MatrixBackground';
import "./App.css";
function App() {
  const [result, setResult] = useState(null);

  const handleResult = (res) => {
    setResult(res);
  };

  return (
    <div className="relative min-h-screen overflow-y-scroll text-white ">
      <MatrixBackground />

      <div className="absolute inset-0 flex items-start justify-center z-10 p-4">
        <div className="bg-black/70 backdrop-blur-md border border-white-800 shadow-lg p-8 rounded-xl w-full max-w-2xl space-y-6 text-center">
          <h1 className="text-3xl font-bold bg-red-950 text-white drop-shadow-md xxx ">
            🔰 Threat Summary
          </h1>

          <InputForm onResult={handleResult} />

          {result && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;
