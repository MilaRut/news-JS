import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse, SourcesResponse } from '../../types';
import { getElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        getElement('.sources').addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(
                e,
                (data: NewsResponse) => this.view.drawNews(data),
                (sourceId: string) => this.view.setActiveSource(sourceId)
            )
        );
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
