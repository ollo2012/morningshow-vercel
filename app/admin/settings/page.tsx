"use client";

import { useState, useEffect } from "react";

interface Profile {
  id: string;
  name: string;
  interneKommunikation: string;
  unternehmensprofil: string;
}

export default function SettingsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string>("");
  const [name, setName] = useState("");
  const [interneKommunikation, setInterneKommunikation] = useState("");
  const [unternehmensprofil, setUnternehmensprofil] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const res = await fetch("/api/settings");
    if (res.ok) {
      const data = await res.json();
      setProfiles(data.profiles || []);
      setCurrentProfileId(data.currentProfileId || "");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        interneKommunikation,
        unternehmensprofil,
      }),
    });
    if (res.ok) {
      setName("");
      setInterneKommunikation("");
      setUnternehmensprofil("");
      fetchProfiles();
    }
    setLoading(false);
  };

  const handleSelectProfile = async (id: string) => {
    setCurrentProfileId(id);
    await fetch("/api/settings/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProfiles();
  };

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Profileinstellungen</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Verwalte Kommunikations- und Unternehmensprofile</p>
        </header>

        <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Neues Profil anlegen</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              placeholder="Profilname"
              required
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Interne Kommunikation"
              required
              rows={3}
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={interneKommunikation}
              onChange={(e) => setInterneKommunikation(e.target.value)}
            />
            <textarea
              placeholder="Unternehmensprofil"
              required
              rows={3}
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={unternehmensprofil}
              onChange={(e) => setUnternehmensprofil(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black dark:bg-zinc-50 dark:text-black text-white rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {loading ? "Speichern..." : "Profil speichern"}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Profile</h2>
          {profiles.length === 0 ? (
            <p className="text-zinc-500">Noch keine Profile.</p>
          ) : (
            <ul className="space-y-4">
              {profiles.map((profile) => (
                <li key={profile.id} className={`p-4 rounded border ${currentProfileId === profile.id ? "border-blue-500 bg-blue-50 dark:bg-zinc-800" : "border-zinc-200 dark:border-zinc-800"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-zinc-900 dark:text-zinc-50">{profile.name}</span>
                    <button
                      onClick={() => handleSelectProfile(profile.id)}
                      disabled={currentProfileId === profile.id}
                      className={`ml-4 px-3 py-1 rounded ${currentProfileId === profile.id ? "bg-blue-500 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"}`}
                    >
                      {currentProfileId === profile.id ? "Aktiv" : "Aktivieren"}
                    </button>
                  </div>
                  <div className="mb-1 text-sm text-zinc-700 dark:text-zinc-300"><strong>Interne Kommunikation:</strong> {profile.interneKommunikation}</div>
                  <div className="text-sm text-zinc-700 dark:text-zinc-300"><strong>Unternehmensprofil:</strong> {profile.unternehmensprofil}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
