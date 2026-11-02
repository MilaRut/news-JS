import './sources.css';
import { Source } from '../../../types';
import { getElement } from '../../../utils/dom';

class Sources {
    public draw(data: readonly Pick<Source, 'id' | 'name'>[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = getElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: DocumentFragment = document.importNode(sourceItemTemp.content, true);

            getElement('.source__item-name', sourceClone).textContent = item.name;
            getElement('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement('.sources').append(fragment);
    }

    public setActive(sourceId: string): void {
        getElement('.sources')
            .querySelectorAll<HTMLElement>('.source__item')
            .forEach((item) => {
                item.classList.toggle('source__item--active', item.getAttribute('data-source-id') === sourceId);
            });
    }
}

export default Sources;
