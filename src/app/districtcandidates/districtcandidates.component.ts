import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-districtcandidates',
  templateUrl: './districtcandidates.component.html',
  styleUrls: ['./districtcandidates.component.scss']
})
export class DistrictCandidatesComponent implements OnInit {
  districtResponses: any[] = [];
  activeDistrict: number | null = null; // Track the active district

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDistrictResponses();
    this.startDataUpdateInterval();
  }

  fetchDistrictResponses(): void {
    const requests: Observable<any>[] = [];

    for (let district = 1; district <= 125; district++) {
      const apiUrl = `https://qqrii8476e.execute-api.us-east-1.amazonaws.com/TestStage/alberta2023/candidates?district=${district}`;
      const request = this.http.get(apiUrl).pipe(
        map((response: any) => {
          return {
            district: district,
            candidates: response
          };
        })
      );

      requests.push(request);
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.districtResponses = responses.sort((a, b) => a.district - b.district);
      console.log('API Responses:', responses);
    });
  }

  toggleCandidates(district: number): void {
    if (this.activeDistrict === district) {
      this.activeDistrict = null; // Hide candidates if the same district is clicked again
    } else {
      this.activeDistrict = district; // Show candidates for the clicked district
    }
  }

  startDataUpdateInterval(): void {
    setInterval(() => {
      this.fetchDistrictResponses();
    }, 60000); // Update data every 1 minute (adjust as needed)
  }
}
