import Typography from "@mui/material/Typography";
import { getSalesByDayAndType } from "./action";

export default async function Home() {
  let salesByMethodAndTime = await getSalesByDayAndType();
  return (
    <>
      <Typography variant="subtitle1">
        Welcome to our garage sale manager, which is made by mostly ko armi and
        nul skill in CHATGPT
      </Typography>
      <Typography variant="h2">Total</Typography>
      {salesByMethodAndTime.map((sale) => (
        <Typography key={`${sale.paymentMethod}-${sale.createdAt}`}>
          {sale.createdAt.toDateString()} - {sale.paymentMethod} - ${sale._sum.totalPrice?.toNumber()}
        </Typography>
      ))}
    </>
  );
}
