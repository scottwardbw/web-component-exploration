interface IDestinationOptions {
    component: {
        attributes: {
            [name: string]: string;
        };
        name: string;
    };
}

interface IWebComponentElement extends HTMLElement {
    data: any;
}

export const createDestination = (options: IDestinationOptions) => {
    return {
        destination(data, pipeline) {
            const el = document.querySelector(pipeline.config.destTarget)!;

            // Create the web component.
            const textNode: Partial<IWebComponentElement> = document.createElement(options.component.name);

            // Loop through attributes to add them as properties to the web component.
            for (const attributeName in options.component.attributes) {
                textNode[attributeName] = options.component.attributes[attributeName];
            }

            textNode.data = data; // Always add a data property.

            el.appendChild(textNode); // Append the web component into the 'destTarget'.
            pipeline.done();
        }
    };
};
