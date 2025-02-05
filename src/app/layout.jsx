import { Inter, Playfair_Display } from 'next/font/google';
import { CartProvider } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: "Cozy Threads",
  description: "Sustainable and comfortable clothing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --background: #f9f6f1;
            --text-primary: #1a1a1a;
            --text-secondary: #666666;
          }
          
          body {
            background-color: var(--background);
            color: var(--text-primary);
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
      </body>
    </html>
  );
} 