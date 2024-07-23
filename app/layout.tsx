import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Link href="/" variant="h6" color="inherit" underline="none">Garage sale</Link>

                  <Divider sx={{ flexGrow: 1 }} orientation="vertical" color="inherit" />
                  <Link href="/items" variant="button" color="inherit" underline="none" sx={{ margin: 2 }}>Items</Link>
                  <Link href="/checkout" variant="button" color="inherit" underline="none" sx={{ margin: 2 }}>Checkout</Link>
                  <Link href="/transactions" variant="button" color="inherit" underline="none">Transactions</Link>
                </Toolbar>
              </AppBar>
              <Box sx={{ p: 2 }}>
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
