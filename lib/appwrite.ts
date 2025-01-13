import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import * as linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  paltform: "com.app.restate",
  api_endpoint: process.env.EXPO_PUPLIC_APPWRITE_ENDPOINT!,
  project_id: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  database_id: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  agents_id: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID!,
  gallery_id: process.env.EXPO_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID!,
  reviews_id: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!,
  properties_id: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID!,
};

export const client = new Client()
  .setProject(config.project_id)
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setPlatform(config.paltform);

const avatar = new Avatars(client);
const account = new Account(client);
export const database = new Databases(client);

export async function login() {
  try {
    const redirectUrl = linking.createURL("/");
    const res = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );
    if (!res) throw new Error("Failed to login");
    const result = await openAuthSessionAsync(res.toString(), redirectUrl);
    if (result.type !== "success")
      throw new Error("Failed to login with Google");
    const url = new URL(result.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Invalid secret or userId");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");
    return true;
  } catch (e) {
    console.error(e);
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (e) {
    console.error(e);
  }
}

export async function getUser() {
  try {
    const res = await account.get();
    if (res.$id) {
      const userAvatar = avatar.getInitials(res.name);
      return {
        ...res,
        avatar: userAvatar.toString(),
      };
    }
  } catch (e) {}
}

export async function getLatestProperties() {
  try {
    const result = await database.listDocuments(
      config.database_id,
      config.properties_id,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return result.documents;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const q = [Query.orderDesc("$createdAt")];
    if (filter && filter !== "All") q.push(Query.equal("type", filter));
    if (query) {
      q.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("description", query),
          Query.search("type", query),
        ])
      );
    }

    if (limit) q.push(Query.limit(limit));
    const result = await database.listDocuments(
      config.database_id,
      config.properties_id,
      q
    );
    return result.documents;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const res = await database.getDocument(
      config.database_id,
      config.properties_id,
      id
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}
