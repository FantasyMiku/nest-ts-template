// Declare CSP-related constants
const CSPGeneral = ['*.mikui.cc'];

const CSPConfig = {
  directives: {
    defaultSrc: ["'self'", '*.mikui.cc'],
    scriptSrc: CSPGeneral.concat(["'self'", "'unsafe-inline'"]),
    imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
    styleSrc: CSPGeneral.concat(["'self'", "'unsafe-inline'"]),
  },
};

export default CSPConfig;
