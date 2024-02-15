'use client';
import PrintableGame, { Task } from '@/components/PrintableGame';
import { useState } from 'react';

export default function PrintConfiguration({ tasks }: { tasks: Task[] }) {
  const [copies, setCopies] = useState<number>(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (typeof value === 'number' && value > 0) {
      setCopies(value);
    }
  };

  return (
    <main className="min-h-screen">
      <div
        className="flex w-full justify-center pr-40 flex-col mt-24 mx-auto print:hidden"
        style={{ width: 723 }}
      >
        <div>
          <label className="text-gold">Copies:</label>
          <input
            type="number"
            className="print:hidden w-32 ml-6 border border-lightGold rounded-sm pl-2"
            placeholder="How many copies?"
            value={copies}
            onChange={handleChange}
          />
        </div>
        <p className="text-gold mt-6 mb-4">Print Preview:</p>
      </div>
      {Array.from({ length: copies }).map((_, index) => {
        return (
          <div
            className={`${index === 0 ? '' : 'screen:hidden'} ${index !== copies - 1 ? 'break-after-page' : ''} `}
            key={index}
          >
            <PrintableGame tasks={tasks} key={index} />
          </div>
        );
      })}
    </main>
  );
}
