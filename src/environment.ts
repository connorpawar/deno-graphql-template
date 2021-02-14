import "https://deno.land/x/dotenv/load.ts";

export const PORT =  Deno.env.get("PORT") || 8080;

export const dbName = Deno.env.get("DB_NAME") || "deno_template";
export const dbHostUrl = Deno.env.get("DB_HOST_URL") || "127.0.0.1";
export const dbUserame = Deno.env.get("DB_USERNAME") || "root";
export const dbPassword = Deno.env.get("DB_PASSWORD") || "";

export const jwtKey = Deno.env.get("JWT_SECRET_KEY") || "some-random-secret-key";