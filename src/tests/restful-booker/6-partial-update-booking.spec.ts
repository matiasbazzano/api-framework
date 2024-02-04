import { BookingService } from "../../models/services/BookingService.js";
import chai from "chai";

chai.should();

describe("Bookings - Partial Update Booking", () => {
  const bookingService = new BookingService();

  it("Partial Update Booking", async () => {
    const bookingIdToUpdate = 4015;
    const tokenFromPostman = "505a4703f999bb5";
    const partialBookingUpdate = {
      firstname: "PartialUpdate",
      lastname: "Matias Bazzano",
    };

    try {
      const response = await bookingService.partialUpdateBooking<any>(
        bookingIdToUpdate,
        partialBookingUpdate,
        tokenFromPostman
      );

      response.status.should.equal(200, JSON.stringify(response.data));
      console.log("Updated Booking Content:", response.data);
    } catch (error: any) {
      console.error(`Error updating booking with ID ${bookingIdToUpdate}:`, error.response?.data || error.message);
      throw error;
    }
  });
});
