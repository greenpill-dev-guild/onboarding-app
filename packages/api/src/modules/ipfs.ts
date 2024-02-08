import { NFTStorage, File } from 'nft.storage'

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

export async function uploadAsset(asset: any) {

    if (!NFT_STORAGE_KEY) {
        console.error('NFT_STORAGE_KEY is not defined in environment variables.');
        return;
    }

    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    const data = await nftstorage.store({
        name: 'impact image',
        description: 'store the uploaded image',
        image: new File([asset], 'impact.png', { type: 'image/png' })
    });

    console.log("IPFS Url of the stored data: ", data.url);
    console.log("metadata: ", data.data);
}