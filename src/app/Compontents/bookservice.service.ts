import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private apiUrl = 'http://localhost:9093'; // Replace this with your backend API URL
  constructor(private http: HttpClient) { }

getTickets(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/tickets`);
}

bookTicket(ticket: any): Observable<any> {
  // Make an HTTP POST request to your backend API to book the ticket
  
  return this.http.post<any>(this.apiUrl+"/book", ticket);
}

getTicketPrice(ticketId: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/ticket/price/${ticketId}`);
}

getTicketDetails(): Observable<any> {
  // Make an HTTP GET request to fetch ticket details
  return this.http.get<any>(`${this.apiUrl}/tickets`).pipe(
    tap((response: any) => console.log('Ticket details:', response)),
    catchError((error: any) => {
      console.error('Error fetching ticket details:', error);
      throw error; // Rethrow the error to propagate it to the subscriber
    })
  );
}

}
