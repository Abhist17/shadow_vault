import { Toaster } from "sonner";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Features from "./components/home/Features";
import Protocol from "./components/home/Protocol";

import Dashboard from "./components/vault/Dashboard";
import { VaultProvider } from "./context/VaultContext";

export default function App() {
  return (
    <VaultProvider>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Features />
        <Protocol />
        <Dashboard />
      </main>

      <Footer />

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-raised)",
            border: "1px solid var(--line-strong)",
            borderRadius: "4px",
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          },
        }}
      />
    </VaultProvider>
  );
}
