import AppLoader from './appLoader';
import { Callback, Endpoint, NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<NewsResponse>, onSelect?: Callback<string>): void {
        const newsContainer: EventTarget | null = e.currentTarget;
        if (!(newsContainer instanceof HTMLElement)) return;

        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    onSelect?.(sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
