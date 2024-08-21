import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import TableCell from "@mui/material/TableCell";
import { SearchableTable } from "@/components/SearchableTable";
import { getInStockItems } from "./action";

type Item = Awaited<ReturnType<typeof getInStockItems>>["values"][0];

type ItemListProps = {
  filter?: string;
  onAddItem: (itemToAdd: Item) => void;
  onRemoveItem: (itemToRemove: Item) => void;
};

export default function ItemsList({ onAddItem, onRemoveItem }: ItemListProps) {
  const additionalColumnRenderer = (item: Item) => (
    <TableCell>
      <ButtonGroup variant="contained" aria-label="actions">
        <Button onClick={() => onRemoveItem(item)}>
          <Remove />
        </Button>
        <Button onClick={() => onAddItem(item)}>
          <Add />
        </Button>
      </ButtonGroup>
    </TableCell>
  );

  return (
    <SearchableTable
      dataSource={getInStockItems}
      keys={["id", "description", "price", "stock"]}
      additionalColumnRenderer={additionalColumnRenderer}
    />
  );
}
