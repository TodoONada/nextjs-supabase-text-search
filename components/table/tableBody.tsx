import { Database } from "@/types/supabase";

type Props = {
  tableData: Database["public"]["Tables"]["商品テーブル"]["Row"];
};

export default function TableBody({ tableData }: Props) {
  return (
    <>
      <td className="px-6 py-4">{tableData.name}</td>
      <td className="px-6 py-4">{tableData.count}</td>
      <td className="px-6 py-4">{tableData.price}</td>
      <td className="px-6 py-4">{tableData.category}</td>
    </>
  );
}
