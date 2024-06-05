const createCaseInsensitiveProxy = target => {
  return new Proxy(target, {
    get: (obj, prop) => {
      const lowercaseProp = prop.toLowerCase();
      return obj.hasOwnProperty(lowercaseProp) ? obj[lowercaseProp] : '#000000';
    },
  });
};

export const TAG_COLOR_MAPPING = createCaseInsensitiveProxy({
  react: '#E7D0FB',
  angular: '#AE445A',
  custom: '#4477CE',
  native: '#DBEFDA',
  external: '#FEE5D3',
  global: '#B3E5FC',
});

export const TAG_TEXT_COLOR = createCaseInsensitiveProxy({
  react: '#8517E5',
  angular: '#FFFFFF',
  custom: '#FFFFFF',
  native: '#47AF46',
  external: '#F87D23',
  global: '#1976D2',
});
