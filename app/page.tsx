"use client";

import Typography from "@mui/material/Typography";
import { getSalesByDayAndType, SalesByPaymentMethod } from "./action";
import { useEffect, useState } from "react";

export default function Home() {
  const [salesByMethodAndTime, setSalesByMethodAndTime] = useState<
    SalesByPaymentMethod[] | undefined
  >();

  useEffect(() => {
    (async () => setSalesByMethodAndTime(await getSalesByDayAndType()))();
  }, []);

  return (
    <>
      <Typography variant="subtitle1">
        Welcome to our garage sale manager, which is made by mostly ko armi and
        nul skill in CHATGPT
      </Typography>
      <Typography variant="h2">Total</Typography>
      {salesByMethodAndTime?.map((sale) => (
        <Typography key={`${sale.paymentMethod}-${sale.createdAt}`}>
          {sale.createdAt.toDateString()} - {sale.paymentMethod} - ${sale.sum}
        </Typography>
      ))}
    </>
  );
}
