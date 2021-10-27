import { Request, Response } from 'express';
import authenticateBefore from '../middleware/Authenticate';
import { BlobServiceClient } from '@azure/storage-blob'
import wording from '../config/Word';

export default class ImageController {

  @authenticateBefore
  public async uploadImage(req: Request, res: Response) {
    try{
      const name = req.query.name.toString() || null;
      if(!req.files || !name){
        res.status(401).json({
          success: false,
          message: wording.imageNotFound
        });
      } else{
        const blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = await blobServiceClient.getContainerClient("images");
        const blockBlobClient = await containerClient.getBlockBlobClient(name);
        const data = (req.files.image as any).data;
        await blockBlobClient.upload(data, data.length);
        const blockBlobuploaded =  await containerClient.getBlockBlobClient(name);
        await res.send({ status: true, url: blockBlobuploaded.url, message: 'File is uploaded' })
      }
      } catch(err){
        console.dir(err)
        res.status(500).send(err);
      } 
  }
}