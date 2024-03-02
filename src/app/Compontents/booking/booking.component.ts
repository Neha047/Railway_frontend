import { Component, EventEmitter, Input, Output } from '@angular/core';
import { stationName } from 'src/app/stations.liststation';
import { BookserviceService } from '../bookservice.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent  {
  public stations: Array<{ id:number, price: number, station: string }> = [
    {id:1, price: 10, station: 'ambala' },
    { id:2,price: 20, station: 'ambala cantt' },
    { id:3,price: 30, station: 'chandigarh' },
    {id:4, price: 40, station: 'saharanpur' },
    {id:5, price: 50, station: 'Delhi' }
];  



 public ticketDetails: any; // Variable to store ticket details


public st:stationName | undefined;
public  priceDifference: any
constructor(private apiService: BookserviceService){

}
public originStation: string | undefined;// Initialize originStation
public destinationStation: string | undefined; 

ngOnInit(): void {
  // Call a method to fetch ticket details when the component initializes
  this.fetchTicketDetails();
}

submitForm(): void {
  if (this.originStation && this.destinationStation) {
    // Find the station objects for the origin and destination stations
    const origin = this.stations.find(s => s.station === this.originStation);
    const destination = this.stations.find(s => s.station === this.destinationStation);

    if (origin && destination) {
      // Calculate the price difference between the origin and destination stations
      const priceDifference = Math.abs(destination.price - origin.price);
      
      // Get the current datetime
      const currentDatetime = new Date().toISOString();

      // Prepare the ticket object
      const ticket = {
        originStation: this.originStation,
        destinationStation: this.destinationStation,
        price: priceDifference,
        datetime: currentDatetime
      };
      
      // Call the ApiService method to book the ticket
      this.apiService.bookTicket(ticket).subscribe(
        (response) => {
          console.log('Ticket booked successfully:', response);
          // Extract ticket details from the response
          const { ticketId, ticketDetails } = response;
          // Update ticket details in the component
          this.ticketDetails = ticketDetails;
          // Optionally, reset form fields after successful booking
          this.originStation = undefined;
          this.destinationStation = undefined;
        },
        (error) => {
          console.error('Error booking ticket:', error);
        }
      );
      
    } else {
      console.log('Invalid origin or destination station.');
    }
  } else {
    console.log('Please select both origin and destination stations.');
  }
}


fetchTicketDetails(): void {
  // Call the ApiService method to fetch ticket details
  this.apiService.getTicketDetails().subscribe(
    (response: any) => {
      // Store the ticket details in the variable
      this.ticketDetails = response;
    },
    (error: any) => {
      console.error('Error fetching ticket details:', error);
    }
  );
}



}
