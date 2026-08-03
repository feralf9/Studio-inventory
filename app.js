let entries = [];

async function loadDatabase()
{
    const response = await fetch("database.txt");
    const text = await response.text();

    parseDatabase(text);

    render(entries);
}

function parseDatabase(text)
{
    entries = [];

    const blocks = text.split("---");

    for(const block of blocks)
    {
        const lines = block
            .split("\n")
            .map(x => x.trim())
            .filter(x => x.length);

        if(lines.length===0)
            continue;

        const obj = {};

        for(const line of lines)
        {
            const index = line.indexOf(":");

            if(index<0)
                continue;

            const key = line.substring(0,index).trim();
            const value = line.substring(index+1).trim();

            switch(key)
            {
                case "value":
                case "age":
                    obj[key]=parseFloat(value);
                    break;

                case "in_use":
                case "in_working_condition":
                    obj[key]=(value.toLowerCase()=="true");
                    break;

                default:
                    obj[key]=value;
            }
        }

        entries.push(obj);
    }
}

function render(list)
{
    const div=document.getElementById("results");

    div.innerHTML="";

    for(const item of list)
    {
        const entry=document.createElement("div");
        entry.className="entry";

        for(const key in item)
        {
            const field=document.createElement("div");
            field.className="field";

            field.innerHTML=
                "<span class='fieldName'>"+
                key+
                "</span>"+
                item[key];

            entry.appendChild(field);
        }

        div.appendChild(entry);
    }
}

document
.getElementById("search")
.addEventListener("input",function(){

    const search=this.value.toLowerCase();

    const filtered=entries.filter(entry=>{

        for(const key in entry)
        {
            if(
                String(entry[key])
                .toLowerCase()
                .includes(search)
            )
                return true;
        }

        return false;

    });

    render(filtered);

});

loadDatabase();
