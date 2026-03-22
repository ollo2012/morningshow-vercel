import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 
import { Mistral } from "@mistralai/mistralai";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/products.json");
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
    const products = JSON.parse(fileData);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to read products:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const apiKey = req.headers.get("x-api-token");

  // Allow if EITHER session exists OR valid API Key is provided
  if (!session && apiKey !== process.env.SYNC_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, text, date } = await req.json();
    ensureFile();

    let new_description = text; // Initialize with original text in case AI fails
    
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
    Du willst eine 2 Sätze lange Beschreibung für unseren internen Kommunikationskanal erstellen.
    Du hast folgende Unternehmensrichtlinen zu beachten:
    - Firmenprofil: ${unternehmensprofil}
    - Interner Kommunikationsstil: ${interneKommunikation}
    
    TASK:
    Gib mir eine 2 Sätze lange, ansprechende Beschreibung ohne Überschrift und Emojis and Quotes.
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
        new_description = content; // Override the original text with the AI-generated description
      }
    } catch (error) {
      console.error("AI Processing Error:", error);
    }
    
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    const newEntry = {
      id: Date.now().toString(),
      title,
      text: `${new_description}\n\nOriginal: "${text}"`,
      date,
      author: session?.user?.name || "Unknown"
    };

    products.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Failed to save product:", error);
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
    let products = JSON.parse(fileData);

    const exists = products.find((item: any) => item.id === id);
    if (!exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const filteredProducts = products.filter((item: any) => item.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}