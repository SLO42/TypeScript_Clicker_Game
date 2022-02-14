import { UserData } from "./userData";

export interface NameEventTarget extends EventTarget {
    value: string;
}

export interface NameChangeEvent {
    target: NameEventTarget
}

export interface GameProps {
    user?: UserData;
    modifiers?: Modifiers;
}

export interface Modifiers {
    clickMultiplier: Number;
    clicksPerSecond: Number;
}

export interface CPSModifier {
        name: string;
        type: ModifierType;
        price: number;
        total: number;
        effect: EffectTypes;
        strength: number;
}

export interface Stats {
    clicks: number;
    totalClicks: number;
    level: number;
    totalClicksRequired: number;
}

export interface InitialState {
    user: UserData;
    stats: Stats;
    stage: Stage;
    loading: Boolean;
    paused: Boolean;
    time: number;
    modifiers: CPSModifiers;
}

export type IntervalArray = Array<NodeJS.Timer>

export type EffectTypes = "FLAT" | "MULTI" | "TIME";

export type ModifierType = "clicks" | "cps"; 

export type Stage = 0 | 1 | 2 | 3;

export type CPSModifiers = Array<CPSModifier>;