import {ILogger, IRouter, inject, Params, IRouteViewModel} from 'aurelia';
import {IJoke} from "../../domain/IJoke";
import {JokeService} from "../../services/jokeService";
import {JokeState} from "../../states/jokeState";

@inject()
export class Index {
    private state: JokeState;

    private tempJokes: IJoke[] = [];
    private category : string = "No category";
    constructor(
        @IRouter private router: IRouter,
        @ILogger private logger: ILogger,
        private JokeService: JokeService,
        JokeState: JokeState) {
        this.state = JokeState;
        console.warn("dsada")
        //this.logger = logger.scopeTo("Index");
    }
    async load(params: Params) {
        console.warn('dsds')
        this.category = params['cat']
        this.tempJokes = []
        for (let i = 0; i < 5; i++){
            let joke = await this.getJokes();
            this.tempJokes.push(joke)
            if (this.checkInList(joke) === true) {
                this.state.addJoke(joke)
            }
        }
    }
    async getJokes(){
       return  await this.JokeService.getJoke(this.category);
    }
    checkInList(data : IJoke){
        for (let i = 0; i < this.state._jokes.length; i++){
            if(this.state._jokes[i].id == data.id){
                return false;
            }
        }
        return true;
    }

}