import React from 'react';
import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ResultCard({ result }) {
  if (!result || Object.keys(result).length === 0) return null;

  const score = parseInt(result.riskScore) || 0;

  return (
    <div className="w-full bg-black/60 text-white rounded-xl p-4 border border-white-600 space-y-4 ">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-green-400 justify-center">
        <FaShieldAlt /> Threat Analysis Result
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              textColor: '#ffffff',
              pathColor:
                score < 40
                  ? '#4ade80'
                  : score < 70
                  ? '#facc15'
                  : '#f87171',
              trailColor: '#1f2937',
              textSize: '18px',
            })}
          />
        </div>

        <div className="md:col-span-2 space-y-2 text-sm text-left">
          <p>
            <strong className="text-blue-400">Threat Type:</strong>{' '}
            {result.threatType || 'Unknown'}
          </p>
          <p>
            <strong className="text-blue-400">Risk Score:</strong>{' '}
            {result.riskScore || '0'}/100
          </p>

          {result.summary && (
            <div className="mt-2">
              <h3 className="text-lg font-semibold text-blue-400">📘 Summary</h3>
              <ul className="list-disc list-inside text-blue-200 space-y-1 mt-2">
                {result.summary
                  .split('\n')
                  .filter((line) => line.trim().length > 0)
                  .map((line, index) => (
                    <li key={index}>{line.replace(/^\*+/, '').trim()}</li>
                  ))}
              </ul>
            </div>
          )}

          {result.error && (
            <p className="text-red-400 mt-2 flex items-center gap-2">
              <FaExclamationTriangle />
              {result.error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
