import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleComponent} from './example.component';
import {GraphQLModule} from '../graphql/graphql.module';
import {ReactiveFormsModule} from '@angular/forms';
import {gqlMockModule} from './graphql.mock';
import {registerMockModule} from '../graphql/mock-registry';

registerMockModule(gqlMockModule);

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
