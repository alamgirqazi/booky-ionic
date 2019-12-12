import { RouterModule, Routes } from '@angular/router';

import { BooksPage } from './books.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: BooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksPageRoutingModule {}
