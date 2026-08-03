import { Injectable } from "@nestjs/common";

@Injectable()
export class CommunityService {

  get() {

    return {

      communityHome: 74,

      communityDraw: 12,

      communityAway: 14,

    };

  }

}