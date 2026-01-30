export default {
    extends: 'lighthouse:default',
    settings: {
        onlyCategories: ['performance'],
        skipAudits: ['screenshot-thumbnails', 'final-screenshot'],
    },
};
