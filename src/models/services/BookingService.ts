import { ApiClient } from "../../base/ApiClient.js";
import type { BookingModel } from "../request/BookingModel.js";
import type { Response } from "../responses/Response";
import axios, { AxiosError } from "axios";

export class BookingService {
  private api: ApiClient;
  private url: string;

  constructor() {
    this.api = ApiClient.getInstance();
    this.url = this.api.baseUrl + "/booking";
  }

  // getBookingIds
  async getBookingIds<T>(params: URLSearchParams = new URLSearchParams()): Promise<Response<T>> {
    return this.api.client.get(this.url, { params });
  }

  // getBooking
  async getBooking<T>(id: unknown): Promise<Response<T>> {
    return this.api.client.get(`${this.url}/${id}`);
  }

  // addBooking
  async addBooking<T>(booking: BookingModel): Promise<Response<T>> {
    return this.api.client.post(this.url, booking);
  }

  // deleteBooking
  async deleteBooking<T>(id: number, token: string): Promise<Response<T>> {
    const url = `${this.url}/${id}`;

    try {
      const response = await axios.delete(url, {
        headers: { Cookie: `token=${token}` },
      });

      if (response.status === 201) {
        console.log(`Booking with ID ${id} successfully deleted.`);
      } else {
        console.error(`Failed to delete booking with ID ${id}. Unexpected status code: ${response.status}`);
      }

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      console.error(`Error deleting booking with ID ${id}:`, error.message);

      if (error instanceof AxiosError) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
        console.log("Response headers:", error.response?.headers);
      }

      return {
        data: null,
        status: error.response?.status || 500,
        headers: error.response?.headers || {},
      };
    }
  }

  // updateBooking
  async updateBooking<T>(id: number, booking: BookingModel, token: string): Promise<Response<T>> {
    const url = `${this.url}/${id}`;

    try {
      const response = await this.api.client.put(url, booking, {
        headers: {
          Cookie: `token=${token}`,
        },
      });

      if (response.status === 200) {
        console.log(`Booking with ID ${id} successfully updated.`);
      } else {
        console.error(`Failed to update booking with ID ${id}. Unexpected status code: ${response.status}`);
      }

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      console.error(`Error updating booking with ID ${id}:`, error.message);

      if (error instanceof AxiosError) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
        console.log("Response headers:", error.response?.headers);
      }

      return {
        data: null,
        status: error.response ? error.response.status : 500,
        headers: error.response ? error.response.headers : {},
      };
    }
  }

  // partialUpdateBooking
  async partialUpdateBooking<T>(
    id: number,
    partialBooking: Partial<BookingModel>,
    token: string
  ): Promise<Response<T>> {
    const url = `${this.url}/${id}`;

    try {
      const response = await this.api.client.patch(url, partialBooking, {
        headers: {
          Cookie: `token=${token}`,
        },
      });

      if (response.status === 200) {
        console.log(`Booking with ID ${id} successfully partially updated.`);
      } else {
        console.error(
          `Failed to partially update booking with ID ${id}. Unexpected status code: ${response.status}`
        );
      }

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      console.error(`Error partially updating booking with ID ${id}:`, error.message);

      if (error instanceof AxiosError) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
        console.log("Response headers:", error.response?.headers);
      }

      return {
        data: null,
        status: error.response ? error.response.status : 500,
        headers: error.response ? error.response.headers : {},
      };
    }
  }
}
