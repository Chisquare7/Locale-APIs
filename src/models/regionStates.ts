import mongoose, { Schema, Document } from "mongoose";

interface Location {
  latitude: string;
  longitude: string;
}

interface State {
  name: string;
  capital: string;
  state_code: string;
  creation_date: string;
  location: Location;
  total_area: string;
  population: number | null;
  postal_code: number | null;
  religions: string[];
}

interface Region {
  name: string;
  region_code: string;
  major_languages: string[];
  population: number;
  total_area: string;
  states: State[];
}

interface regionStateDocument extends Document {
  region: Region;
}

const regionStatesSchema: Schema = new Schema({
  region: {
    name: { type: String, required: true },
    region_code: { type: String, required: true },
    major_languages: { type: [String], required: true },
    population: { type: Number, required: true },
    total_area: { type: String, required: true },
    states: [
      {
        name: { type: String, required: true },
        capital: { type: String, required: true },
        state_code: { type: String, required: true },
        creation_date: { type: String, required: true },
        location: {
          latitude: { type: String, required: true },
          longitude: { type: String, required: true },
        },
        total_area: { type: String, required: true },
        population: { type: Number, default: null },
        postal_code: { type: Number, default: null },
        religions: { type: [String], default: [] },
      },
    ],
  },
});

const regionStateModel = mongoose.model<regionStateDocument>(
  "regionStates",
  regionStatesSchema
);

export { regionStateDocument };
export default regionStateModel;