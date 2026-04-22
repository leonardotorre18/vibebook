import { Module } from '@nestjs/common';
import { AzureBlobStorageService } from './azure-blob-storage/azure-blob-storage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AzureBlobStorageService],
  imports: [ConfigModule],
  exports: [AzureBlobStorageService],
})
export class StorageModule {}
