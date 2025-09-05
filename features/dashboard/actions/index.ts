"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { TemplateFolder } from "@/features/playground/lib/path-to-json";
import { getCurrentUser } from "@/features/auth/actions";

export const toggleStarMarked = async (
  playgroundId: string,
  isChecked: boolean
) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    if (isChecked) {
      await db.starMark.create({
        data: {
          userId: userId!,
          playgroundId,
          isMarked: isChecked,
        },
      });
    } else {
      await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId,
          },
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true, isMarked: isChecked };
  } catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const editProjectById = async (
  id: string,
  data: { title: string; description: string }
) => {
  try {
    await db.playground.update({
      where: { id },
      data: data,
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const duplicateProjectById = async (id: string) => {
  try {
    // Fetch the original playground data
    const originalPlayground = await db.playground.findUnique({
      where: { id },
      include: {
        templateFiles: true, // Include related template files
      },
    });

    if (!originalPlayground) {
      throw new Error("Original playground not found");
    }

    // Create a new playground with the same data but a new ID
    const duplicatedPlayground = await db.playground.create({
      data: {
        title: `${originalPlayground.title} (Copy)`,
        description: originalPlayground.description,
        template: originalPlayground.template,
        userId: originalPlayground.userId,
        templateFiles: {
          // @ts-ignore
          create: originalPlayground.templateFiles.map((file) => ({
            content: file.content,
          })),
        },
      },
    });

    // Revalidate the dashboard path to reflect the changes
    revalidatePath("/dashboard");

    return duplicatedPlayground;
  } catch (error) {
    console.error("Error duplicating project:", error);
  }
};
