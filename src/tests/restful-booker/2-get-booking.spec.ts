import { BookingService } from "../../models/services/BookingService.js";
import chai from "chai";

chai.should();

describe("Bookings - Get Booking by ID", () => {
  const bookingService = new BookingService();

  it("Get Booking by ID", async () => {
    const bookingId = 3799;

    const response = await bookingService.getBooking<any>(bookingId);

    response.status.should.equal(200, JSON.stringify(response.data));

    console.log("Booking Content:", response.data);
  });
});