/*
  Proxy de Next.js para autenticacion/autorizacion por roles (RBAC).
  Flujo:
  1) Deja pasar rutas publicas.
  2) En /login, si ya hay sesion valida, redirige a la home del rol.
  3) En rutas protegidas, exige cookie session_token.
  4) Valida el JWT y revisa acceso por rol.
*/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultRoleRoute,
  isPublicRoute,
  isRouteAllowedForRole,
} from "@/config/routes";
import { verifySessionToken } from "@/lib/auth/jwt";

const createLoginUrl = (request: NextRequest, pathname: string) => {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "callbackUrl",
    `${pathname}${request.nextUrl.search}`,
  );
  return loginUrl;
};

const invalidTokenResponse = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("session_token");
  return response;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session_token")?.value;

  // 1. Manejo de rutas públicas
  if (isPublicRoute(pathname)) {
    // Si está en /login y tiene sesión válida, redirige a su home por rol
    if (sessionToken && pathname === "/login") {
      const user = await verifySessionToken(sessionToken);

      if (!user) {
        const response = NextResponse.next();
        response.cookies.delete("session_token");
        return response;
      }

      return NextResponse.redirect(
        new URL(defaultRoleRoute[user.role], request.url),
      );
    }

    return NextResponse.next();
  }

  // 2. Bloqueo si no hay token en ruta protegida
  if (!sessionToken) {
    return NextResponse.redirect(createLoginUrl(request, pathname));
  }

  // 3. Verificación de identidad
  const user = await verifySessionToken(sessionToken);

  if (!user) {
    return invalidTokenResponse(request);
  }

  // 4. Verificación de Autorización (RBAC)
  const hasAccess = isRouteAllowedForRole(user.role, pathname);

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/acceso-denegado", request.url));
  }

  // 5. Todo correcto, permitir paso
  return NextResponse.next();
}

export const config = {
  // Excluye rutas estáticas, API auth, y otras que no necesitan este proxy
  matcher: [
    "/((?!api/auth|_next/image|_next/static|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
