"use client";

import { Input } from "@/components/ui/Input";

export const ActivityFilter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
      <Input type="date" label="Dari Tanggal" />
      <Input type="date" label="Sampai Tanggal" />
    </div>
  );
};
