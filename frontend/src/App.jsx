import { Toaster } from "sonner";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Features from "./components/home/Features";
import Protocol from "./components/home/Protocol";

import Dashboard from "./components/vault/Dashboard";
import Aurora from "./components/ui/Aurora";
import ScrollTop from "./components/ui/ScrollTop";
import { VaultProvider } from "./context/VaultContext";

export default function App() {
  return (
    <VaultProvider>
      <Aurora />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Features />
        <Protocol />
        <Dashboard />
      </main>

      <Footer />
      <ScrollTop />

      {/* Replaces the blocking alert() calls the old flow used for every result. */}
      <Toaster
        theme="dark"
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "var(--surface-raised)",
            border: "1px solid var(--gold-line)",
            color: "var(--text)",
          },
        }}
      />
    </VaultProvider>
  );
}
