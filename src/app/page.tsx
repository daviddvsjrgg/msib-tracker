import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Head from "next/head";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Head>
        <title>MSIB Tracker | Tracker MSIB Terbaik di Indonesia</title>
        <meta name="description" content="Lacak kemajuan MSIB Anda dengan mudah menggunakan tracker kami yang ramah pengguna." />
        <meta name="keywords" content="MSIB, tracker, tracker MSIB, kemajuan MSIB, update MSIB, pendidikan Indonesia" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://msib8-tracker.firebaseapp.com" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="MSIB Tracker | Tracker MSIB Terbaik di Indonesia" />
        <meta property="og:description" content="Lacak kemajuan MSIB Anda dengan mudah." />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/msib8-tracker.appspot.com/o/msib8-tracker-logo.png?alt=media&token=4317e835-2a7e-40c3-ac73-0f78096d3f61" />
        <meta property="og:url" content="https://msib8-tracker.firebaseapp.com" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <Table />
      <Footer />
    </main>
  );
}
