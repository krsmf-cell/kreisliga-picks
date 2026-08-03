import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ImportScheduleDto } from "./dto/import-schedule.dto";

@Injectable()
export class ImportsService {

  async importSchedule(
    dto: ImportScheduleDto,
  ) {

    try {

      const response = await axios.get(dto.url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      console.log("Status:", response.status);

      return {
        success: true,
      };

    } catch (e: any) {

      console.error("IMPORT FEHLER");
      console.error(e.response?.status);
      console.error(e.response?.data);
      console.error(e.message);

      throw e;

    }

  }

}