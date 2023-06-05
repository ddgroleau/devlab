import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import {ServerResponses} from "@/models/ServerResponses";
import {CacheOptions} from "@/models/CacheOptions";

export const resolveResponse = async (response:Response) => {
    const isPlainText = response.headers.get("Content-Type") === "text/plain";
    const plainTextMessage = async (fallbackMsg:string) =>
        !isPlainText || !response.body ? fallbackMsg : await response.text();

    switch (response.status) {
    case 200 || 201:
        return { success: true, message: ServerResponses.Success };
    case 400:
        return { success: false, message: await plainTextMessage(ServerResponses.BadRequest) };
    case 404 :
        return { success: false, message: ServerResponses.NotFound };
    case 500:
        return { success: false, message: ServerResponses.InternalServerError };
    default:
        return { success: false, message: ServerResponses.NoConnection };
    }
};

export interface ApiRequest {
    path:string,
    headers?:[string, string][] | Record<string, string> | Headers
    redirectPath?:string
    cacheOption?:CacheOptions,
    cacheTimeToLive?:number
}

export const apiRequest = async <T>(
    { path, headers, redirectPath, cacheOption = CacheOptions.Indefinite, cacheTimeToLive}:ApiRequest
):Promise<T> => {
    const baseApiUri = process.env.NEXT_PUBLIC_API_URI;

    if (!baseApiUri) throw new Error("Invalid Configuration");

    let options;

    switch (cacheOption) {
    case CacheOptions.Indefinite:
        options = { method: "GET", headers: { ...headers, "Cache-Control": CacheOptions.Indefinite } };
        break;
    case CacheOptions.NoStore:
        options = { method: "GET", headers: { ...headers, "Cache-Control": CacheOptions.NoStore } };
        break;
    case CacheOptions.Revalidate:
        options = { method: "GET", headers: headers, next: { revalidate: cacheTimeToLive ?? 0 } };
        break;
    default:
        options = { method: "GET", headers: headers };
        break;
    }

    const res = await fetch(baseApiUri + path, options);
    const resolvedResponse = await resolveResponse(res);

    redirectPath = !redirectPath ? "" : redirectPath;

    if (!resolvedResponse.success) {
        return redirect((redirectPath + `?error=${encodeURIComponent(resolvedResponse.message)}`);
    }

    const jsonResponse =  await res.json();

    if(!jsonResponse || (jsonResponse instanceof Array  && jsonResponse.length < 1)) {
        const errorRedirect = redirectPath + `?error=${encodeURIComponent(ServerResponses.NoRecordsForSearchCriteria)}`;
        return redirect(errorRedirect,RedirectType.replace);
    }

    return jsonResponse;
};