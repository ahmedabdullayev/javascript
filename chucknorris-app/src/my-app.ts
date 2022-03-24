import { customElement, IRouter, inject, ILogger, route, IDisposable, ICustomElementViewModel } from 'aurelia';
import {JokeService} from "./services/jokeService";
@route({
  routes: [
    {
      id: 'main',
      path: '',
      component: import('./components/index'),
      title: 'Main',
    },
    {
      id: 'results',
      path: '/category/:cat',
      component: import('./components/category'),
      title: 'Results',
    },

  ]
})
@inject()
export class MyApp implements ICustomElementViewModel{
  public message = 'Hello World!';
  private _subscriptions: IDisposable[] = [];
  private categories : string[] = [];
  constructor(
      @IRouter private router: IRouter,
      @ILogger private logger: ILogger,
      private JokeService: JokeService
  ) {
    this.logger = logger.scopeTo("MyApp");
  }
  async load(){
  }
  async created(){
     let data = await this.JokeService.getRandomCategories(3);
     this.categories = data;
  }

}
