import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CloudinaryService } from '../../../core/services/image-upload/cloudinary.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  @Input() imageUrl: string | null = null;
  @Input() type: 'profilePic' | 'thumbnailUrl' = 'profilePic'; // New input for type
  @Output() imageChange = new EventEmitter<string | null>();

  uploading = false;

  constructor(private cloudinaryService: CloudinaryService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploading = true;

      this.cloudinaryService.uploadImage(file).subscribe({
        next: (url: string) => {
          this.imageUrl = url;
          this.imageChange.emit(this.imageUrl);
          this.uploading = false;
        },
        error: (err) => {
          console.error('Image upload failed', err);
          this.uploading = false;
        }
      });
    }
  }

  removeImage() {
    this.imageUrl = null;
    this.imageChange.emit(null);
  }
}