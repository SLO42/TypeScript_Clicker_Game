import React from 'react';
import { UserData } from '../types/user.data';

interface Stats {
    clicks: Number;
    totalClicks: Number;
}

interface InitialState {
    user: UserData;
    stats: Stats;
    stage: Number;
}

const INITIAL_STATE: InitialState = {
    user: {name: ""},
    stats: {
        clicks: 0,
        totalClicks: 0,
    },
    stage: 0
}

interface NameEventTarget extends EventTarget {
    value: string;
}

interface NameChangeEvent {
    target: NameEventTarget
}

interface GameProps {
    user?: UserData;
}

export default class Game extends React.Component<GameProps, InitialState> {
    constructor(userData?: GameProps){
        super(userData!);

        this.state = { ...INITIAL_STATE }

        if (userData && userData.user) {
            this.setState({user: userData.user!})
        }
    }

    onNameChange = (e: NameChangeEvent): void => {
        const newUser: UserData = {name: e.target.value}
        this.setState({ user: newUser });
    }

    incrementStage = (stage: Number) => {
        this.setState({stage})
    }

    render(): React.ReactNode {
        const user: UserData = this.state.user;
        const stage = this.state.stage;
        const disabled = user.name.length > 2 ? false : true;
        return(
            <div>
                {stage === 0 ? 
                <div>
                    <input type="text" name="user" onChange={(e) => this.onNameChange(e)} />
                    <button onClick={() => this.incrementStage(1)} disabled={disabled} >Enter Username</button>
                </div>
                :
                <div>
                    {user.name}
                </div>
            }
            </div>
        )
    }

}