module.exports = (props, items) => {
    let obj = {};
    items.split(',').forEach(x => {
        const key = x.trim();

        if (props[key] !== undefined) {
            obj[key] = props[key]; 
        }
       
    });

    return obj;
};