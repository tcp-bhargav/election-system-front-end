import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ridings',
  templateUrl: './ridings.component.html',
  styleUrls: ['./ridings.component.scss']
})
export class RidingsComponent implements OnInit {
  ridings: any[] = []; // Array to store the riding data received from the API

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchRidingData(); // Call the API when the component is initialized
  }

  fetchRidingData() {
    const endpointUrl = 'https://kbjbworijh.execute-api.us-east-1.amazonaws.com/AlbertaTestStage/alberta2023/ridings'; // Replace with the actual API endpoint URL

    this.http.get<any[]>(endpointUrl).subscribe(data => {
      this.ridings = data; // Store the received riding data in the 'ridings' array
    });
  }
}
