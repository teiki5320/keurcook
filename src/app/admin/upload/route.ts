import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-session";

/** Types de fichiers acceptés par dossier (photos produit, certificats d'analyse). */
const FOLDERS: Record<string, string[]> = {
  "product-images": ["image/jpeg", "image/png", "image/webp", "image/avif"],
  certificates: ["application/pdf"],
};

/**
 * Délivre au navigateur un jeton d'envoi à usage unique vers Vercel Blob.
 * Réservé à l'admin connecté : le fichier part ensuite directement du
 * navigateur vers Vercel Blob, sans passer par le serveur.
 */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const allowed = FOLDERS[pathname.split("/")[0]];
        if (!allowed) throw new Error("Dossier inconnu.");
        return {
          allowedContentTypes: allowed,
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 31536000,
        };
      },
    });
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
