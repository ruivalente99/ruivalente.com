import { NextResponse } from "next/server";
import certificatesData from "@/lib/data/certificates.json";

/**
 * @swagger
 * /api/certificates:
 */
export async function GET() {
  try {
    return NextResponse.json(certificatesData.certificates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 },
    );
  }
}
