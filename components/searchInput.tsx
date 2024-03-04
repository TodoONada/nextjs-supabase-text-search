import { Dispatch, SetStateAction, useState } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { Database } from "@/types/supabase";

export default function SearchInput(props: {
  tableData: Dispatch<
    SetStateAction<Database["public"]["Tables"]["商品テーブル"]["Row"][]>
  >;
}) {
  const [tableRadio, setTableRadio] = useState("name");
  const [searchMethod, setSearchMethod] = useState("|");
  const [searchText, setSearchText] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    // 半角と全角両方
    const searchTexts = searchText.split(/[\s\u3000]+/);
    let result = `'${searchTexts[0]}'`;
    if (searchTexts.length > 1) {
      for (let index = 1; index < searchTexts.length; index++) {
        const element = searchTexts[index];
        result += ` ${searchMethod} `;
        result += `'${element}'`;
      }
    }

    const { data, error } = await supabase
      .from("商品テーブル")
      .select()
      .textSearch(tableRadio, result);

    if (error) {
      console.log(error);
      return;
    }

    props.tableData(data);
  };
  return (
    <form className="max-w-lg mx-auto pb-5" onSubmit={onSubmit}>
      <p>商品情報</p>
      <ul className="flex w-full flex-wrap text-sm font-medium text-gray-900 bg-white pb-5">
        <li className="border border-gray-200 rounded-lg m-1">
          <div className="flex items-center px-3">
            <input
              id="name"
              type="radio"
              value="name"
              name="product-radio"
              defaultChecked
              onChange={(e) => setTableRadio(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="name"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
            >
              商品名
            </label>
          </div>
        </li>
        <li className="border border-gray-200 rounded-lg m-1">
          <div className="flex items-center px-3">
            <input
              id="count"
              type="radio"
              value="count"
              name="product-radio"
              onChange={(e) => setTableRadio(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="count"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
            >
              在庫
            </label>
          </div>
        </li>
        <li className="border border-gray-200 rounded-lg m-1">
          <div className="flex items-center px-3">
            <input
              id="price"
              type="radio"
              value="price"
              name="product-radio"
              onChange={(e) => setTableRadio(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="price"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
            >
              値段
            </label>
          </div>
        </li>
        <li className="border border-gray-200 rounded-lg m-1">
          <div className="flex items-center px-3">
            <input
              id="category"
              type="radio"
              value="category"
              name="product-radio"
              onChange={(e) => setTableRadio(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="category"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
            >
              カテゴリー
            </label>
          </div>
        </li>
      </ul>
      <p>検索方法</p>
      <ul className="flex w-full flex-wrap text-sm font-medium text-gray-900 bg-white">
        <li className="border border-gray-200 rounded-lg m-1">
          <div className="flex items-center px-3">
            <input
              id="or"
              type="radio"
              value="|"
              name="method-radio"
              defaultChecked
              onChange={(e) => setSearchMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="or"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
            >
              OR検索
            </label>
          </div>
        </li>
        <li className="border border-gray-200 rounded-lg m-1">
          <div className="flex items-center px-3">
            <input
              id="and"
              type="radio"
              value="&"
              name="method-radio"
              onChange={(e) => setSearchMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
            />
            <label
              htmlFor="and"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
            >
              AND検索
            </label>
          </div>
        </li>
      </ul>
      <div>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="検索欄"
            onChange={(e) => setSearchText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
