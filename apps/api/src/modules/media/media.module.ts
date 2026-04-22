import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [MediaService],
  imports: [StorageModule],
  exports: [MediaService],
})
export class MediaModule {}
