const fs = require('fs');
const replaceAll = require('replaceall');

class VarReplace {
    constructor({ entry, output }) {
        this.output = output;

        this.text = fs.readFileSync(entry,{ 
            encoding: 'utf8'
        });
    }

    static checkDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }    
    }

    getText() {
        return this.text;
    }

    replace(pattern, value) {
        if (typeof pattern === 'string') {
            this.text = replaceAll(pattern, value, this.text);
        }
        else {
            this.text = this.text.replace(pattern, value);
        }
        
        return this;
    }

    save() {
        fs.writeFileSync(this.output, this.text, {
            encoding: 'utf8'
        });
    }
}
  
module.exports = VarReplace;