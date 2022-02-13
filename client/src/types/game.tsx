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
        price: Number;
        total: Number;
}

export interface Stats {
    clicks: Number;
    totalClicks: Number;
}

export interface InitialState {
    user: UserData;
    stats: Stats;
    stage: Stage;
}

export type Stage = 0 | 1 | 2 | 3;

export type CPSModifiers = Array<CPSModifier>;