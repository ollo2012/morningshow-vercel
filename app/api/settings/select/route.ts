import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const currentProfilePath = path.join(process.cwd(), "data/settings_current.json");

const ensureFile = () => {
  const dir = path.dirname(currentProfilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(currentProfilePath)) {
    fs.writeFileSync(currentProfilePath, JSON.stringify({ currentProfileId: "" }));
  }
};

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    ensureFile();
    fs.writeFileSync(currentProfilePath, JSON.stringify({ currentProfileId: id }));
    return NextResponse.json({ currentProfileId: id });
  } catch (error) {
    console.error("Failed to set current profile:", error);
    return NextResponse.json({ error: "Set failed" }, { status: 500 });
  }
}
