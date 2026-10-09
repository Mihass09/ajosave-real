

export const metadata = {
  title: "AjoSave",
  description: "Save Together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{margin:0, fontFamily:'sans-serif'}}>
        {children}
      </body>
    </html>
  );
}
