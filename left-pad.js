function power2(x, n, id, f) {
    y = id;

    while (true) {
        t = n % 2;
        n = n>>1;

        if (t == 1) {
            y = f(y, x);
        }

        if (n == 0) {
            break;
        }

        x = f(x, x);
    }

    return y;
}

function repeat(s, n) {
    return power2(s, n, "", function (a, b) {
               return a + b;
           });
}

module.exports = repeat;