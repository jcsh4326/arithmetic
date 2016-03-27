function power2(x, n, id, f) {
    y = id;
    while (true) {
        if (n%2 == 1) {
            y = f(y, x);
        }
        n = n>>1;
        if (n == 0) {
            break;
        }
        x = f(x, x);
    }
    return y;
}

function leftpad(s, c, n) {
    return power2(c, n, "", function (a, b) {
               return a + b;
           }) + s;
}

module.exports = leftpad;