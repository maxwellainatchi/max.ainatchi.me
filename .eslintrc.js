module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ], 
        "no-var": "warn",
        "no-unused-vars": "warn",
        "no-console": "off",
        "eqeqeq": "error"
    }
};
