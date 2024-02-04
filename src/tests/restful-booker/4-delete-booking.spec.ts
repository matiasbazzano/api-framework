import { BookingService } from "../../models/services/BookingService.js";
import chai from "chai";

chai.should();

describe("Bookings - Delete Booking", () => {
  const bookingService = new BookingService();

  it("Delete Booking", async () => {
    const bookingIdToDelete = 3873;
    const tokenFromPostman = "505a4703f999bb5";

    try {
      const response = await bookingService.deleteBooking<any>(bookingIdToDelete, tokenFromPostman);

      response.status.should.equal(201, JSON.stringify(response.data));
    } catch (error: any) {
      console.error(`Error deleting booking with ID ${bookingIdToDelete}:`, error.response?.data || error.message);
      throw error;
    }
  });
});
