"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { ReactNode, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export type IdentifiableObject = {
  id: string;
};

export type ExtensibleObject<T extends ReactNode> = {
  [key: string]: T;
};

export type Item<T extends ReactNode> = IdentifiableObject & {
  props: ExtensibleObject<T>;
};

export type DataSource<T> = (page: number, search?: string) => Promise<T[]>;

export type SearchableTableProps<V extends ReactNode, T extends Item<V>> = {
  keys: string[];
  dataSource: DataSource<T>;
};

export function SearchableTable<V extends ReactNode, T extends Item<V>>({
  keys,
  dataSource,
}: SearchableTableProps<V, T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string | undefined>("");
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
  }, 1000);

  useEffect(() => {
    (async () => setItems(await dataSource(page, search)))();
  }, [dataSource, page, search]);

  return (
    <>
      <TextField
        id="search"
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <TableContainer>
        <Table aria-label="Items">
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.entries(item.props).map(([key, value]) => (
                  <TableCell key={`${item.id}-${key}`}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
