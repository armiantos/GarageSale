import { SearchableTable } from "@/components/SearchableTable";
import { getItems } from "./action";

export default async function ItemsList() {
  return (
    <SearchableTable
      dataSource={getItems}
      keys={["id", "description", "price", "stock", "donator"]}
    />
  );
}
