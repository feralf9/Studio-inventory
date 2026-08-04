const Database = {

    entries : [],

    register(items)
    {
        this.entries.push(...items);
    },

    load(file)
    {
        const script = document.createElement("script");

        script.src = file;

        script.onload = () => this.render();

        document.head.appendChild(script);
    },

    render()
    {
        // We'll fill this in later.
    }

};
