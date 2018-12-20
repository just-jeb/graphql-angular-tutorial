import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';

const myQuery = gql`
  query getPatientById {
    patient(id: "1") {
      id
      name
      labTestResults(limit: 5){
        id
        type
        value
      }
    }
  }
`;
const myMutation = gql`
  mutation updatePatient($patientName: String!){
    setPatientName(id: "1", name: $patientName){
      id
      name
    }
  }
`;

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  private patientQuery: Observable<any>;
  public formGroup = new FormGroup({name: new FormControl()});

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.patientQuery = this.apollo.watchQuery<any>({
      query: myQuery
    }).valueChanges;

    this.formGroup.controls.name.valueChanges.pipe(
      switchMap(value => this.apollo.mutate({mutation: myMutation, variables: {patientName: value}}))
    ).subscribe();
  }
}
