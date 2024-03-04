import TextSearch from "@/components/textSearch";

export default function Index() {
  return (
    <>
      <h1 className="mb-4 pt-10 text-4xl">全文検索のサンプル</h1>
      <div className="flex-1 w-full flex flex-col items-center pb-10">
        <TextSearch></TextSearch>
      </div>
    </>
  );
}
