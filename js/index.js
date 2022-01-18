function getRuleFormatted(line) {
    if (line.includes(' @list-description')) {
        const h3 = '<h3><i>';
        const endH3 = line.replace(' @list-description', '</i></h3><hr>');
        return { formatted: h3.concat(endH3), newline: true };
    } else if (line.includes('___')) {
        return { formatted: '<hr>', newline: false };
    } else if (line.includes('### ')) {
        const h3 = line.replace('### ', '<h3>');
        return { formatted: h3.concat('</h3>'), newline: false };
    } else if (line.includes('## ')) {
        const h2 = line.replace('## ', '<h2>');
        return { formatted: h2.concat('</h2>'), newline: false };
    } else if (line.includes('# ')) {
        const h1 = line.replace('# ', '<h1>');
        return { formatted: h1.concat('</h1>'), newline: false };
    } else if (line.includes(' @todo')) {
        const span = '<span class="gray-span">';
        const endSpan = line.replace(' @todo', '</span>');
        return { formatted: span.concat(endSpan), newline: true };
    } else if (line.includes(' @doing')) {
        const span = '<span class="yellow-span">'
        const endSpan = line.replace(' @doing', '</span>');
        return { formatted: span.concat(endSpan), newline: true };
    } else if (line.includes(' @done')) {
        const span = '<span class="green-span"><s>';
        const endSpan = line.replace(' @done', '</s></span>');
        return { formatted: span.concat(endSpan), newline: true };
    } else if (line.includes(' @canceled')) {
        const span = '<span class="red-span"><s>';
        const endSpan = line.replace(' @canceled', '</s></span>');
        return { formatted: span.concat(endSpan), newline: true };
    } else if (/\r\n|\n/.exec(line) || line === '') {
        return { formatted: null, newline: null };
    } else return { formatted: line, newline: true };
}

document.getElementById('file').onchange = function() {
    const file = this.files[0];
    const reader = new FileReader();
    const homeContainer = document.getElementById('home-container');
    const listContainer = document.getElementById('list-container');
    const list = document.getElementById('list');
    let listHTML = '';
    reader.onload = function() {
        homeContainer.style.display = 'none';
        listContainer.style.display = 'block';
        const lines = this.result.split(/\r\n|\n/);
        for (let i = 0; i < lines.length-1; i++) {
            // console.log(i + ' ) ' + lines[i]);
            const rule = getRuleFormatted(lines[i]);
            const newline = rule.newline ? '<br>' : '';
            if (rule.formatted !== null)
                listHTML = listHTML.concat(rule.formatted, newline);
        }
        list.innerHTML = listHTML;
    };
    reader.readAsText(file);
};