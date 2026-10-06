// Sanitized adaptation for the public PPL Connect case study.
// This is not a production source file and contains no internal identifiers.

import { z } from "zod";

const principalSchema = z.object({
  identityProvider: z.string(),
  userId: z.string().min(1),
  userDetails: z.string().min(1),
  userRoles: z.array(z.string()).default([])
});

export type ClientPrincipal = z.infer<typeof principalSchema>;

export function parseAuthenticatedPrincipal(
  encodedPrincipal: string | null
): ClientPrincipal | null {
  if (!encodedPrincipal) {
    return null;
  }

  try {
    const decoded = Buffer.from(
      encodedPrincipal,
      "base64"
    ).toString("utf8");

    return principalSchema.parse(
      JSON.parse(decoded)
    );
  } catch {
    return null;
  }
}

export function requireMicrosoftAuthentication(
  principal: ClientPrincipal | null
): ClientPrincipal {
  if (
    !principal ||
    principal.identityProvider !== "aad" ||
    !principal.userRoles.includes("authenticated")
  ) {
    throw new Error(
      "Microsoft authentication is required."
    );
  }

  return principal;
}
