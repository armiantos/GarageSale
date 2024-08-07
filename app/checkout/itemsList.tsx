import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { getInStockItems } from "../action";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

type ItemListProps = {
  filter?: string;
  onAddItem: any;
  onRemoveItem: any;
};

export default function ItemsList({
  filter,
  onAddItem,
  onRemoveItem,
}: ItemListProps) {
  const [items, setItems] = useState<
    {
      price: number;
      donator: { name: string } | null;
      id: string;
      description: string;
      donatorId: number | null;
      stock: number | null;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      const items = await getInStockItems(filter);
      setItems(items);
    })();
  }, [filter]);

  return (
    <TableContainer>
      <Table aria-label="Items">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>${item.price.toLocaleString()}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button onClick={() => onRemoveItem(item)}>
                    <Remove />
                  </Button>
                  <Button onClick={() => onAddItem(item)}>
                    <Add />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
