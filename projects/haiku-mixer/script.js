function remix_haiku() {
    var haiku_input = document.getElementById('haikus').value;
    const re = /\r?\n/;
    const parsed_lines = haiku_input.split(re).filter(e => e);
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    const n_lines = parsed_lines.length;
    const n_haiku = Math.floor(n_lines / 3);

    // get random indexes for haiku lines
    var a = range(0, n_lines - 3, 3)[get_random_int(0, n_haiku - 1)];
    var b = range(1, n_lines - 2, 3)[get_random_int(0, n_haiku - 1)];
    var c = range(2, n_lines - 1, 3)[get_random_int(0, n_haiku - 1)];

    const result = `${parsed_lines[a]}\n${parsed_lines[b]}\n${parsed_lines[c]}`;
    change_txt("haiku-result", result);
    document.getElementById("haiku-result").scrollIntoView();
}

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function change_txt(element_id, element_txt) {
    var element = document.getElementById(element_id);
    element.innerHTML = element_txt;
}


document.getElementById("btn-mix").addEventListener("click", remix_haiku);