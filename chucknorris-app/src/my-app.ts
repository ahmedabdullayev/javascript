import { ILogger, route} from 'aurelia';
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
export class MyApp{
  private categories : string[] = [];
  constructor(
      @ILogger private logger: ILogger,
      private JokeService: JokeService
  ) {
    this.logger = logger.scopeTo("MyApp");
  }
  async created(){
     let data = await this.JokeService.getRandomCategories(3);
     this.categories = data;
  }

}
