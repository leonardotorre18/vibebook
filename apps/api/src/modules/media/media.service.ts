import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { AzureBlobStorageService } from '../storage/azure-blob-storage/azure-blob-storage.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MediaService {
  private containerName = 'products-images'
  constructor (private readonly storage: AzureBlobStorageService) {}

  async processAndUploadImage(file: Express.Multer.File) {
    const [image, thumb] = await Promise.all([
      sharp(file.buffer)
        .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer({ resolveWithObject: true }),
      sharp(file.buffer)
        .resize(400, 400, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer({ resolveWithObject: true }),
    ])

    const id = uuidv4();
    const storageKey = `${id}.webp`
    const thumbnailStorageKey = `thumbnails/${id}.webp`
    const mimetype = 'image/webp';

    const [url, thumbnailUrl] = await Promise.all([
      this.storage.uploadImage(image.data, mimetype, this.containerName, storageKey),
      this.storage.uploadImage(thumb.data, mimetype, this.containerName, thumbnailStorageKey),
    ])
    

    return {
      mimetype,
      url,
      storageKey,
      thumbnailUrl,
      thumbnailStorageKey,
      width: image.info.width,
      height: image.info.height,
      fileSizeBytes: image.info.size
    }
  }

  async delete(file: any) {
    this.storage.delete(file.storageKey, this.containerName)
    this.storage.delete(file.thumbnailStorageKey, this.containerName)
  }
}
