import { apiClient } from "./axios"

export async function uploadAsset(media: any) {
    try {
        await  apiClient.post("assets/upload", { media });
    } catch (error) {
        console.log(error);
    }
}