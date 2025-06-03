import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.production';
import { Observable, map } from 'rxjs';
import { CloudinaryUploadResponse } from '../../../shared/models/CloudinaryUploadResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private readonly cloudName = environment.cloudName;
  private readonly uploadPreset = environment.uploadPreset;

  constructor(private readonly http: HttpClient) {}

  /**
   * Uploads an image file to Cloudinary and returns the secure_url.
   */
  uploadImage(file: File): Observable<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    console.log(url);
    return this.http.post<CloudinaryUploadResponse>(url, formData).pipe(
      map((response) => response.secure_url)
    );
  }
}
