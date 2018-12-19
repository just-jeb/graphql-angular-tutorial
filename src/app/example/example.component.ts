import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';
import {filter, map} from 'rxjs/operators';

const myQuery = gql`
  query getPatientById {
    patient(id: "1") {
      id
      name
    }
  }
`;

interface Patient {
  id: string;
  name: string;
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  private patientQuery: Observable<any>;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.patientQuery = this.apollo.watchQuery<any>({
      query: myQuery
    }).valueChanges;
  }
}
