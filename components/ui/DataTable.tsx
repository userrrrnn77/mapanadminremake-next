"use client";

import React from "react";
import { Card } from "./Card";

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  renderCard: (item: T) => React.ReactNode; // Tampilan buat mobile
  isLoading?: boolean;
}

export function DataTable<T>({
  headers,
  data,
  renderRow,
  renderCard,
  isLoading,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full py-10 text-center animate-pulse text-zinc-500">
        Lagi narik data, sabar bre...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* --- Tampilan TABLE (Desktop) --- */}
      <div className="hidden md:block overflow-x-auto">
        <Card>
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 border-b dark:border-zinc-800">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-zinc-800">
              {data.length > 0 ? (
                data.map((item) => renderRow(item))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="p-10 text-center text-zinc-500">
                    Data kosong, bgsd!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      {/* --- Tampilan CARDS (Mobile) --- */}
      <div className="md:hidden flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((item, i) => (
            <Card key={i} className="p-4">
              {renderCard(item)}
            </Card>
          ))
        ) : (
          <div className="p-10 text-center text-zinc-500">
            Data kosong
          </div>
        )}
      </div>
    </div>
  );
}
