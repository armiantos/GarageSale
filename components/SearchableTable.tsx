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
import { ReactNode } from "react";
import { useDebouncedCallback } from "use-debounce";

export type IdentifiableObject<T extends ReactNode> = {
  id: string;
  props: {
    [key: string]: T;
  };
};

export type SearchableTableProps<
  V extends ReactNode,
  T extends IdentifiableObject<V>
> = {
  data: T[];
  keys: string[];
  onSearch: (searchTerm: string) => Promise<void>;
};

export function SearchableTable<
  V extends ReactNode,
  T extends IdentifiableObject<V>
>({ data, keys, onSearch }: SearchableTableProps<V, T>) {
  const handleSearch = useDebouncedCallback(onSearch, 1000);

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
            {data?.map((entry) => (
              <TableRow
                key={entry.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.entries(entry.props).map(([key, value]) => (
                  <TableCell key={`${entry.id}-${key}`}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
