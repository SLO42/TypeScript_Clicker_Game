import React from 'react';
import { GameProps, NameChangeEvent, InitialState, Stage, Stats, CPSModifiers, IntervalArray } from '../types/game';
import { UserData } from '../types/userData';
import './index.css';

const INITIAL_STATE: InitialState = {
    user: {name: ""},
    stats: {
        clicks: 0,
        totalClicks: 0,
    },
    stage: 0,
    loading: false,
    paused: true,
    time: Date.now(),
    modifiers: [{name: "default", type: "cps", price: 0, total: 1, effect: "MULTI", strength: 1 },
    {name: "default", type: "cps", price: 0, total: 1, effect: "FLAT", strength: 1 }]
}

const ticksPerSecond = 1000;
const defaultCPS = 10000;

export default class Game extends React.Component<GameProps, InitialState> {
    intervalArray!: IntervalArray;
    constructor(userData?: GameProps){
        super(userData!);

        this.state = { ...INITIAL_STATE }

        if (userData && userData.user) {
            this.setState({user: userData.user!})
        }
    }

    componentDidMount() {
        this.intervalArray.push(setInterval(() => this.setState({ time: Date.now() }), ticksPerSecond))
        
        this.intervalArray.push(
            setInterval(() => {
                let totalFlatCPS = 0;
                let totalMultiCPS = 0;
                let modifier: CPSModifiers | any;
                for (modifier in this.state.modifiers){
                    if (modifier.type === "cps"){
                        if (modifier.effect === "FLAT"){
                            totalFlatCPS = totalFlatCPS + (modifier.strength * modifier.total)
                        }
                        else if (modifier.effect === "MULTI"){
                            totalMultiCPS = totalMultiCPS + (modifier.strength * modifier.total)
                        }
                    }
                }
                const totalChange = totalFlatCPS * totalMultiCPS || 1;
                this.setState({stats: {"clicks": this.state.stats.clicks + totalChange, "totalClicks": this.state.stats.totalClicks + totalChange} })
            }, defaultCPS)
        )
    }

    // if unpaused run event. else do nothing.
    componentDidUpdate(){
        if (!this.state.paused){
            
        }
    }

    componentWillUnmount() {
        let interval: NodeJS.Timer | any;
        for (interval in this.intervalArray){
            clearInterval(interval);
        }
    }

    togglePause = () => {
        this.setState({paused: !this.state.paused})
    }

    toggleLoading = () => {
        this.setState({loading: !this.state.loading})
    }

    onNameChange = (e: NameChangeEvent): void => {
        const newUser: UserData = {name: e.target.value}
        this.setState({ user: newUser });
    }

    incrementStage = (stage: Stage) => {
        this.setState({stage})
    }

    incrementClicks = (stats: Stats) => {
        const clicks = stats.clicks + 1;
        const totalClicks = stats.totalClicks + 1;
        const newStats = {clicks, totalClicks};
        this.setState({stats: newStats})
    }

    onButtonClick = () => {
        this.incrementClicks(this.state.stats);
    }

    buyClicksPerSecond = () => {

    }

    TheButton = () => <div id="buttonBox"><button onClick={this.onButtonClick} id='THEBUTTON'>THE BUTTON</button></div>

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
        const {paused} = this.state;
            //ideal we would create the start

        return (
            <>
            {this.state.user.name} 1
            <button onClick={this.togglePause} > {paused ? "unpause" : "pause"} </button>
            <button>Buy Upgrade to click</button>
            <button>Buy Upgrade to clicksPerSecond</button>
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
        const CurrentStage = this[this.state.stage];
        const now = new Date(this.state.time).toLocaleTimeString();
        return(
            <div>
                    {this.state.stats.totalClicks}
                <>
                    <p>{now}</p>
                </>
                <CurrentStage />
                <this.TheButton />
            </div> 
        )
    }
}