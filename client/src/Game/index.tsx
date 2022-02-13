import React from 'react';
import { GameProps, NameChangeEvent, InitialState, Stage } from '../types/game';
import { UserData } from '../types/userData';


const INITIAL_STATE: InitialState = {
    user: {name: ""},
    stats: {
        clicks: 0,
        totalClicks: 0,
    },
    stage: 0
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

    incrementStage = (stage: Stage) => {
        this.setState({stage})
    }

    0 = () => {
        const user: UserData = this.state.user;
        const disabled = user.name.length > 2 ? false : true;

        return (
        <div>
            <input type="text" name="user" onChange={(e) => this.onNameChange(e)} />
            <button onClick={() => this.incrementStage(1)} disabled={disabled} >Enter Username</button>
        </div>
        );
    }

    1 = () => {
        
            //ideal we would create the 

        return (
            <>
            {this.state.user.name} 1
            </>
        )
    }

    2 = () => {
        
            //ideal we would create the mid

        return (
            <>
            {this.state.user.name} 2
            </>
        )
    }

    3 = () => {
        
            //ideal we would create the end

        return (
            <>
            {this.state.user.name} 3
            </>
        )
    }

    render(): React.ReactNode {
        const {stage} = this.state;
        const CurrentStage = this[stage];
        return(
                <CurrentStage />
        )
    }
}