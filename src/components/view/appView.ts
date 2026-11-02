import News from './news/news';
import Sources from './sources/sources';
import { Article, NewsResponse, Source, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<NewsResponse>): void {
        const values: readonly Article[] = data.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourcesResponse>): void {
        const values: readonly Source[] = data.sources ?? [];
        this.sources.draw(values);
    }

    public setActiveSource(sourceId: string): void {
        this.sources.setActive(sourceId);
    }
}

export default AppView;
