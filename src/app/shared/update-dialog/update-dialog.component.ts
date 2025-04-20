import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../Contract/field-config/field-config'; 
import { FileService } from '../../Services/Common/Models/file.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
})
export class UpdateDialogComponent implements OnInit {
  form: FormGroup;
  selectedFile: File;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public config: { fields: FieldConfig[], data: any }
  ) {}

  ngOnInit(): void {
    const controlsConfig = {};
    this.config.fields.forEach(field => {
      controlsConfig[field.key] = [
        this.config.data[field.key] || '',
        field.required ? Validators.required : []
      ];
    });

    this.form = this.fb.group(controlsConfig);
    // Başlangıçta mevcut resmin URL'sini al
    if (this.config.data.imageUrl) {
      this.form.patchValue({ imageUrl: this.config.data.imageUrl });
    }
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // güncel verileri gönder
    }
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Dosya seçildiğinde, Azure'a yükle
      this.fileService.uploadFile(file).subscribe({
        next: (response) => {
          // Yüklenen dosyanın SAS URL'sini al ve form'u güncelle
          this.form.patchValue({ imageUrl: response.fileUrl });
        },
        error: (err) => {
          console.error("Dosya yüklenirken hata oluştu:", err);
        }
      });
    }
  }
}
