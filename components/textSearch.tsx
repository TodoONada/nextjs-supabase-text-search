"use client";
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import TableHeader from "./table/tableHeader";
import TableBody from "./table/tableBody";
import SearchInput from "./searchInput";

export default function TextSearch() {
  const [productList, setProductList] = useState<
    Database["public"]["Tables"]["商品テーブル"]["Row"][]
  >([]);
  const getAllTableData = async () => {
    const { data, error } = await supabase.from("商品テーブル").select();

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);
    setProductList(data);
  };

  useEffect(() => {
    (async () => {
      await getAllTableData();
    })();
  }, []);

  return (
    <>
      <SearchInput tableData={setProductList}></SearchInput>
      <div className="relative overflow-x-auto overflow-y-auto h-96 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <TableHeader></TableHeader>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => (
              <tr className="odd:bg-white even:bg-gray-50 border-b" key={index}>
                <TableBody tableData={item}></TableBody>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
