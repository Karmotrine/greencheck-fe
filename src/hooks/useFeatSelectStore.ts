import { create } from "zustand";

type TFeatureSelectorMode = "BASE" | "PSO" | "ABC" | "ACO" | "N/A";
export interface FeatSelectStore {
    featureSelector: TFeatureSelectorMode;
    setFeatureSelector: (featureSelector: TFeatureSelectorMode) => void;
}

export const useFeatSelectStore = create<FeatSelectStore>((setFeatSelect, getFeatSelect) => ({
    featureSelector: "N/A",
    setFeatureSelector: (featureSelector: TFeatureSelectorMode) => {
        setFeatSelect({featureSelector: featureSelector});
    }
}));