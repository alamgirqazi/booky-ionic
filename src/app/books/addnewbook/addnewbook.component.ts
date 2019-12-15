import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

import { BooksService } from './../../../sdk/custom/books.service';

@Component({
  selector: 'app-addnewbook',
  templateUrl: './addnewbook.component.html',
  styleUrls: ['./addnewbook.component.scss']
})
export class AddnewbookComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private booksService: BooksService
  ) {}

  addNewBookForm: FormGroup;
  loading = false;
  @Input() book;
  ngOnInit() {
    this.formInitializer();
    if (this.book) {
      console.log('got book', this.book);
      this.addNewBookForm.patchValue(this.book);
    }
  }

  formInitializer() {
    this.addNewBookForm = this.formBuilder.group({
      _id: [null],
      name: [null, [Validators.required]],
      ibn: [null, [Validators.required]],
      author: [null, [Validators.required]],
      is_deleted: [false, [Validators.required]],
      image_url: ['']
    });
  }

  async addNew() {
    const observable = await this.booksService.addNewBook(
      this.addNewBookForm.value
    );
    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        const name = this.addNewBookForm.controls['name'].value;
        const toast = await this.toastController.create({
          message: `${name} has been added successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewBookForm.reset();
        //optional

        this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error', error);
      }
    );
  }
  async updateBook() {
    const observable = await this.booksService.updateBook(
      this.addNewBookForm.value
    );

    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        const name = this.addNewBookForm.controls['name'].value;
        const toast = await this.toastController.create({
          message: `${name} has been updated successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewBookForm.reset();
        //optional

        this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error', error);
      }
    );
  }

  save() {
    this.loading = true;

    if (this.book) {
      this.updateBook();
    } else {
      this.addNew();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
