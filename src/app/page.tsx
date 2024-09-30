import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Table />
      <Footer />
    </main>
  );
}
