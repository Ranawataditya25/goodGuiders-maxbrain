// themeConfig.js
export const themeColors = {
    themeprimary: localStorage.getItem("themeprimary") || '#0c4079',
    themesecondary: localStorage.getItem("themesecondary") || '#e2562a',
    themesuccess: localStorage.getItem("themesuccess") || '#10b981',
    themeinfo: localStorage.getItem("themeinfo") || '#0ea5e9',
    themewarning: localStorage.getItem("themewarning") || '#ff9800',    
};
