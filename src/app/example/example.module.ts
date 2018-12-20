import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleComponent} from './example.component';
import {GraphQLModule} from '../graphql.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  exports: [
    ExampleComponent
  ]
})
export class ExampleModule {
}
