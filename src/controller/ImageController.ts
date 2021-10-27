import { Request, Response } from 'express';
import authenticateBefore from '../middleware/Authenticate';
import { BlobServiceClient } from '@azure/storage-blob'

export default class ImageController {

  @authenticateBefore
  public async uploadImage(req: Request, res: Response, status?: any) {
    try{
      if(!req.files){
        res.send({
          status: false,
          message : 'no file uploaded'
        });
      } else{
        const blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = await blobServiceClient.getContainerClient("images");
        const blockBlobClient = await containerClient.getBlockBlobClient(req.body.name);
        const data = (req.files.image as any).data;
        await blockBlobClient.upload(data, data.length);
        const blockBlobuploaded =  await containerClient.getBlockBlobClient(req.body.name);
        await res.send({ status: true, url: blockBlobuploaded.url, message: 'File is uploaded' })
      }
      } catch(err){
        res.status(500).send(err);
      } 
  }
}