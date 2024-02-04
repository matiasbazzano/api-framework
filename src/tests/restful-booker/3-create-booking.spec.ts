import { BookingService } from "../../models/services/BookingService.js";
import { BookingModel } from "../../models/request/BookingModel.js";
import chai from "chai";

chai.should();

describe("Bookings - Create Booking", () => {
  it("Create Booking", async () => {
    const bookingService = new BookingService();

    const newBooking: BookingModel = {
      firstname: "MATIAS",
      lastname: "BAZZANO CHARBONNIER",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2001-06-19",
        checkout: "2023-01-01",
      },
      additionalneeds: "TESTING",
    };

    try {
      const response = await bookingService.addBooking<number>(newBooking);

      response.status.should.equal(200, JSON.stringify(response.data));

      console.log("Booking created successfully. Booking ID:", response.data);
    } catch (error) {
      console.error("Failed to create booking:", error);
      throw error;
    }
  });
});
