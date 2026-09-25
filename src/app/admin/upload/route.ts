import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-session";

/** Types de fichiers acceptés par dossier (photos produit, certificats d'analyse). */
const FOLDERS: Record<string, string[]> = {
  "product-images": ["image/jpeg", "image/png", "image/webp", "image/avif"],
  certificates: ["application/pdf"],
};

const MAX_BYTES = 15 * 1024 * 1024;

/**
 * Délivre au navigateur une URL d'envoi présignée (usage unique, 10 minutes)
 * vers Vercel Blob. Réservé à l'admin connecté : le fichier part ensuite
 * directement du navigateur vers Vercel Blob, sans passer par le serveur.
 * Sur Vercel, l'accès au stockage se fait par OIDC (BLOB_STORE_ID), ou à
 * défaut par BLOB_READ_WRITE_TOKEN.
 */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = (await request.json()) as HandleUploadPresignedBody;
  try {
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        const allowed = FOLDERS[pathname.split("/")[0]];
        if (!allowed) throw new Error("Dossier inconnu.");
        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          allowedContentTypes: allowed,
          maximumSizeInBytes: MAX_BYTES,
          validUntil: Date.now() + 10 * 60 * 1000,
        });
        return {
          token,
          urlOptions: { allowedContentTypes: allowed, maximumSizeInBytes: MAX_BYTES, cacheControlMaxAge: 31536000 },
        };
      },
    });
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
