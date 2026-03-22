import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Mistral } from "@mistralai/mistralai";
// import settings from "@/data/settings.json";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/announcements.json");
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

// Helper to ensure directory and file exist
const ensureFile = () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

// ADD THIS: This handles the "Refresh" or page load
export async function GET() {
  try {
    ensureFile();
    const fileData = fs.readFileSync(filePath, "utf8");
    const announcements = JSON.parse(fileData);
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Failed to read announcements:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, date, importance } = await req.json();
    // Generate an AI output text
    let text = title; // Initialize with original text in case AI fails
    // Fetch context from current selected profile
    const currentProfilePath = path.join(process.cwd(), "data/settings_current.json");
    const profilesPath = path.join(process.cwd(), "data/settings_profiles.json");
    let interneKommunikation = "";
    let unternehmensprofil = "";
    try {
      const { currentProfileId } = JSON.parse(fs.readFileSync(currentProfilePath, "utf8"));
      const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
      const profile = profiles.find((p: any) => p.id === currentProfileId);
      if (profile) {
        interneKommunikation = profile.interneKommunikation || "";
        unternehmensprofil = profile.unternehmensprofil || "";
      }
    } catch (e) {
      console.error("Profile context error", e);
    }

    const systemContext = `
      Du willst eine 2 Sätze lange Ankündigung für unseren internen Kommunikationskanal erstellen.
      Berücksichtige dabei immer, dass wir ggf. auch die Kunden informieren.
      Du hast folgende Unternehmensrichtlinen zu beachten:
      - Firmenprofil: ${unternehmensprofil}
      - Interner Kommunikationsstil: ${interneKommunikation}

      TASK:
      Gib mir eine 2 Sätze lange, ansprechende Ankündigung ohne Überschrift und Anführungszeichen.
    `;
    
    try {
      const response = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content: systemContext
          },
          {
            role: "user",
            // The user only provides the raw data to be processed
            content: JSON.stringify({ title, text })
          }
        ],
        responseFormat: { type: "text" },
      });
      
      const content = response.choices?.[0]?.message?.content;
      if (content) {
        console.log("Success! New Description:", content);
        text = content; // Override the original text with the AI-generated description
      }
    } catch (error) {
      console.error("AI Processing Error:", error);
    }
    
    ensureFile();

    const announcements = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    const newEntry = {
      id: Date.now().toString(),
      title,
      text,
      date,
      author: session.user?.name || "Unknown",
      importance: !!importance,
    };

    announcements.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(announcements, null, 2));

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Failed to save announcement:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    ensureFile();
    const fileData = fs.readFileSync(filePath, "utf8");
    let announcements = JSON.parse(fileData);

    const exists = announcements.find((item: any) => item.id === id);
    if (!exists) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    const filteredAnnouncements = announcements.filter((item: any) => item.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(filteredAnnouncements, null, 2));

    return NextResponse.json({ message: "Announcement deleted" });
  } catch (error) {
    console.error("Failed to delete announcement:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}