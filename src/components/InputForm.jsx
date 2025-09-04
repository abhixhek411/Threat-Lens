import React, { useState } from 'react';
import { functions } from '../appwrite/config';

export default function InputForm({ onResult }) {
  const [inputType, setInputType] = useState('log');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      onResult({ error: '❌ Please enter some content to analyze.' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type: inputType,
        content: inputText.trim(),
      };

      const execution = await functions.createExecution(
        '686823d3000173035c9b',
        JSON.stringify(payload)
      );

      const raw = execution.response || execution.responseBody || '{}';
      let parsed = {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { error: '❌ Failed to parse function response.' };
      }

      onResult(parsed);
    } catch (err) {
      onResult({ error: err.message || 'Function execution failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAnalyze();
      }}
      className="flex flex-col gap-4 w-full"
    >
      <select
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
        className="w-full bg-black border border-white-600 text-white px-3 py-2 rounded"
      >
        <option value="log">Log</option>
        <option value="email">Email</option>
        <option value="domain">Domain</option>
      </select>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste suspicious log/email/domain here…"
        rows={6}
        className="w-full p-3 bg-black border border-white-600 text-white rounded resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded text-white font-semibold transition disabled:opacity-50"
      >
        {loading ? 'Analyzing…' : 'Analyze Threat'}
      </button>
    </form>
  );
}