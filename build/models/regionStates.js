"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const regionStatesSchema = new mongoose_1.Schema({
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
const regionStateModel = mongoose_1.default.model("regionStates", regionStatesSchema);
exports.default = regionStateModel;
