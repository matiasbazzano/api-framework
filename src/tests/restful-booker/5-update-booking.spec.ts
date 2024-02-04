import { BookingService } from "../../models/services/BookingService.js";
import { BookingModel } from "../../models/request/BookingModel.js";
import chai from "chai";

chai.should();

describe("Bookings - Update Booking", () => {
  const bookingService = new BookingService();

  it("Update Booking", async () => {
    const bookingIdToUpdate = 3952;
    const tokenFromPostman = "505a4703f999bb5";

    const updatedBooking: BookingModel = {
      firstname: "Updated Matias",
      lastname: "Bazzano",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2023-01-01",
        checkout: "1995-05-05",
      },
      additionalneeds: "Updated Breakfast",
    };

    try {
      const response = await bookingService.updateBooking<any>(bookingIdToUpdate, updatedBooking, tokenFromPostman);

      response.status.should.equal(200, JSON.stringify(response.data));
      console.log("Updated Booking Content:", response.data);
    } catch (error: any) {
      console.error(`Error updating booking with ID ${bookingIdToUpdate}:`, error.response?.data || error.message);
      throw error;
    }
  });
});
