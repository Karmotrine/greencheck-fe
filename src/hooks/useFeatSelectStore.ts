import { create } from "zustand";

type TFeatureSelectorMode = "PSO" | "ABC" | "ACO";
export interface FeatSelectStore {
    featureSelector: TFeatureSelectorMode;
    setFeatureSelector: (featureSelector: TFeatureSelectorMode) => void;
}

export const useFeatSelectStore = create<FeatSelectStore>((setFeatSelect, getFeatSelect) => ({
    featureSelector: "PSO",
    setFeatureSelector: (featureSelector: TFeatureSelectorMode) => {
        setFeatSelect({featureSelector: featureSelector});
    }
}));