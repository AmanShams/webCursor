import {
  readTemplateStructureFromJson,
  saveTemplateStructureToJson,
} from "@/features/playground/lib/path-to-json";
import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template/template-path";
import path from "path";
import fs from "fs/promises";
import { NextRequest } from "next/server";
import validateJsonStructure from "@/lib/template/validate-json-structure";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return Response.json(
      { error: "Playground Id is Missing" },
      { status: 400 }
    );
  }

  const playground = await db.playground.findUnique({
    where: { id },
  });

  if (!playground) {
    return Response.json({ error: "Playground not Found" }, { status: 404 });
  }

  const templateKey = playground.template as keyof typeof templatePaths;
  const templatePath = templatePaths[templateKey];

  if (!templatePath) {
    return Response.json({ error: "Invalide Template" }, { status: 404 });
  }

  try {
    const inputPath = path.join(process.cwd(), templatePath);
    const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

    await saveTemplateStructureToJson(inputPath, outputFile);
    const result = await readTemplateStructureFromJson(outputFile);

    if (!validateJsonStructure(result.items)) {
      return Response.json(
        { error: "Invalide Json Structure" },
        { status: 404 }
      );
    }

    await fs.unlink(outputFile);

    return Response.json(
      { success: true, templateJson: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating template Json", error);
    return Response.json(
      { error: "Failed to generate template " },
      { status: 500 }
    );
  }
}
