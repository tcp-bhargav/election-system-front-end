import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-partiestable',
  templateUrl: './partiestable.component.html',
  styleUrls: ['./partiestable.component.scss']
})
export class PartiestableComponent implements OnInit, OnDestroy {
  parties: any[] = []; // Array to store the party data received from the API
  private intervalId: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPartyData(); // Call the API when the component is initialized
    this.intervalId = setInterval(() => {
      this.fetchPartyData();
    }, 60000); // Fetch data every 1 minute
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  fetchPartyData() {
    const endpointUrl = 'https://qqrii8476e.execute-api.us-east-1.amazonaws.com/TestStage/alberta2023/parties'; // Replace with the actual API endpoint URL

    this.http.get<any[]>(endpointUrl).subscribe(data => {
      this.parties = data;
    });
  }
}