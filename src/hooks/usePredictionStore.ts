import { create } from "zustand";

export interface PredictionStore {
    predictionResult: any;
    setPredictionResult: (featureSelector: any) => void;
}

export const usePredictionStore = create<PredictionStore>((setPred, getPred) => ({
    predictionResult: {},
    setPredictionResult: (pred: any) => {
        setPred({predictionResult: pred})
    }
}));