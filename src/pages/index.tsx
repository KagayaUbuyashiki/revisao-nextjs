import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  useEffect(() => {
    async function buscaClientes(){
      const response = await fetch('http://localhost:3000/api/list/cliente')
      const data = await response.json()

      console.log('data', data)
    }
    buscaClientes()
  }, [])
  return (
    <>
      <h1>Teste</h1>
    </>
  );
}
