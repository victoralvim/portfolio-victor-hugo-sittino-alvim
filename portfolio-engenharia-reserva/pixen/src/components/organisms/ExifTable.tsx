import * as React from "react";
import ExifRow from "@/components/molecules/ExifRow";

interface ExifField {
  tag: string;
  value: string | number;
}

interface ExifTableProps {
  fields: ExifField[];
}

export default function ExifTable({ fields }: ExifTableProps) {
  if (!fields || fields.length === 0) {
    return (
      <div className="p-8 text-center text-[#a1b1b6]/70 border border-[#a1b1b6]/30 bg-[#556d78]">
        Nenhum dado Exif encontrado para este arquivo.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-[#a1b1b6]/30">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#002d36] text-[#a1b1b6]">
          <tr>
            <th className="py-3 px-4 text-sm font-bold w-1/3">Tag</th>
            <th className="py-3 px-4 text-sm font-bold">Valor</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <ExifRow
              key={`${field.tag}-${index}`}
              tag={field.tag}
              value={field.value}
              isEven={index % 2 === 1} // 0-indexed, so odd index = even row visually
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
