"use server";
import { getCurrentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { TemplateFolder } from "../lib/path-to-json";

export const createPlayground = async (data: {
  title: string;
  template: "REACTJS" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  description?: string;
}) => {
  const { template, title, description } = data;

  const user = await getCurrentUser();
  try {
    const playground = await db.playground.create({
      data: {
        title: title,
        description: description,
        template: template,
        userId: user?.id!,
      },
    });

    return playground;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPlaygroundForUser = async () => {
  const user = await getCurrentUser();
  try {
    const user = await getCurrentUser();
    const playground = await db.playground.findMany({
      where: {
        userId: user?.id!,
      },
      include: {
        user: true,
        StarMark: {
          where: {
            userId: user?.id!,
          },
          select: {
            isMarked: true,
          },
        },
      },
    });

    return playground;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaygroundById = async (id: string) => {
  try {
    const playground = await db.playground.findUnique({
      where: { id: id.trim() },
      select: {
        title: true,
        description: true,
        templateFiles: { select: { content: true } },
      },
    });

    return playground;
  } catch (error) {
    console.log("Error while getting playgroundby id ", error);
  }
};

export const SaveUpdatedCode = async (
  playgroundId: string,
  data: TemplateFolder
) => {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const updatedPlayground = await db.templateFile.upsert({
      where: { playgroundId },
      update: {
        content: JSON.stringify(data),
      },
      create: {
        playgroundId,
        content: JSON.stringify(data),
      },
    });

    return updatedPlayground;
  } catch (error) {}
};
