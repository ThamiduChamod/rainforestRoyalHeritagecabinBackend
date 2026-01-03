import mongoose, { Document, Schema } from "mongoose";

export enum  roomTypes {
    Standard ="Standard Room",
    Deluxe="Deluxe Room",
    Superior="Superior Room",
    Family="Family Room",
    Private ="Private Cabin",
    Honeymoon ="Honeymoon Suite",
    Royal = "Royal Suite"
}

export enum BedType {
  SINGLE = "Single Bed",
  DOUBLE = "Double Bed",
  TWIN = "Twin Bed",
  QUEEN = "Queen Bed",
  KING = "King Bed",
  BUNK = "Bunk Bed",
  SOFA = "Sofa Bed",
}

export enum STATUS {
    AVAILABLE = "AVAILABLE",
    BOOKED = "BOOKED"
}



export default interface Room extends Document{
    _id: mongoose.Types.ObjectId
    type: roomTypes
    price: string
    status: STATUS
    pax: number
    bedType: BedType
    amenities: string[]
    image: string
    count: number
}


const RoomSchema = new Schema<Room>(
  {
    type: {
      type: String,
      enum: Object.values(roomTypes),
      required: true,
    },

    price: {
      type: String,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.AVAILABLE,
    },

    pax: {
      type: Number,
      required: true,
      min: 1,
    },

    bedType: {
      type: String,
      enum: Object.values(BedType),
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      required: true,
    },
    count: {
        type: Number,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

/* ================= MODEL ================= */

export const RoomModel = mongoose.model<Room>("Room", RoomSchema);