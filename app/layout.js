import './globals.css'

export const metadata = {
  title: 'MUSICweb® Listing Manager',
  description: 'Create and manage your record listings',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
