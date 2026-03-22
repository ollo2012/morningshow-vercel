"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Products {
  id: string;
  title: string;
  text: string;
  date: string;
  author: string;
}

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [products, setProducts] = useState<Products[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // Status für das Löschen

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    fetchProducts();
  }, [status, router]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        text,
        date: new Date().toLocaleDateString(),
      }),
    });

    if (res.ok) {
      setTitle("");
      setText("");
      fetchProducts();
    }
    setLoading(false);
  };

 const handleDelete = async (id: string) => {
    setDeletingId(id);
    
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((item) => item.id !== id));
      } else {
        alert("Fehler beim Löschen");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading") return <div className="p-8">Lädt...</div>;
  if (!session) return null;

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Products</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Willkommen zurück, {session.user?.name}</p>
        </header>

        <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Neues Produkt posten</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Titel"
              required
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Inhalt..."
              required
              rows={4}
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black dark:bg-zinc-50 dark:text-black text-white rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {loading ? "Wird gepostet..." : "Posten"}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Aktuelle Produkte</h2>
          {products.length === 0 ? (
            <p className="text-zinc-500">Noch keine Produkte.</p>
          ) : (
            products.slice().reverse().map((item) => (
              <div key={item.id} className="group relative p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-zinc-500">{item.date}</span>
                    
                    <button 
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-red-500 hover:text-red-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    >
                      {deletingId === item.id ? "..." : "Löschen"}
                    </button>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{item.text}</p>
                <div className="mt-4 text-xs text-zinc-400">Gepostet von {item.author}</div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}