import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { CartProductsSummary } from "../Checkout/components/CartProductsSummary/CartProductsSummary";
import { BillingSummary } from "../Checkout/components/BillingSummary/BillingSummary";
import { DeliveryAddress } from "../Checkout/components/DeliveryAddress/DeliveryAddress";
import { useState } from "react";
import { useEffect } from "react";
import { products } from "../backend/db/products";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cart_data"));
    console.log(products);
    const data = products.filter((id) => local.includes(id._id));
    setItem(data);

    const totalAmount = data.reduce(
      (sum, item) => sum + (item.original_price - 2480),
      0
    );
    setTotal(totalAmount);
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <h1>In Your Bag</h1>
        {item?.map((it) => (
          <>
            <CartProductsSummary item={it} />
          </>
        ))}
        <BillingSummary total={total} />

        <DeliveryAddress />
      </List>
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={6} sx={{ color: "grey", ml: 4 }}>
          <Typography variant="h6">Payment details</Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
