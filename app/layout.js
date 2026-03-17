import './globals.css'

export const metadata = {
  title: 'KárpátHÍR – Kárpátalja • Ukrajna • Háború',
  description: 'Hírek Kárpátaljáról, Ukrajnából!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  )
}
