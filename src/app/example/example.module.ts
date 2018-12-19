import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleComponent} from './example.component';
import {GraphQLModule} from '../graphql.module';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    GraphQLModule
  ],
  exports: [
    ExampleComponent
  ]
})
export class ExampleModule {
}
